import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://travelapp.cyclic.app";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const {
      data: { accessToken, username },
    } = await axios.post(`${API_BASE}/api/auth/login`, {
      number: number,
      password: password,
    });
    console.log("Logged IN");
    console.log({ accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    setAlert({
      open: true,
      message: "Login Successful!",
      type: "success",
    });
    return { accessToken, username };
  } catch (err) {
    console.log("unable to login", err?.response?.data || err.message);
    setAlert({ open: true, message: "Login failed", type: "error" });
  }
};
