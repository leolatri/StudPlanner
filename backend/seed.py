import json
import uuid
from database import SessionLocal, Base, engine
from models import User, Book, Contact, Feedback, Subject, Group
from passlib.context import CryptContext

Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


test_books = [
    {"id": "1", "name": "Мастер и Маргарита", "autors": ["Михаил Булгаков"], "owner_id": None, "url": ""},
    {"id": "2", "name": "Война и мир", "autors": ["Лев Толстой"], "owner_id": None, "url": ""},
]

test_subjects = [
    {"id": "1", "type": "Лекция", "name": "Высшая математика", "room": "301", "index": 1, "duration": 90, "professor": "Проф. Смирнов", "timeAndDate": 1709280000000},
]

test_contacts = [
    {
        "id": "p1",
        "fio": "Воронов Михаил Владимирович",
        "email": "voronov@example.com",
        "img": '/home/leolatri/StudP2/backend/static/photos/a77c3c7d-b804-460e-9648-2a415717d053.jpeg',
        "uniSubjects": ["Математическое моделирование", "Информатика"],
        "feedbacks": [
            {"id": "fb1", "text": "Отличный преподаватель", "grade": 5, "autor": "Студент Иванов", "isPersonal": False}
        ]
    }
]

def seed():
    db = SessionLocal()
    # Очистка
    db.query(Feedback).delete()
    db.query(Contact).delete()
    db.query(Book).delete()
    db.query(Subject).delete()
    db.query(Group).delete()
    db.query(User).delete()

    # Администратор
    admin = User(
        id=str(uuid.uuid4()),
        email="admin@example.com",
        hashed_password=pwd_context.hash("admin123"),
        first_name="Admin",
        middle_name="",
        second_name="",
        is_admin=True
    )
    db.add(admin)

    # Книги
    for b in test_books:
        book = Book(
            id=b["id"],
            name=b["name"],
            authors=json.dumps(b["autors"]),
            owner_id=b["owner_id"],
            url=b["url"]
        )
        db.add(book)


    # Предметы
    for s in test_subjects:
        subject = Subject(
            id=s["id"],
            type=s["type"],
            name=s["name"],
            room=s["room"],
            index=s["index"],
            duration=s["duration"],
            professor=s["professor"],
            time_and_date=s["timeAndDate"]
        )
        db.add(subject)

    # Контакты и отзывы
    for c in test_contacts:
        contact = Contact(
            id=c["id"],
            fio=c["fio"],
            email=c["email"],
            img_url=c["img"],
            uni_subjects=json.dumps(c["uniSubjects"])
        )
        db.add(contact)
        db.flush()
        for fb in c["feedbacks"]:
            feedback = Feedback(
                id=fb["id"],
                text=fb["text"],
                grade=fb["grade"],
                author=fb["autor"],
                is_personal=fb["isPersonal"],
                contact_id=contact.id,
                user_id=admin.id
            )
            db.add(feedback)

    db.commit()
    db.close()
    print("Тестовые данные загружены. Админ: admin@example.com / admin123")

if __name__ == "__main__":
    seed()