import api from "../services/axios";

export const login = async (formData: { email: string; password: string }) => {
  const res = await api.post("/auth/login", formData);

  if (res.status === 200) {
    return res.data;
  }
};
