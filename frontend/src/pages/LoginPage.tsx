import { useState } from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { loginUser } from "../services/authService";
import { validateLoginForm } from "../utils/loginValidation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import "../styles/form.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setServerMessage("");

    const newErrors = validateLoginForm(email, password);

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (errorMessage) => errorMessage !== ""
    );

    if (hasErrors) {
      return;
    }

    const result = await loginUser(email, password);

    if (!result.ok) {
      setServerMessage(result.data.detail);
      setIsSuccess(false);
      return;
    }

    setServerMessage(result.data.message);
    setIsSuccess(true);

    navigate("/dashboard");
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="logo">JobFlow</h1>

        <h2>Log in to your account</h2>

        <p className="subtitle">
          Continue managing your job search
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            error={errors.email}
            onChange={setEmail}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={setPassword}
          />

          {serverMessage && (
            <p
              className={
                isSuccess
                  ? "server-message success"
                  : "server-message error"
              }
            >
              {serverMessage}
            </p>
          )}

          <button type="submit" className="register-button">
            Log In
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;