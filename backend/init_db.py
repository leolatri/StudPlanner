from database import engine, Base
import models  # важно: импортируем все модели, чтобы Base знал о них

print("Создание таблиц...")
Base.metadata.create_all(bind=engine)
print("Таблицы созданы.")