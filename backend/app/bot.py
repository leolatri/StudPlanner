import asyncio
import logging
import uuid
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove

from database import SessionLocal
from models import Subject, Contact, Book, Group
import json
from pathlib import Path

logging.basicConfig(level=logging.INFO)

PHOTO_DIR = Path("static/photos")
PHOTO_DIR.mkdir(parents=True, exist_ok=True)

BOT_TOKEN = "123"
bot = Bot(token=BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

ADMIN_IDS = [123]

def is_admin(message: types.Message) -> bool:
    return message.from_user.id in ADMIN_IDS

# --- Определяем состояния для каждого действия ---
class AddSubjectStates(StatesGroup):
    waiting_for_type = State()
    waiting_for_name = State()
    waiting_for_room = State()
    waiting_for_duration = State()
    waiting_for_professor = State()
    waiting_for_timestamp = State()

class AddContactStates(StatesGroup):
    waiting_for_fio = State()
    waiting_for_email = State()
    waiting_for_subjects = State()
    waiting_for_photo = State()   # ожидаем строку с предметами через запятую

class AddBookStates(StatesGroup):
    waiting_for_name = State()
    waiting_for_authors = State()
    waiting_for_is_personal = State()   # Да/Нет
    waiting_for_url = State()

class DeleteSubjectStates(StatesGroup):
    waiting_for_date = State()
    waiting_for_confirmation = State()

class DeleteBookStates(StatesGroup):
    waiting_for_name = State()
    waiting_for_confirmation = State()

class DeleteContactStates(StatesGroup):
    waiting_for_fio = State()
    waiting_for_confirmation = State()


def get_main_keyboard():
    buttons = [
        [KeyboardButton(text="📚 Добавить предмет"), KeyboardButton(text="🗑 Удалить предмет")],
        [KeyboardButton(text="👨‍🏫 Добавить контакт"), KeyboardButton(text="🗑 Удалить контакт")],
        [KeyboardButton(text="📖 Добавить книгу"), KeyboardButton(text="🗑 Удалить книгу")],
    ]
    return ReplyKeyboardMarkup(keyboard=buttons, resize_keyboard=True)


async def save_contact(state: FSMContext, message: types.Message):
    data = await state.get_data()
    subjects_list = [s.strip() for s in data['subjects_raw'].split(',')] if 'subjects_raw' in data else []
    db = SessionLocal()
    try:
        new_contact = Contact(
            id=str(uuid.uuid4()),
            fio=data['fio'],
            email=data['email'],
            img_url=data.get('photo_url'),      # сохраняем URL
            uni_subjects=json.dumps(subjects_list)
        )
        db.add(new_contact)
        db.commit()
        await message.answer(
            f"✅ Контакт {data['fio']} добавлен!",
            reply_markup=get_main_keyboard()
        )
    except Exception as e:
        await message.answer(f"❌ Ошибка: {e}")
    finally:
        db.close()

# --- Главное меню (кнопки) ---
def get_main_keyboard():
    buttons = [
        [KeyboardButton(text="📚 Добавить предмет")],
        [KeyboardButton(text="👨‍🏫 Добавить контакт")],
        [KeyboardButton(text="📖 Добавить книгу")],
    ]
    return ReplyKeyboardMarkup(keyboard=buttons, resize_keyboard=True)

# --- Команда /start ---
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    if not is_admin(message):
        await message.answer("У вас нет прав администратора.")
        return
    await message.answer(
        "Добро пожаловать! Выберите действие:",
        reply_markup=get_main_keyboard()
    )

# --- Команда /help (можно оставить) ---
@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    await message.answer(
        "Используйте кнопки для добавления.\n\n"
        "Формат timestamp (время начала): целое число (Unix timestamp в миллисекундах).\n"
        "Пример: 1709280000000"
    )

# --- Обработка нажатия на кнопки (вход в состояния) ---
@dp.message(F.text == "📚 Добавить предмет")
async def start_add_subject(message: types.Message, state: FSMContext):
    if not is_admin(message):
        await message.answer("Нет прав")
        return
    await state.set_state(AddSubjectStates.waiting_for_type)
    await message.answer(
        "Введите тип занятия (например: Лекция, Семинар):",
        reply_markup=ReplyKeyboardRemove()
    )

@dp.message(F.text == "👨‍🏫 Добавить контакт")
async def start_add_contact(message: types.Message, state: FSMContext):
    if not is_admin(message):
        await message.answer("Нет прав")
        return
    await state.set_state(AddContactStates.waiting_for_fio)
    await message.answer(
        "Введите ФИО преподавателя (полностью):",
        reply_markup=ReplyKeyboardRemove()
    )

@dp.message(F.text == "📖 Добавить книгу")
async def start_add_book(message: types.Message, state: FSMContext):
    if not is_admin(message):
        await message.answer("Нет прав")
        return
    await state.set_state(AddBookStates.waiting_for_name)
    await message.answer(
        "Введите название книги:",
        reply_markup=ReplyKeyboardRemove()
    )

# --- Обработчики для добавления предмета (пошагово) ---
@dp.message(AddSubjectStates.waiting_for_type)
async def process_type(message: types.Message, state: FSMContext):
    await state.update_data(type=message.text.strip())
    await state.set_state(AddSubjectStates.waiting_for_name)
    await message.answer("Введите название предмета: ")

@dp.message(AddSubjectStates.waiting_for_name)
async def process_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text.strip())
    await state.set_state(AddSubjectStates.waiting_for_room)
    await message.answer("Введите номер аудитории: ")

