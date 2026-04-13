from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas, database
from app.auth import get_current_user

router = APIRouter(prefix="/books", tags=["books"])

@router.get("/", response_model=List[schemas.Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user=Depends(get_current_user)):
    books = crud.get_books(db, skip=skip, limit=limit)
    return books