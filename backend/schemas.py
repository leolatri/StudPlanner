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
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str

# ---------- Book ----------
class Book(BaseModel):
    id: str
    name: str
    autors: List[str]
    owner_id: Optional[str] = None
    url: str = ""

class BookCreate(BaseModel):
    name: str
    autors: List[str]
    owner_id: Optional[str] = None
    url: str = ""

# ---------- Feedback ----------
class Feedback(BaseModel):
    id: str
    text: str
    grade: int
    autor: str
    isPersonal: bool

class FeedbackCreate(BaseModel):
    text: str
    grade: int

# ---------- Contact ----------
class Contact(BaseModel):
    id: str
    fio: str
    email: str
    img: Optional[str] = None
    uniSubjects: List[str] = []
    feedbacks: List[Feedback] = []
    feedbackIsLeaved: bool = False

class ContactCreate(BaseModel):
    fio: str
    email: str
    uniSubjects: List[str] = []
    img: Optional[str] = None

class ContactUpdate(BaseModel):
    fio: Optional[str] = None
    email: Optional[str] = None
    uniSubjects: Optional[List[str]] = None
    img: Optional[str] = None

# ---------- Subject ----------
class SubjectBase(BaseModel):
    type: str
    name: str
    room: str
    index: int
    duration: int
    professor: str
    timeAndDate: int

class SubjectCreate(SubjectBase):
    groups: Optional[List[str]] = None

class SubjectUpdate(BaseModel):
    type: Optional[str] = None
    name: Optional[str] = None
    room: Optional[str] = None
    duration: Optional[int] = None
    professor: Optional[str] = None
    timeAndDate: Optional[int] = None
    groups: Optional[List[str]] = None

class Subject(SubjectBase):
    id: str
    groups: List[str] = []

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

# ---------- Upload response ----------
class ScheduleUploadResponse(BaseModel):
    message: str
    created_count: int



# кабинет админа для добавления контактов, книг, расписания