@dp.message(AddSubjectStates.waiting_for_room)
async def process_room(message: types.Message, state: FSMContext):
    await state.update_data(room=message.text.strip())
    await state.set_state(AddSubjectStates.waiting_for_duration)
    await message.answer("Введите длительность (в минутах): ")

@dp.message(AddSubjectStates.waiting_for_duration)
async def process_duration(message: types.Message, state: FSMContext):
    try:
        duration = int(message.text.strip())
        await state.update_data(duration=duration)
        await state.set_state(AddSubjectStates.waiting_for_professor)
        await message.answer("Введите ФИО преподавателя: ")
    except ValueError:
        await message.answer("Ошибка: нужно ввести целое число минут. Попробуйте снова.")

@dp.message(AddSubjectStates.waiting_for_professor)
async def process_professor(message: types.Message, state: FSMContext):
    await state.update_data(professor=message.text.strip())
    await state.set_state(AddSubjectStates.waiting_for_timestamp)
    await message.answer(
        "Введите время начала (Unix timestamp в миллисекундах).\n"
        "Пример: 1709280000000\n"
        "Можно использовать онлайн-конвертер."
    )

@dp.message(AddSubjectStates.waiting_for_timestamp)
async def process_timestamp(message: types.Message, state: FSMContext):
    try:
        ts = int(message.text.strip())
        data = await state.get_data()
        # Сохраняем в БД
        db = SessionLocal()
        new_subj = Subject(
            id=str(uuid.uuid4()),
            type=data['type'],
            name=data['name'],
            room=data['room'],
            index=0,   # можно потом вычислять
            duration=data['duration'],
            professor=data['professor'],
            time_and_date=ts
        )
        db.add(new_subj)
        db.commit()
        db.close()
        await message.answer(
            f"✅ Предмет {data['name']} успешно добавлен!",
            reply_markup=get_main_keyboard()
        )
        await state.clear()
    except Exception as e:
        await message.answer(f"❌ Ошибка: {e}. Попробуйте снова или /cancel")
        # Не очищаем состояние, даём ещё попытку
        return

# --- Обработчики для добавления контакта ---
@dp.message(AddContactStates.waiting_for_fio)
async def process_fio(message: types.Message, state: FSMContext):
    await state.update_data(fio=message.text.strip())
    await state.set_state(AddContactStates.waiting_for_email)
    await message.answer("Введите email преподавателя:")

@dp.message(AddContactStates.waiting_for_email)
async def process_email(message: types.Message, state: FSMContext):
    await state.update_data(email=message.text.strip())
    await state.set_state(AddContactStates.waiting_for_subjects)
    await message.answer(
        "Введите список предметов преподавателя через запятую.\n"
        "Пример: Математика, Физика, Программирование"
    )

@dp.message(AddContactStates.waiting_for_subjects)
async def process_subjects(message: types.Message, state: FSMContext):
    subjects_raw = message.text.strip()
    await state.update_data(subjects_raw=subjects_raw)
    await state.set_state(AddContactStates.waiting_for_photo)
    await message.answer(
        "Теперь отправьте фотографию преподавателя (просто фото).\n"
        "Если фото нет, отправьте '-'"
    )

