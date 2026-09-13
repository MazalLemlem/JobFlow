import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getJobs } from "../services/jobService";
import "../styles/jobs.css";

type Job = {
  id: number;
  company: string;
  job_title: string;
  job_description: string;
  status: string;
  created_at: string;
};

function JobsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filter = searchParams.get("filter");

  useEffect(() => {
    async function loadJobs() {
      const result = await getJobs();

      if (!result.ok) {
        console.error(result.data);
        setIsLoading(false);
        return;
      }

      setJobs(result.data);
      setIsLoading(false);
    }

    loadJobs();
  }, []);

  let displayedJobs = jobs;
  let pageTitle = "All Applications";

  if (filter === "in-progress") {
    displayedJobs = jobs.filter(
      (job) =>
        job.status !== "Offer" &&
        job.status !== "Rejected" &&
        job.status !== "Withdrawn"
    );

    pageTitle = "In Progress Applications";
  }

  if (filter === "offers") {
    displayedJobs = jobs.filter(
      (job) => job.status === "Offer"
    );

    pageTitle = "Offers";
  }

  return (
    <div className="jobs-page">
      <div className="jobs-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1>{pageTitle}</h1>

        {isLoading ? (
          <div className="jobs-message">
            Loading applications...
          </div>
        ) : displayedJobs.length === 0 ? (
          <div className="jobs-message">
            No applications found.
          </div>
        ) : (
          <div className="jobs-list">
            {displayedJobs.map((job) => (
              <div
                key={job.id}
                className="job-list-card"
                onClick={() =>
                  navigate(`/jobs/${job.id}`)
                }
              >
                <div>
                  <h3>{job.job_title}</h3>
                  <p>{job.company}</p>
                </div>

                <span
                  className={`job-list-status status-${job.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;