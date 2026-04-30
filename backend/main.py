from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import auth, users, books, contacts, groups, subjects, admin, addition

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(books.router)
app.include_router(contacts.router)
app.include_router(groups.router)
app.include_router(subjects.router)
app.include_router(admin.router)
app.include_router(addition.router)

@app.get("/")
def root():
    for route in app.routes:
        print(route.path, [m for m in route.methods] if hasattr(route, 'methods') else '')
    return {"message": "StudPlanner API"}


# авторизация, регистрация и панель админа