@dp.message(AddContactStates.waiting_for_photo, F.photo)
async def process_photo(message: types.Message, state: FSMContext):
    photo = message.photo[-1]
    file = await bot.get_file(photo.file_id)
    ext = file.file_path.split('.')[-1] if '.' in file.file_path else 'jpg'
    filename = f"{uuid.uuid4()}.{ext}"
    local_path = PHOTO_DIR / filename
    await bot.download_file(file.file_path, destination=str(local_path))
    photo_url = f"/static/photos/{filename}"
    await state.update_data(photo_url=photo_url)
    await save_contact(state, message)
    await state.clear()

@dp.message(AddContactStates.waiting_for_photo, F.text == "-")
async def skip_photo(message: types.Message, state: FSMContext):
    await state.update_data(photo_url=None)
    await save_contact(state, message)
    await state.clear()

@dp.message(AddContactStates.waiting_for_photo)
async def invalid_photo(message: types.Message):
    await message.answer("Пожалуйста, отправьте фото или '-' чтобы пропустить.")

async def save_contact(state: FSMContext, message: types.Message):
    data = await state.get_data()
    subjects_raw = data.get('subjects_raw', '')
    subjects_list = [s.strip() for s in subjects_raw.split(',')] if subjects_raw else []
    db = SessionLocal()
    try:
        new_contact = Contact(
            id=str(uuid.uuid4()),
            fio=data['fio'],
            email=data['email'],
            img_url=data.get('photo_url'),
            uni_subjects=json.dumps(subjects_list)
        )
        db.add(new_contact)
        db.commit()
        await message.answer(
            f"✅ Контакт {data['fio']} добавлен!",
            reply_markup=get_main_keyboard()
        )
    except Exception as e:
        await message.answer(f"❌ Ошибка: {e}")
    finally:
        db.close()

# --- Обработчики для добавления книги ---
@dp.message(AddBookStates.waiting_for_name)
async def book_name(message: types.Message, state: FSMContext):
    await state.update_data(name=message.text.strip())
    await state.set_state(AddBookStates.waiting_for_authors)
    await message.answer("Введите автора(ов) (можно через запятую):")

@dp.message(AddBookStates.waiting_for_authors)
async def book_authors(message: types.Message, state: FSMContext):
    await state.update_data(authors=message.text.strip())
    await state.set_state(AddBookStates.waiting_for_is_personal)
    kb = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Да"), KeyboardButton(text="Нет")]],
        resize_keyboard=True
    )
    await message.answer("Это личная книга? (Да/Нет)", reply_markup=kb)

@dp.message(AddBookStates.waiting_for_is_personal, F.text.in_(["Да", "Нет"]))
async def book_is_personal(message: types.Message, state: FSMContext):
    is_personal = (message.text == "Да")
    await state.update_data(is_personal=is_personal)
    await state.set_state(AddBookStates.waiting_for_url)
    await message.answer(
        "Введите ссылку на материал (или отправьте '-' если нет):",
        reply_markup=ReplyKeyboardRemove()
    )

@dp.message(AddBookStates.waiting_for_url)
async def book_url(message: types.Message, state: FSMContext):
    url = message.text.strip()
    if url == "-":
        url = None
    data = await state.get_data()
    db = SessionLocal()
    try:
        new_book = Book(
            id=str(uuid.uuid4()),
            name=data['name'],
            authors=data['authors'],
            is_personal=data['is_personal'],
            url=url
        )
        db.add(new_book)
        db.commit()
        await message.answer(
            f"✅ Книга {data['name']} добавлена!",
            reply_markup=get_main_keyboard()
        )
    except Exception as e:
        await message.answer(f"❌ Ошибка: {e}")
    finally:
        db.close()
        await state.clear()

# --- Отмена операции (команда /cancel) ---
@dp.message(Command("cancel"))
async def cancel_cmd(message: types.Message, state: FSMContext):
    await state.clear()
    await message.answer("Операция отменена.", reply_markup=get_main_keyboard())

# --- Защита от неверного ввода в состояниях (если пользователь прислал что-то другое) ---
@dp.message(StateFilter(AddBookStates.waiting_for_is_personal))
async def wrong_is_personal(message: types.Message):
    await message.answer("Пожалуйста, ответьте Да или Нет, используя кнопки.")

# --- Обработка прочих сообщений (если не в состоянии) ---
@dp.message()
async def unknown(message: types.Message):
    if is_admin(message):
        await message.answer("Используйте кнопки меню.", reply_markup=get_main_keyboard())
    else:
        await message.answer("У вас нет доступа.")


