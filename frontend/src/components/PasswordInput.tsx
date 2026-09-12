import { useState } from "react";

type PasswordInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
};

function PasswordInput({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <div className="password-input-wrapper">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={error ? "input-error" : ""}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          👁️
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default PasswordInput;