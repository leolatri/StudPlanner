from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import crud, schemas, database
from jwt_utils import get_current_user
from models import Subject

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.get("/", response_model=List[schemas.Subject])
def get_subjects(
    skip: int = 0,
    limit: int = 100,
    date_param: Optional[int] = Query(None, alias="date"),
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    query = db.query(Subject)
    if date_param:
        end = date_param + 86400000
        query = query.filter(Subject.time_and_date >= date_param, Subject.time_and_date < end)
    subjects = query.offset(skip).limit(limit).all()
    result = []
    for s in subjects:
        groups = [g.name for g in s.groups]
        result.append(schemas.Subject(
            id=s.id,
            type=s.type,
            name=s.name,
            room=s.room,
            index=s.index,
            duration=s.duration,
            professor=s.professor,
            timeAndDate=s.time_and_date,
            groups=groups
        ))
    return result