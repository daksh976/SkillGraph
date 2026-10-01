import api from "./api";

export async function registerUser(name, email, password) {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
}

export async function loginUser(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function updateUserProfile(selectedLanguage, selectedCareer) {
  const token = localStorage.getItem("skillgraph_token");

  const response = await api.patch(
    "/auth/profile",
    {
      selectedLanguage,
      selectedCareer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}