import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schemas, database
from jwt_utils import get_current_user
from models import Feedback as FeedbackModel

router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.get("/{contact_id}", response_model=schemas.Contact)
def get_contact(
    contact_id: str,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    contact = crud.get_contact_by_id(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    subjects = json.loads(contact.uni_subjects) if contact.uni_subjects else []
    
    feedbacks_db = db.query(FeedbackModel).filter(FeedbackModel.contact_id == contact_id).all()
    feedbacks = []
    for fb in feedbacks_db:
        feedbacks.append(schemas.Feedback(
            id=fb.id,
            text=fb.text,
            grade=fb.grade,
            autor=fb.author,
            isPersonal=fb.is_personal
        ))
    
    # флаг: оставил ли текущий пользователь отзыв
    feedback_is_leaved = db.query(FeedbackModel).filter(
        FeedbackModel.contact_id == contact_id,
        FeedbackModel.user_id == current_user.id
    ).first() is not None
    
    return schemas.Contact(
        id=contact.id,
        fio=contact.fio,
        email=contact.email,
        img=contact.img_url,
        uniSubjects=subjects,
        feedbacks=feedbacks,
        feedbackIsLeaved=feedback_is_leaved
    )

@router.get("/", response_model=List[schemas.Contact])
def get_contacts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    contacts = crud.get_contacts(db, skip=skip, limit=limit)
    result = []
    for c in contacts:
        subjects = json.loads(c.uni_subjects) if c.uni_subjects else []
        result.append(schemas.Contact(
            id=c.id,
            fio=c.fio,
            email=c.email,
            img=c.img_url,
            uniSubjects=subjects,
            feedbacks=[],
            feedbackIsLeaved=False
        ))
    return result

@router.post("/{contact_id}/feedback", response_model=schemas.Feedback)
def add_or_update_feedback(
    contact_id: str,
    feedback: schemas.FeedbackCreate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    contact = crud.get_contact_by_id(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    
    # Проверяем, есть ли уже отзыв от этого пользователя
    existing = db.query(FeedbackModel).filter(
        FeedbackModel.contact_id == contact_id,
        FeedbackModel.user_id == current_user.id
    ).first()
    
    author_name = f"{current_user.first_name} {current_user.second_name}"
    
    if existing:
        # Обновляем существующий отзыв
        existing.text = feedback.text
        existing.grade = feedback.grade
        existing.author = author_name
        db.commit()
        db.refresh(existing)
        return schemas.Feedback(
            id=existing.id,
            text=existing.text,
            grade=existing.grade,
            autor=existing.author,
            isPersonal=existing.is_personal
        )
    else:
        # Создаём новый отзыв
        db_feedback = crud.create_feedback(db, contact_id, feedback, current_user.id, author_name)
        return schemas.Feedback(
            id=db_feedback.id,
            text=db_feedback.text,
            grade=db_feedback.grade,
            autor=db_feedback.author,
            isPersonal=db_feedback.is_personal
        )