# --- Удаление книги по названию ---
@dp.message(F.text == "🗑 Удалить книгу")
async def start_delete_book(message: types.Message, state: FSMContext):
    if not is_admin(message):
        await message.answer("Нет прав")
        return
    await state.set_state(DeleteBookStates.waiting_for_name)
    await message.answer("Введите точное название книги для удаления:", reply_markup=ReplyKeyboardRemove())

@dp.message(DeleteBookStates.waiting_for_name)
async def process_book_name(message: types.Message, state: FSMContext):
    name = message.text.strip()
    db = SessionLocal()
    book = db.query(Book).filter(Book.name == name).first()
    db.close()
    if not book:
        await message.answer(f"Книга с названием '{name}' не найдена. Отмена.")
        await state.clear()
        await message.answer("Выберите действие:", reply_markup=get_main_keyboard())
        return
    await state.update_data(book=book)
    await state.set_state(DeleteBookStates.waiting_for_confirmation)
    await message.answer(
        f"Найдена книга: {book.name}, автор(ы): {book.authors}\nУдалить? (Да/Нет)",
        reply_markup=ReplyKeyboardMarkup(
            keyboard=[[KeyboardButton(text="Да"), KeyboardButton(text="Нет")]],
            resize_keyboard=True
        )
    )

@dp.message(DeleteBookStates.waiting_for_confirmation, F.text.in_(["Да", "Нет"]))
async def confirm_delete_book(message: types.Message, state: FSMContext):
    if message.text == "Да":
        data = await state.get_data()
        book = data['book']
        db = SessionLocal()
        try:
            db.delete(book)
            db.commit()
            await message.answer(f"✅ Книга '{book.name}' удалена.")
        except Exception as e:
            await message.answer(f"❌ Ошибка: {e}")
        finally:
            db.close()
    else:
        await message.answer("Удаление отменено.")
    await state.clear()
    await message.answer("Выберите действие:", reply_markup=get_main_keyboard())

@dp.message(DeleteBookStates.waiting_for_confirmation)
async def invalid_book_confirmation(message: types.Message):
    await message.answer("Ответьте Да или Нет, используя кнопки.")

# --- Удаление контакта по ФИО ---
@dp.message(F.text == "🗑 Удалить контакт")
async def start_delete_contact(message: types.Message, state: FSMContext):
    if not is_admin(message):
        await message.answer("Нет прав")
        return
    await state.set_state(DeleteContactStates.waiting_for_fio)
    await message.answer("Введите точное ФИО преподавателя для удаления:", reply_markup=ReplyKeyboardRemove())

@dp.message(DeleteContactStates.waiting_for_fio)
async def process_contact_fio(message: types.Message, state: FSMContext):
    fio = message.text.strip()
    db = SessionLocal()
    contact = db.query(Contact).filter(Contact.fio == fio).first()
    db.close()
    if not contact:
        await message.answer(f"Контакт с ФИО '{fio}' не найден. Отмена.")
        await state.clear()
        await message.answer("Выберите действие:", reply_markup=get_main_keyboard())
        return
    await state.update_data(contact=contact)
    await state.set_state(DeleteContactStates.waiting_for_confirmation)
    await message.answer(
        f"Найден преподаватель: {contact.fio}, email: {contact.email}\nУдалить? (Да/Нет)",
        reply_markup=ReplyKeyboardMarkup(
            keyboard=[[KeyboardButton(text="Да"), KeyboardButton(text="Нет")]],
            resize_keyboard=True
        )
    )

@dp.message(DeleteContactStates.waiting_for_confirmation, F.text.in_(["Да", "Нет"]))
async def confirm_delete_contact(message: types.Message, state: FSMContext):
    if message.text == "Да":
        data = await state.get_data()
        contact = data['contact']
        db = SessionLocal()
        try:
            # Сначала удаляем связанные отзывы (если есть)
            db.query(Feedback).filter(Feedback.contact_id == contact.id).delete()
            db.delete(contact)
            db.commit()
            await message.answer(f"✅ Контакт '{contact.fio}' удалён.")
        except Exception as e:
            await message.answer(f"❌ Ошибка: {e}")
        finally:
            db.close()
    else:
        await message.answer("Удаление отменено.")
    await state.clear()
    await message.answer("Выберите действие:", reply_markup=get_main_keyboard())

@dp.message(DeleteContactStates.waiting_for_confirmation)
async def invalid_contact_confirmation(message: types.Message):
    await message.answer("Ответьте Да или Нет, используя кнопки.")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())