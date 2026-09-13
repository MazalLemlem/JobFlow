from pydantic import BaseModel


class JobCreateRequest(BaseModel):
    company: str
    job_title: str
    job_description: str
    status: str


class JobStatusUpdateRequest(BaseModel):
    status: str