export async function createJob(
  company: string,
  jobTitle: string,
  jobDescription: string,
  status: string
) {
  const response = await fetch(
    "http://127.0.0.1:8000/jobs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        job_title: jobTitle,
        job_description: jobDescription,
        status,
      }),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}


export async function getJobs() {
  const response = await fetch(
    "http://127.0.0.1:8000/jobs"
  );

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}


export async function updateJobStatus(
  jobId: number,
  status: string
) {
  const response = await fetch(
    `http://127.0.0.1:8000/jobs/${jobId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}