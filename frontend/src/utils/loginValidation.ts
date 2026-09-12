export type LoginErrors = {
  email: string;
  password: string;
};

export function validateLoginForm(
  email: string,
  password: string
): LoginErrors {
  const errors: LoginErrors = {
    email: "",
    password: "",
  };

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}