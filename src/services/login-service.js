import api from "./api";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const {
      data: { accessToken, username },
    } = await api.post(`/api/auth/login`, {
      number: number,
      password: password,
    });
    console.log("Logged IN");
    console.log({ accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
  setAlert({ open: true, message: "Login Successful!", type: "success" });
    return { accessToken, username };
  } catch (err) {
    console.log("unable to login", err?.response?.data || err.message);
    setAlert({ open: true, message: "Login failed", type: "error" });
  }
};
