from sqlalchemy.orm import Session
import models
import schemas
import uuid
import json
from models import Subject, Group, subject_group_association  # импорт моделей и ассоциации

# ---------- Users ----------
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        id=str(uuid.uuid4()),
        email=user.email,
        hashed_password=user.password,
        first_name=user.first_name,
        middle_name=user.middle_name,
        second_name=user.second_name,
        telegram=user.telegram,
        phone_number=user.phone_number,
        is_admin=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------- Books ----------
def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Book).offset(skip).limit(limit).all()


def create_book(db: Session, book: schemas.BookCreate, current_user_id: str, is_admin: bool):
    if not is_admin:
        owner_id = current_user_id
    else:
        owner_id = book.owner_id
        
    db_book = models.Book(
        id=str(uuid.uuid4()),
        name=book.name,
        authors=json.dumps(book.autors),
        url=book.url,
        owner_id=owner_id
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def delete_book(db: Session, book_id: str):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if book:
        db.delete(book)
        db.commit()
        return True
    return False

# ---------- Contacts ----------
def get_contacts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Contact).offset(skip).limit(limit).all()

def get_contact_by_id(db: Session, contact_id: str):
    return db.query(models.Contact).filter(models.Contact.id == contact_id).first()

def create_contact(db: Session, contact: schemas.ContactCreate):
    db_contact = models.Contact(
        id=str(uuid.uuid4()),
        fio=contact.fio,
        email=contact.email,
        img_url=contact.img,
        uni_subjects=json.dumps(contact.uniSubjects)
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def update_contact(db: Session, contact_id: str, contact_update: schemas.ContactUpdate):
    db_contact = get_contact_by_id(db, contact_id)
    if not db_contact:
        return None
    if contact_update.fio is not None:
        db_contact.fio = contact_update.fio
    if contact_update.email is not None:
        db_contact.email = contact_update.email
    if contact_update.uniSubjects is not None:
        db_contact.uni_subjects = json.dumps(contact_update.uniSubjects)
    if contact_update.img is not None:
        db_contact.img_url = contact_update.img
    db.commit()
    db.refresh(db_contact)
    return db_contact


def delete_contact(db: Session, contact_id: str):
    db_contact = get_contact_by_id(db, contact_id)
    if db_contact:
        db.delete(db_contact)
        db.commit()
        return True
    return False

# ---------- Subjects ----------
def get_subjects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Subject).offset(skip).limit(limit).all()

def get_subject_by_id(db: Session, subject_id: str):
    return db.query(Subject).filter(Subject.id == subject_id).first()

def get_or_create_group(db: Session, group_name: str):
    group = db.query(Group).filter(Group.name == group_name).first()
    if not group:
        group = Group(id=str(uuid.uuid4()), name=group_name)
        db.add(group)
        db.commit()
        db.refresh(group)
    return group

def create_subject(db: Session, subject: schemas.SubjectCreate):
    db_subject = Subject(
        id=str(uuid.uuid4()),
        type=subject.type,
        name=subject.name,
        room=subject.room,
        index=subject.index,
        duration=subject.duration,
        professor=subject.professor,
        time_and_date=subject.timeAndDate,
    )
    db.add(db_subject)
    db.flush()

    if subject.groups:
        for group_name in subject.groups:
            group = get_or_create_group(db, group_name)
            db_subject.groups.append(group)
    db.commit()
    db.refresh(db_subject)
    return db_subject


def update_subject(db: Session, subject_id: str, subject_update: schemas.SubjectUpdate):
    db_subject = get_subject_by_id(db, subject_id)
    if not db_subject:
        return None

    for key, value in subject_update.dict(exclude_unset=True).items():
        if key == "timeAndDate":
            setattr(db_subject, "time_and_date", value)
        elif key != "groups":
            setattr(db_subject, key, value)

    if subject_update.groups is not None:
        db_subject.groups.clear()
        for group_name in subject_update.groups:
            group = get_or_create_group(db, group_name)
            db_subject.groups.append(group)
    db.commit()
    db.refresh(db_subject)
    return db_subject


def delete_subject(db: Session, subject_id: str):
    db_subject = get_subject_by_id(db, subject_id)
    if db_subject:
        db.delete(db_subject)
        db.commit()
        return True
    return False


def delete_subjects_by_date(db: Session, date_timestamp: int):
    end_of_day = date_timestamp + 86400000
    subjects = db.query(Subject).filter(
        Subject.time_and_date >= date_timestamp,
        Subject.time_and_date < end_of_day
    ).all()
    count = len(subjects)
    for s in subjects:
        db.delete(s)
    db.commit()
    return count

# ---------- Contact–Subject sync ----------
def get_contact_by_fio(db: Session, fio: str):
    fio_normalized = fio.strip().lower()
    for contact in db.query(models.Contact).all():
        if contact.fio.strip().lower() == fio_normalized:
            return contact
    return None

def upsert_contact_for_subject(db: Session, professor: str, subject_name: str):
    if not professor or not subject_name:
        return
    contact = get_contact_by_fio(db, professor)
    if contact is None:
        db_contact = models.Contact(
            id=str(uuid.uuid4()),
            fio=professor.strip(),
            email='',
            img_url=None,
            uni_subjects=json.dumps([subject_name])
        )
        db.add(db_contact)
        db.commit()
    else:
        subjects = json.loads(contact.uni_subjects) if contact.uni_subjects else []
        if subject_name not in subjects:
            subjects.append(subject_name)
            contact.uni_subjects = json.dumps(subjects)
            db.commit()

# ---------- Groups ----------
def get_groups(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Group).offset(skip).limit(limit).all()

def create_group(db: Session, name: str):
    db_group = Group(id=str(uuid.uuid4()), name=name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

# ---------- Feedbacks ----------
def create_feedback(db: Session, contact_id: str, feedback: schemas.FeedbackCreate, user_id: str, author_name: str):
    db_feedback = models.Feedback(
        id=str(uuid.uuid4()),
        text=feedback.text,
        grade=feedback.grade,
        author=author_name,
        is_personal=False,
        contact_id=contact_id,
        user_id=user_id
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback