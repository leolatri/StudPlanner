from fastapi import APIRouter, Depends
from app import schemas
from app.auth import get_current_user

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/me", response_model=schemas.User)
def read_current_user(current_user=Depends(get_current_user)):
    return current_user