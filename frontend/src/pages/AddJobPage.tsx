import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/jobService";
import "../styles/form.css";
import "../styles/addJob.css";

function AddJobPage() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState("Interested");

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const result = await createJob(
      company,
      jobTitle,
      jobDescription,
      status
    );

    if (!result.ok) {
      console.error(result.data);
      return;
    }

    console.log(result.data);

    navigate("/dashboard");
  }

  return (
    <div className="add-job-page">
      <div className="add-job-container">
        <div className="add-job-topbar">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="add-job-header">
          <h1>Add Job Opportunity</h1>
          <p>
            Track a new position and keep all the important details in one place.
          </p>
        </div>

        <div className="add-job-content">
          <form
            className="add-job-form-card"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(event) =>
                  setJobTitle(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobDescription">
                Job Description
              </label>

              <textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                value={jobDescription}
                onChange={(event) =>
                  setJobDescription(event.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">
                Application Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="Interested">Interested</option>
                <option value="Applied">Applied</option>
                <option value="HR Interview">
                  HR Interview
                </option>
                <option value="Technical Interview">
                  Technical Interview
                </option>
                <option value="Final Interview">
                  Final Interview
                </option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button
              type="submit"
              className="add-job-submit"
            >
              Add Job
            </button>
          </form>

          <aside className="add-job-info-card">
            <h3>Why add the full description?</h3>
            <p>
              JobFlow will use the job description later to compare the role
              requirements with your skills and generate a fit analysis.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AddJobPage;