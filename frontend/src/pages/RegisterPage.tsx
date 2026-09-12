import { useState } from "react";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import { validateRegisterForm } from "../utils/registerValidation";
import "../styles/register.css";
import "../styles/form.css";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validateRegisterForm(
      fullName,
      email,
      password,
      confirmPassword
    );

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (errorMessage) => errorMessage !== ""
    );

    if (hasErrors) {
      return;
    }

    console.log({
      fullName,
      email,
      password,
    });
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="logo">JobFlow</h1>

        <h2>Create your account</h2>

        <p className="subtitle">
          Start managing your job search in one place
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            error={errors.fullName}
            onChange={setFullName}
          />

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

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={setConfirmPassword}
          />

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;