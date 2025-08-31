import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer";

const initialValue = {
  isAuthModalOpen: false,
  isDropDownModalOpen: false,
  username: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: "",
  accessToken: localStorage.getItem("token") || "",
  name: localStorage.getItem("username") || "",
  selectedTab: "login",
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }) => {
  const [
    {
      isAuthModalOpen,
      isDropDownModalOpen,
      username,
      email,
      password,
      number,
      accessToken,
      name,
      selectedTab,
      confirmPassword,
    },
    authDispatch,
  ] = useReducer(authReducer, initialValue);

  // Persist token changes to localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
    } else {
      localStorage.removeItem("token");
    }
  }, [accessToken]);

  // Persist username changes to localStorage
  useEffect(() => {
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
  }, [name]);

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        isDropDownModalOpen,
        username,
        email,
        password,
        number,
        accessToken,
        name,
        selectedTab,
        confirmPassword,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
