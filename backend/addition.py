from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json
import crud, schemas, database
from jwt_utils import get_current_user

router = APIRouter(prefix="/addition", tags=["addition"])

@router.get("/", response_model=schemas.AdditionData)
def get_addition_data(
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    # Книги
    books = crud.get_books(db)
    books_result = []
    for b in books:
        authors = json.loads(b.authors) if b.authors else []
        books_result.append(schemas.Book(
            id=b.id,
            name=b.name,
            autors=authors,
            owner_id=b.owner_id,
            url=b.url or ""
        ))

    # Группы
    groups = crud.get_groups(db)
    groups_result = [schemas.Group(id=g.id, name=g.name, isActive=False, isSelected=False) for g in groups]

    # Контакты
    contacts = crud.get_contacts(db)
    contacts_result = []
    for c in contacts:
        subjects = json.loads(c.uni_subjects) if c.uni_subjects else []
        contacts_result.append(schemas.Contact(
            id=c.id,
            fio=c.fio,
            email=c.email,
            img=c.img_url,
            uniSubjects=subjects,
            feedbacks=[],
            feedbackIsLeaved=False
        ))

    # Предметы
    subjects = crud.get_subjects(db)
    subjects_result = []
    for s in subjects:
        subjects_result.append(schemas.Subject(
            id=s.id,
            type=s.type,
            name=s.name,
            room=s.room,
            index=s.index,
            duration=s.duration,
            professor=s.professor,
            timeAndDate=s.time_and_date
        ))

    return schemas.AdditionData(
        library=books_result,
        groupList=groups_result,
        contacts=contacts_result,
        subjects=subjects_result
    )