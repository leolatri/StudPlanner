from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from app import crud, schemas, database
from app.auth import get_current_user

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.get("/", response_model=List[schemas.Subject])
def read_subjects(
    skip: int = 0, 
    limit: int = 100, 
    date_param: Optional[date] = Query(None, alias="date"),
    db: Session = Depends(database.get_db), 
    current_user=Depends(get_current_user)
):
    if date_param:
        subjects = crud.get_subjects_by_date(db, date_param)
    else:
        subjects = crud.get_subjects(db, skip=skip, limit=limit)
    return subjects