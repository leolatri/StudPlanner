from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Table
from database import Base
from sqlalchemy.orm import relationship

subject_group_association = Table(
    "subject_groups",
    Base.metadata,
    Column("subject_id", String, ForeignKey("subjects.id")),
    Column("group_id", String, ForeignKey("groups.id")),
)

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(String, primary_key=True)
    type = Column(String)
    name = Column(String)
    room = Column(String)
    index = Column(Integer)
    duration = Column(Integer)
    professor = Column(String)
    time_and_date = Column(Integer)
    groups = relationship("Group", secondary=subject_group_association, backref="subjects")

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String)
    middle_name = Column(String)
    second_name = Column(String)
    telegram = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    is_admin = Column(Boolean, default=False)

class Book(Base):
    __tablename__ = "books"
    id = Column(String, primary_key=True)
    name = Column(String)
    authors = Column(String)
    owner_id = Column(String, ForeignKey("users.id"), nullable=True)
    url = Column(String, nullable=True)

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(String, primary_key=True)
    fio = Column(String)
    email = Column(String)
    img_url = Column(String, nullable=True)
    uni_subjects = Column(String)

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(String, primary_key=True)
    text = Column(String)
    grade = Column(Integer)
    author = Column(String)
    is_personal = Column(Boolean, default=False)
    contact_id = Column(String, ForeignKey("contacts.id"))
    user_id = Column(String, ForeignKey("users.id"))




class Group(Base):
    __tablename__ = "groups"
    id = Column(String, primary_key=True)
    name = Column(String)