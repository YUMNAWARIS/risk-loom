from __future__ import annotations

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes import auth as auth_routes
from .routes import users as users_routes
from .models import User  # noqa: F401 - ensure model is imported for metadata
from .schemas import HealthResponse


load_dotenv()


def create_app() -> FastAPI:
    app = FastAPI(title="Risk Loom API", version="1.0.0")

    # CORS setup for Next.js frontend
    allowed_origins = [
        os.getenv("CORS_ORIGIN", "http://localhost:3000"),
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Database migrations/DDL: create tables if not present (simple bootstrap)
    Base.metadata.create_all(bind=engine)

    # Include routers
    app.include_router(users_routes.router)
    app.include_router(auth_routes.router)

    @app.get("/health", response_model=HealthResponse)
    def healthcheck() -> HealthResponse:
        return HealthResponse(status="ok")

    return app


app = create_app()


