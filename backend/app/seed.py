import json
from database import SessionLocal
from models import User, Book, Contact, Feedback, Subject, Group
import uuid
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Данные в новом формате (соответствуют DTO фронтенда) ---
test_books = [
    {"id": "1", "name": "Мастер и Маргарита", "autors": ["Михаил Булгаков"], "is_personal": True, "url": ""},
    {"id": "2", "name": "Война и мир", "autors": ["Лев Толстой"], "is_personal": False, "url": ""},
    # добавьте остальные книги из testData.ts
]

test_groups = [
    {"id": "1", "name": "ИВТ-201", "isActive": False, "isSelected": False},
    {"id": "2", "name": "ИВТ-202", "isActive": False, "isSelected": False},
    {"id": "3", "name": "МО-ИТ-101", "isActive": False, "isSelected": False},
]

test_subjects = [
    {"id": "1", "type": "Лекция", "name": "Высшая математика", "room": "301", "index": 1, "duration": 90, "professor": "Проф. Смирнов", "timeAndDate": 1709280000000},
    {"id": "2", "type": "Семинар", "name": "Физика", "room": "105", "index": 2, "duration": 90, "professor": "Доц. Кузнецова", "timeAndDate": 1709283600000},
]

# Контакты с отзывами (поле uniSubjects – массив, feedbacks – с полем autor)
test_contacts = [
    {
        "id": "p1",
        "fio": "Воронов Михаил владимирович",
        "email": "ivanov.is@example.com",
        "img": None,   # было img_url, стало img
        "uniSubjects": ["Математическое моделирование", "Информатика в жизни"],
        "feedbacks": [
            {"id": "1", "text": "ПЕРВЫЙ Отличный материал", "grade": 5, "autor": "Иванов Иван", "isPersonal": False},
            {"id": "2", "text": "Хорошая книга", "grade": 4, "autor": "Петрова Анна", "isPersonal": False},
        ],
        "feedbackIsLeaved": False
    },
    # добавьте остальные контакты из testData.ts
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
        hashed_password=pwd_context.hash("adminpass"),
        first_name="Admin",
        middle_name="",
        second_name="",
        is_admin=True
    )
    db.add(admin)
    db.flush()
    
    # Книги
    for b in test_books:
        # authors -> autors (уже в данных)
        book = Book(
            id=b["id"],
            name=b["name"],
            authors=json.dumps(b["autors"]),  # храним как JSON-строку
            is_personal=b["is_personal"],
            url=b["url"]
        )
        db.add(book)
    
    # Группы
    for g in test_groups:
        group = Group(
            id=g["id"],
            name=g["name"],
            # isActive и isSelected не хранятся в БД, они вычисляются на фронте
        )
        db.add(group)
    
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
            time_and_date=s["timeAndDate"]   # в модели поле time_and_date, но в ответе API будет timeAndDate
        )
        db.add(subject)
    
    # Контакты и отзывы
    for c in test_contacts:
        contact = Contact(
            id=c["id"],
            fio=c["fio"],
            email=c["email"],
            img_url=c["img"],   # поле в модели img_url
            uni_subjects=json.dumps(c["uniSubjects"])   # храним как JSON
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
    print("Тестовые данные успешно загружены в новом формате!")

if __name__ == "__main__":
    seed()