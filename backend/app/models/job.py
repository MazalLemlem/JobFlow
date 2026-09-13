from datetime import datetime

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True)

    company: Mapped[str] = mapped_column(String(150))
    job_title: Mapped[str] = mapped_column(String(150))

    job_description: Mapped[str] = mapped_column(Text)

    status: Mapped[str] = mapped_column(
        String(50),
        default="Interested",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )