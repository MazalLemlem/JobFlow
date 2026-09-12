export async function registerUser(
  fullName: string,
  email: string,
  password: string
) {
  const response = await fetch(
    "http://127.0.0.1:8000/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    data,
  };
}