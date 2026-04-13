from database import engine, Base

# Импортируйте все модели, чтобы Base знал о них
from models import User, Book, Contact, Feedback, Subject, Group

print("Создаём таблицы...")
Base.metadata.create_all(bind=engine)
print("Таблицы успешно созданы.")