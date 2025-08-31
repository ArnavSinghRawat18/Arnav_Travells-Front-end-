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
  return data;
  } catch (err) {
  console.log("error adding user to database", err?.response?.data || err.message);
  // Prefer a server-provided message when available
  const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message || 'Signup failed';
  setAlert({ open: true, message: serverMsg, type: "error" });
  return null;
  }
};
