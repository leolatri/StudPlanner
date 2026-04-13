from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas, database
from app.auth import get_current_user

router = APIRouter(prefix="/groups", tags=["groups"])

@router.get("/", response_model=List[schemas.Group])
def read_groups(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user=Depends(get_current_user)):
    groups = crud.get_groups(db, skip=skip, limit=limit)
    return groups