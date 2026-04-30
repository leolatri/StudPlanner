from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
import crud, schemas, database
from jwt_utils import get_current_user
from models import Book as BookModel

router = APIRouter(prefix="/books", tags=["books"])

@router.get("/", response_model=List[schemas.Book])
def get_books(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    if current_user.is_admin:
        query = db.query(BookModel)
    else:
        query = db.query(BookModel).filter(
            (BookModel.owner_id == None) | (BookModel.owner_id == current_user.id)
        )
    books = query.offset(skip).limit(limit).all()
    result = []
    for b in books:
        authors = json.loads(b.authors) if b.authors else []
        result.append(schemas.Book(
            id=b.id,
            name=b.name,
            autors=authors,
            url=b.url or "",
            owner_id=b.owner_id
        ))
    return result

@router.post("/", response_model=schemas.Book)
def create_book(
    book: schemas.BookCreate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    new_book = crud.create_book(db, book, current_user.id, current_user.is_admin)
    return schemas.Book(
        id=new_book.id,
        name=new_book.name,
        autors=json.loads(new_book.authors),
        url=new_book.url or "",
        owner_id=new_book.owner_id
    )

@router.delete("/{book_id}")
def delete_book(
    book_id: str,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if not book:
        raise HTTPException(404, "Book not found")

    if not current_user.is_admin and book.owner_id != current_user.id:
        raise HTTPException(403, "Not allowed to delete this book")
    if crud.delete_book(db, book_id):
        return {"ok": True}
    raise HTTPException(404, "Book not found")