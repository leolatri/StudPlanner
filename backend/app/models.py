from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime, Table
from sqlalchemy.orm import relationship
from database import Base

# Связь многие-ко-многим: книга – автор (упростим: авторы хранятся строкой, но лучше отдельно)
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)  # UUID или автоинкремент
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
    authors = Column(String)  # храним как JSON или строку через запятую
    is_personal = Column(Boolean, default=False)
    url = Column(String, nullable=True)

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(String, primary_key=True)
    fio = Column(String)
    email = Column(String)
    # img храним как путь или URL
    img_url = Column(String, nullable=True)
    # список предметов – отдельная таблица или JSON
    uni_subjects = Column(String)  # JSON строка

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(String, primary_key=True)
    text = Column(String)
    grade = Column(Integer)
    author = Column(String)
    is_personal = Column(Boolean, default=False)
    contact_id = Column(String, ForeignKey("contacts.id"))
    user_id = Column(String, ForeignKey("users.id"))  # кто оставил

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(String, primary_key=True)
    type = Column(String)  # Лекция, Семинар
    name = Column(String)
    room = Column(String)
    index = Column(Integer)
    duration = Column(Integer)  # в минутах
    professor = Column(String)
    time_and_date = Column(Integer)  # Unix timestamp

class Group(Base):
    __tablename__ = "groups"
    id = Column(String, primary_key=True)
    name = Column(String)