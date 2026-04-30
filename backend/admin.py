import json
import csv
import io
import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import crud, schemas, database
from jwt_utils import get_current_user
import time
import models
from sqlalchemy import text

router = APIRouter(prefix="/admin", tags=["admin"])

def check_admin(current_user):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin rights required")



@router.post("/subjects", response_model=schemas.Subject)
def create_subject(
    subject: schemas.SubjectCreate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    db_subject = crud.create_subject(db, subject)
    crud.upsert_contact_for_subject(db, subject.professor, subject.name)
    return schemas.Subject(
        id=db_subject.id,
        type=db_subject.type,
        name=db_subject.name,
        room=db_subject.room,
        index=db_subject.index,
        duration=db_subject.duration,
        professor=db_subject.professor,
        timeAndDate=db_subject.time_and_date  
    )

@router.put("/subjects/{subject_id}", response_model=schemas.Subject)
def update_subject(
    subject_id: str,
    subject_update: schemas.SubjectUpdate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    updated = crud.update_subject(db, subject_id, subject_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Subject not found")
    return schemas.Subject(
        id=updated.id,
        type=updated.type,
        name=updated.name,
        room=updated.room,
        index=updated.index,
        duration=updated.duration,
        professor=updated.professor,
        timeAndDate=updated.time_and_date
    )

@router.delete("/subjects/all")
def delete_all_subjects(
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    
    subjects = db.query(models.Subject).all()
    for subject in subjects:
        subject.groups.clear()
        db.delete(subject)

    
    db.commit()
    return {"ok": True, "deleted": True}

@router.delete("/subjects/{subject_id}")
def delete_subject(
    subject_id: str,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    if crud.delete_subject(db, subject_id):
        return {"ok": True}
    raise HTTPException(status_code=404, detail="Subject not found")


@router.delete("/subjects/by-date")
def delete_subjects_by_date(
    date: int,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    count = crud.delete_subjects_by_date(db, date)
    return {"deleted_count": count}

@router.post("/upload-schedule", response_model=schemas.ScheduleUploadResponse)
async def upload_schedule(
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    start_total = time.time()
    print("=== upload_schedule called ===")
    check_admin(current_user)
    
    if not file.filename.endswith('.json'):
        raise HTTPException(400, "Only JSON files allowed")
    
    contents = await file.read()
    print(f"File size: {len(contents)} bytes, read time: {time.time() - start_total:.2f}s")
    
    parse_start = time.time()
    data = json.loads(contents)
    print(f"JSON parsed: {len(data)} items, time: {time.time() - parse_start:.2f}s")
    
    if not isinstance(data, list):
        raise HTTPException(400, "JSON must contain a list of subjects")
    
    from models import Subject, Group
    import uuid
    
    subjects_to_create = []
    all_group_names = set()
    
    process_start = time.time()
    for item in data:
        groups = []
        if 'groups' in item and isinstance(item['groups'], str):
            groups = [g.strip() for g in item['groups'].split(',') if g.strip()]
        all_group_names.update(groups)
        
        subject = {
            'id': str(uuid.uuid4()),
            'type': item.get('type', ''),
            'name': item['name'],
            'room': item.get('room', ''),
            'index': item.get('index', 0),
            'duration': item['duration'],
            'professor': item['professor'],
            'time_and_date': item['timeAndDate'],
        }
        subjects_to_create.append((subject, groups))
    print(f"Prepared {len(subjects_to_create)} subjects, unique groups: {len(all_group_names)}, time: {time.time() - process_start:.2f}s")
    
    bulk_start = time.time()
    db.bulk_insert_mappings(Subject, [s[0] for s in subjects_to_create])
    print(f"Bulk insert subjects done, time: {time.time() - bulk_start:.2f}s")
    
    groups_start = time.time()
    existing_groups = {g.name: g for g in db.query(Group).filter(Group.name.in_(all_group_names)).all()}
    for name in all_group_names:
        if name not in existing_groups:
            new_group = Group(id=str(uuid.uuid4()), name=name)
            db.add(new_group)
            existing_groups[name] = new_group
    db.flush()
    print(f"Groups processed, time: {time.time() - groups_start:.2f}s")
    
    relation_start = time.time()
    for subject, groups in subjects_to_create:
        subject_obj = db.query(Subject).filter(Subject.id == subject['id']).first()
        for group_name in groups:
            subject_obj.groups.append(existing_groups[group_name])
    print(f"Relations added, time: {time.time() - relation_start:.2f}s")
    
    commit_start = time.time()
    db.commit()
    print(f"Commit done, time: {time.time() - commit_start:.2f}s")

    contacts_start = time.time()
    seen_pairs = set()
    for subject, _ in subjects_to_create:
        pair = (subject['professor'], subject['name'])
        if pair not in seen_pairs:
            seen_pairs.add(pair)
            crud.upsert_contact_for_subject(db, subject['professor'], subject['name'])
    print(f"Contacts upserted, time: {time.time() - contacts_start:.2f}s")

    total_time = time.time() - start_total
    print(f"=== SUCCESS: uploaded {len(subjects_to_create)} subjects in {total_time:.2f}s ===")
    
    return {"message": f"Uploaded {len(subjects_to_create)} subjects", "created_count": len(subjects_to_create)}



# ---------- Управление контактами (преподавателями) ----------
PHOTO_DIR = "static/photos"

os.makedirs(PHOTO_DIR, exist_ok=True)

# ---------- Управление контактами (CRUD администратора) ----------
@router.post("/contacts", response_model=schemas.Contact)
def create_contact(
    contact: schemas.ContactCreate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    db_contact = crud.create_contact(db, contact)
    subjects = json.loads(db_contact.uni_subjects) if db_contact.uni_subjects else []
    return schemas.Contact(
        id=db_contact.id,
        fio=db_contact.fio,
        email=db_contact.email,
        img=db_contact.img_url,
        uniSubjects=subjects,
        feedbacks=[],
        feedbackIsLeaved=False
    )


@router.put("/contacts/{contact_id}", response_model=schemas.Contact)
def update_contact(
    contact_id: str,
    contact_update: schemas.ContactUpdate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    updated = crud.update_contact(db, contact_id, contact_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Contact not found")
    subjects = json.loads(updated.uni_subjects) if updated.uni_subjects else []
    return schemas.Contact(
        id=updated.id,
        fio=updated.fio,
        email=updated.email,
        img=updated.img_url,
        uniSubjects=subjects,
        feedbacks=[],
        feedbackIsLeaved=False
    )

@router.delete("/contacts/all")
def delete_all_contacts(
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    
    contacts = db.query(models.Contact).all()
    for contact in contacts:
        db.delete(contact)

    
    db.commit()
    return {"ok": True, "deleted": True}

@router.delete("/contacts/{contact_id}")
def delete_contact(
    contact_id: str,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    check_admin(current_user)
    if crud.delete_contact(db, contact_id):
        return {"ok": True}
    raise HTTPException(status_code=404, detail="Contact not found")

@router.post("/contacts/{contact_id}/photo")
async def upload_contact_photo(
    contact_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin rights required")
    
    contact = crud.get_contact_by_id(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    

    ext = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(PHOTO_DIR, unique_filename)
    

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    photo_url = f"/static/photos/{unique_filename}"
    contact.img_url = photo_url
    db.commit()
    db.refresh(contact)
    
    return {"ok": True, "img_url": photo_url}