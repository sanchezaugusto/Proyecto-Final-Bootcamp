"use server";

export async function register(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const lastname = formData.get("lastname")?.toString() || "";
  const username = formData.get("username")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const bodyPayload = {
    first_name: name,
    last_name: lastname,
    username,
    email,
    password,
  };

  console.log("Register bodyPayload:", bodyPayload);

  try {
    const response = await fetch(`http://localhost:5000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
    });
    console.log("body", JSON.stringify(bodyPayload));
    console.log("Register response:", response.status);
    if (response.status === 400) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}