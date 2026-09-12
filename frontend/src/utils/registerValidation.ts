export type RegisterErrors = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function validateRegisterForm(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): RegisterErrors {
  const errors: RegisterErrors = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (fullName.trim().split(/\s+/).length < 2) {
    errors.fullName = "Please enter both first and last name";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (
    !/[A-Za-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    errors.password =
      "Password must contain at least one letter and one number";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}