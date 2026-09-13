import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateJobStatus } from "../services/jobService";
import "../styles/jobDetails.css";

type Job = {
  id: number;
  company: string;
  job_title: string;
  job_description: string;
  status: string;
  created_at: string;
};

function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    async function loadJob() {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/jobs/${id}?user_id=${userId}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setIsLoading(false);
        return;
      }

      setJob(data);
      setIsLoading(false);
    }

    loadJob();
  }, [id, navigate]);

  async function handleStatusChange(
    newStatus: string
  ) {
    if (!job) {
      return;
    }

    setIsUpdating(true);
    setUpdateMessage("");

    const result = await updateJobStatus(
      job.id,
      newStatus
    );

    if (!result.ok) {
      console.error(result.data);
      setUpdateMessage("Failed to update status.");
      setIsUpdating(false);
      return;
    }

    setJob({
      ...job,
      status: result.data.status,
    });

    setUpdateMessage("Status updated successfully.");
    setIsUpdating(false);
  }

  if (isLoading) {
    return (
      <div className="job-details-page">
        <div className="job-details-container">
          <p>Loading job...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="job-details-container">
          <p>Job not found.</p>

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="job-details-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="job-details-card">
          <div className="job-details-header">
            <div>
              <h1>{job.job_title}</h1>

              <p className="job-details-company">
                {job.company}
              </p>
            </div>

            <span className="job-details-status">
              {job.status}
            </span>
          </div>

          <div className="job-details-section">
            <h2>Application Status</h2>

            <select
              className="job-status-select"
              value={job.status}
              disabled={isUpdating}
              onChange={(event) =>
                handleStatusChange(event.target.value)
              }
            >
              <option value="Interested">
                Interested
              </option>

              <option value="Applied">
                Applied
              </option>

              <option value="HR Interview">
                HR Interview
              </option>

              <option value="Technical Interview">
                Technical Interview
              </option>

              <option value="Final Interview">
                Final Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Withdrawn">
                Withdrawn
              </option>
            </select>

            {isUpdating && (
              <p className="status-update-message">
                Updating status...
              </p>
            )}

            {!isUpdating && updateMessage && (
              <p className="status-update-message">
                {updateMessage}
              </p>
            )}
          </div>

          <div className="job-details-section">
            <h2>Job Description</h2>

            <p className="job-description">
              {job.job_description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;