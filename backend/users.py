from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import schemas, crud, database
from jwt_utils import get_current_user

router = APIRouter(prefix="/user", tags=["user"])

class UserUpdate(BaseModel):
    phone_number: Optional[str] = None
    telegram: Optional[str] = None

@router.get("/", response_model=schemas.UserOut)
def read_current_user(current_user=Depends(get_current_user)):
    return current_user

@router.put("/", response_model=schemas.UserOut)
def update_current_user(
    updates: UserUpdate,
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user)
):
    if updates.phone_number is not None:
        current_user.phone_number = updates.phone_number
    if updates.telegram is not None:
        current_user.telegram = updates.telegram
    db.commit()
    db.refresh(current_user)
    return current_user