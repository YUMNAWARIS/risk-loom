from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .. import schemas
from ..controllers.users_controller import register_user as register_user_controller
from ..database import get_db
from ..middlewares.auth import get_current_user
from ..models import User


router = APIRouter(prefix="", tags=["users"])


@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(payload: schemas.UserCreate, db: Session = Depends(get_db)) -> schemas.UserResponse:
    user = register_user_controller(db, payload)
    return schemas.UserResponse(message="User registered successfully", user=user)  # type: ignore[arg-type]


@router.get("/me", response_model=schemas.UserResponse)
def read_me(current_user: User = Depends(get_current_user)) -> schemas.UserResponse:
    return schemas.UserResponse(message="Fetched current user", user=current_user)  # type: ignore[arg-type]


