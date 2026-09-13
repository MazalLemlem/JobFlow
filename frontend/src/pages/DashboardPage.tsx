import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/jobService";
import "../styles/dashboard.css";

type Job = {
  id: number;
  company: string;
  job_title: string;
  job_description: string;
  status: string;
  created_at: string;
};

function DashboardPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const totalApplications = jobs.length;

  const offers = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const inProgress = jobs.filter(
    (job) =>
      job.status !== "Offer" &&
      job.status !== "Rejected" &&
      job.status !== "Withdrawn"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>JobFlow</h1>
            <p>
              Welcome back! Here's your job search overview.
            </p>
          </div>

          <div className="dashboard-actions">
            <button
              type="button"
              className="logout-button"
              onClick={() => navigate("/login")}
            >
              Log out
            </button>

            <button
              type="button"
              className="add-job-button"
              onClick={() => navigate("/jobs/new")}
            >
              + Add Job
            </button>
          </div>
        </header>

        <section className="summary-grid">
          <div
            className="summary-card clickable-summary-card"
            onClick={() => navigate("/jobs")}
          >
            <h3>Total Applications</h3>
            <p className="summary-number">
              {totalApplications}
            </p>
          </div>

          <div
            className="summary-card clickable-summary-card"
            onClick={() =>
              navigate("/jobs?filter=in-progress")
            }
          >
            <h3>In Progress</h3>
            <p className="summary-number">
              {inProgress}
            </p>
          </div>

          <div
            className="summary-card clickable-summary-card"
            onClick={() =>
              navigate("/jobs?filter=offers")
            }
          >
            <h3>Offers</h3>
            <p className="summary-number">
              {offers}
            </p>
          </div>
        </section>

        <section className="applications-section">
          <h2>Recent Applications</h2>

          {isLoading ? (
            <div className="empty-state">
              <p>Loading applications...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">
              <p>No applications yet.</p>
              <p>
                Add your first job opportunity to get started.
              </p>
            </div>
          ) : (
            <div className="applications-list">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="application-card"
                  onClick={() =>
                    navigate(`/jobs/${job.id}`)
                  }
                >
                  <div>
                    <h3>{job.job_title}</h3>

                    <p className="application-company">
                      {job.company}
                    </p>
                  </div>

                  <span className="application-status">
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;