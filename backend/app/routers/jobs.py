from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.job import Job
from app.schemas.job import JobCreateRequest, JobStatusUpdateRequest


router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("")
def create_job(
    job: JobCreateRequest,
    db: Session = Depends(get_db),
):
    new_job = Job(
        company=job.company,
        job_title=job.job_title,
        job_description=job.job_description,
        status=job.status,
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "id": new_job.id,
        "company": new_job.company,
        "job_title": new_job.job_title,
        "job_description": new_job.job_description,
        "status": new_job.status,
    }


@router.get("")
def get_jobs(
    db: Session = Depends(get_db),
):
    jobs = (
        db.query(Job)
        .order_by(Job.created_at.desc())
        .all()
    )

    return jobs


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db),
):
    job = db.get(Job, job_id)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return job


@router.patch("/{job_id}")
def update_job_status(
    job_id: int,
    update: JobStatusUpdateRequest,
    db: Session = Depends(get_db),
):
    job = db.get(Job, job_id)

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    job.status = update.status

    db.commit()
    db.refresh(job)

    return {
        "message": "Job status updated successfully",
        "id": job.id,
        "status": job.status,
    }