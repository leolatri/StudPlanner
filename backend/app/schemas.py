from pydantic import BaseModel
from typing import List, Optional

# ---------- User ----------
class UserBase(BaseModel):
    email: str
    first_name: str
    middle_name: str
    second_name: str
    telegram: Optional[str] = None
    phone_number: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str

# ---------- Book (согласно DTO фронта) ----------
class Book(BaseModel):
    id: str
    name: str
    autors: List[str]          # массив строк
    isPersonal: bool
    url: str = ""

# ---------- Feedback (для ответа клиенту) ----------
class Feedback(BaseModel):
    id: str
    text: str
    grade: int
    autor: str                 
    isPersonal: bool

# ---------- Contact ----------
class Contact(BaseModel):
    id: str
    fio: str
    email: str
    img: Optional[str] = None
    uniSubjects: List[str] = []
    feedbacks: List[Feedback] = []
    feedbackIsLeaved: bool = False

# ---------- Subject ----------
class Subject(BaseModel):
    id: str
    type: str
    name: str
    room: str
    index: int
    duration: int
    professor: str
    timeAndDate: int           # переименовано

# ---------- Group ----------
class Group(BaseModel):
    id: str
    name: str
    isActive: bool = False
    isSelected: bool = False

# ---------- AdditionData ----------
class AdditionData(BaseModel):
    library: List[Book]
    groupList: List[Group]
    contacts: List[Contact]
    subjects: List[Subject]

# ---------- Token ----------
class Token(BaseModel):
    access_token: str
    token_type: str