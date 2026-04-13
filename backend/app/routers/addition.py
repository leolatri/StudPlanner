from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas, database
from app.auth import get_current_user

router = APIRouter(prefix="/addition", tags=["addition"])

@router.get("/data", response_model=schemas.AdditionData)
def get_addition_data(db: Session = Depends(database.get_db), current_user=Depends(get_current_user)):
    books = crud.get_books(db)
    groups = crud.get_groups(db)
    contacts = crud.get_contacts(db)
    subjects = crud.get_subjects(db)
    return {
        "library": books,
        "groupList": groups,
        "contacts": contacts,
        "subjects": subjects
    }