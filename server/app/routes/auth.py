from __future__ import annotations

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import schemas
from ..database import get_db
from ..controllers.auth_controller import authenticate_and_issue_token


router = APIRouter(prefix="", tags=["auth"])


@router.post("/login", response_model=schemas.TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
) -> schemas.TokenResponse:
    token = authenticate_and_issue_token(db, email=form_data.username, password=form_data.password)
    return schemas.TokenResponse(access_token=token, message="Login successful")


