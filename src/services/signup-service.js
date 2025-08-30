import api from "./api";

export const signupHandler = async (username, number, email, password, setAlert) => {
  try {
    const data = await api.post(`/api/auth/register`, {
      username: username,
      number: number,
      email: email,
      password: password,
    });
    console.log("Signed Up");
    console.log(data);
    setAlert({
      open: true,
      message: `Account Created:: username - ${username}`,
      type: "success",
    });
  } catch (err) {
    console.log("error adding user to database", err?.response?.data || err.message);
    setAlert({ open: true, message: "Signup failed", type: "error" });
  }
};
