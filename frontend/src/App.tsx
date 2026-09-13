import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddJobPage from "./pages/AddJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/jobs/new" element={<AddJobPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/jobs" element={<JobsPage />} />

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;