from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas, database
from app.auth import get_current_user

router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.get("/", response_model=List[schemas.Contact])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user=Depends(get_current_user)):
    contacts = crud.get_contacts(db, skip=skip, limit=limit)
    return contacts