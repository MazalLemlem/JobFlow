function getCurrentUserId() {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("No logged-in user found");
  }

  return Number(userId);
}


export async function createJob(
  company: string,
  jobTitle: string,
  jobDescription: string,
  status: string
) {
  const userId = getCurrentUserId();

  const response = await fetch(
    "http://127.0.0.1:8000/jobs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
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
  const userId = getCurrentUserId();

  const response = await fetch(
    `http://127.0.0.1:8000/jobs?user_id=${userId}`
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
  const userId = getCurrentUserId();

  const response = await fetch(
    `http://127.0.0.1:8000/jobs/${jobId}?user_id=${userId}`,
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