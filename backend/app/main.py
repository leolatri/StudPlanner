from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from database import SessionLocal, engine
import models, schemas
import json
from typing import List
from fastapi.staticfiles import StaticFiles


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = "your-secret-key-change-it"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

# ---------- Auth ----------
@app.post("/auth/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        hashed_password=hashed,
        first_name=user.first_name,
        middle_name=user.middle_name,
        second_name=user.second_name,
        telegram=user.telegram,
        phone_number=user.phone_number
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.id}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

# ---------- User ----------
@app.get("/user", response_model=schemas.UserOut)
def get_user(current_user: models.User = Depends(get_current_user)):
    return current_user

# ---------- Books ----------
@app.get("/books", response_model=list[schemas.Book])
def get_books(db: Session = Depends(get_db)):
    books = db.query(models.Book).all()
    # Преобразуем authors (строка) в массив строк для фронта
    result = []
    for b in books:
        authors_list = json.loads(b.authors) if b.authors else []
        result.append({
            "id": b.id,
            "name": b.name,
            "autors": authors_list,   # поле называется "autors" во фронте
            "isPersonal": b.is_personal,
            "url": b.url or ""
        })
    return result

@app.post("/books", response_model=schemas.Book)
def create_book(book: schemas.Book, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Преобразуем массив авторов в строку
    authors_str = json.dumps(book.autors) if book.autors else "[]"
    db_book = models.Book(
        id=book.id,
        name=book.name,
        authors=authors_str,
        is_personal=book.isPersonal,
        url=book.url
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    # Возвращаем в формате фронта
    return {
        "id": db_book.id,
        "name": db_book.name,
        "autors": json.loads(db_book.authors) if db_book.authors else [],
        "isPersonal": db_book.is_personal,
        "url": db_book.url or ""
    }

# ---------- Contacts ----------
@app.get("/contacts", response_model=list[schemas.Contact])
def get_contacts(db: Session = Depends(get_db)):
    contacts = db.query(models.Contact).all()
    result = []
    for c in contacts:
        subjects = json.loads(c.uni_subjects) if c.uni_subjects else []
        feedbacks = db.query(models.Feedback).filter(models.Feedback.contact_id == c.id).all()
        # Преобразуем feedbacks в нужный формат (autor вместо author)
        fb_list = []
        for fb in feedbacks:
            fb_list.append({
                "id": fb.id,
                "text": fb.text,
                "grade": fb.grade,
                "autor": fb.author,   # переименовываем
                "isPersonal": fb.is_personal
            })
        result.append({
            "id": c.id,
            "fio": c.fio,
            "email": c.email,
            "img": c.img_url,
            "uniSubjects": subjects,
            "feedbacks": fb_list,
            "feedbackIsLeaved": False
        })
    return result

@app.get("/contacts/{contact_id}", response_model=schemas.Contact)
def get_contact(contact_id: str, db: Session = Depends(get_db)):
    contact = db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    if not contact:
        raise HTTPException(status_code=404)
    feedbacks = db.query(models.Feedback).filter(models.Feedback.contact_id == contact_id).all()
    fb_list = [{
        "id": fb.id,
        "text": fb.text,
        "grade": fb.grade,
        "autor": fb.author,
        "isPersonal": fb.is_personal
    } for fb in feedbacks]
    subjects = json.loads(contact.uni_subjects) if contact.uni_subjects else []
    return {
        "id": contact.id,
        "fio": contact.fio,
        "email": contact.email,
        "img": contact.img_url,
        "uniSubjects": subjects,
        "feedbacks": fb_list,
        "feedbackIsLeaved": False
    }

@app.post("/contacts/{contact_id}/feedback")
def add_feedback(contact_id: str, feedback: schemas.Feedback, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_fb = models.Feedback(
        text=feedback.text,
        grade=feedback.grade,
        author=current_user.first_name + " " + current_user.second_name,
        is_personal=False,
        contact_id=contact_id,
        user_id=current_user.id
    )
    db.add(new_fb)
    db.commit()
    return {"ok": True}

# ---------- Groups ----------
@app.get("/groups", response_model=list[schemas.Group])
def get_groups(db: Session = Depends(get_db)):
    groups = db.query(models.Group).all()
    # Для фронта нужны поля isActive и isSelected (по умолчанию false)
    result = []
    for g in groups:
        result.append({
            "id": g.id,
            "name": g.name,
            "isActive": False,
            "isSelected": False
        })
    return result

# ---------- Subjects ----------
@app.get("/subjects", response_model=list[schemas.Subject])
def get_subjects(date: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Subject)
    if date:
        # фильтрация по дате (по timestamp) – упрощённо
        pass
    subjects = query.all()
    result = []
    for s in subjects:
        result.append({
            "id": s.id,
            "type": s.type,
            "name": s.name,
            "room": s.room,
            "index": s.index,
            "duration": s.duration,
            "professor": s.professor,
            "timeAndDate": s.time_and_date   # переименовываем
        })
    return result

# ---------- Addition ----------
@app.get("/addition", response_model=schemas.AdditionData)
def get_addition(db: Session = Depends(get_db)):
    # Книги
    books = db.query(models.Book).all()
    books_result = []
    for b in books:
        authors_list = json.loads(b.authors) if b.authors else []
        books_result.append({
            "id": b.id,
            "name": b.name,
            "autors": authors_list,
            "isPersonal": b.is_personal,
            "url": b.url or ""
        })
    
    # Группы
    groups = db.query(models.Group).all()
    groups_result = []
    for g in groups:
        groups_result.append({
            "id": g.id,
            "name": g.name,
            "isActive": False,
            "isSelected": False
        })
    
    # Контакты
    contacts = db.query(models.Contact).all()
    contacts_result = []
    for c in contacts:
        subjects = json.loads(c.uni_subjects) if c.uni_subjects else []
        feedbacks = db.query(models.Feedback).filter(models.Feedback.contact_id == c.id).all()
        fb_list = [{
            "id": fb.id,
            "text": fb.text,
            "grade": fb.grade,
            "autor": fb.author,
            "isPersonal": fb.is_personal
        } for fb in feedbacks]
        contacts_result.append({
            "id": c.id,
            "fio": c.fio,
            "email": c.email,
            "img": c.img_url,
            "uniSubjects": subjects,
            "feedbacks": fb_list,
            "feedbackIsLeaved": False
        })
    
    # Предметы
    subjects = db.query(models.Subject).all()
    subjects_result = []
    for s in subjects:
        subjects_result.append({
            "id": s.id,
            "type": s.type,
            "name": s.name,
            "room": s.room,
            "index": s.index,
            "duration": s.duration,
            "professor": s.professor,
            "timeAndDate": s.time_and_date
        })
    
    return {
        "library": books_result,
        "groupList": groups_result,
        "contacts": contacts_result,
        "subjects": subjects_result
    }