import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services";
import { useAuth, useAlert } from "../../context";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();
  const { setAlert } = useAlert();
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState({});
  const [shake, setShake] = useState(false);
  const containerRef = useRef(null);

  const handleNumberChange = (event) => {
    authDispatch({ type: "NUMBER", payload: event.target.value });
  };

  const handleBlur = (field) => () => setTouched((s) => ({ ...s, [field]: true }));

  const handlePasswordChange = (event) => {
    authDispatch({ type: "PASSWORD", payload: event.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // validate on submit
    const nValid = validateNumber(number);
    const pValid = validatePassword(password);
    if (nValid && pValid) {
      const result = await loginHandler(number, password, setAlert);
      if (result && result.accessToken) {
        authDispatch({ type: "SET_ACCESS_TOKEN", payload: result.accessToken });
        authDispatch({ type: "SET_USER_NAME", payload: result.username });
        authDispatch({ type: "CLEAR_USER_DATA" });
        authDispatch({ type: "SHOW_AUTH_MODAL" });
        return;
      }
      // On failure, trigger shake
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleTestCredentialsClick = async () => {
    const { accessToken, username } = await loginHandler(
      7878787878,
      "Abcd@1234",
      setAlert
    );
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  return (
    <motion.div ref={containerRef} className={`auth-container ${shake ? 'shake' : ''}`} animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}>
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <div className={`input-underline ${focused.number ? 'focused' : ''} floating`}>
            <input
              value={number}
              type="text"
              className="auth-input"
              maxLength="10"
              placeholder=" "
              required
              onChange={handleNumberChange}
              onBlur={() => { handleBlur('number')(); setFocused((s)=>({...s, number:false})); }}
              onFocus={() => setFocused((s)=>({...s, number:true}))}
            />
            <label>Mobile Number</label>
          </div>
          {touched.number && !validateNumber(number) && (
            <small className="input-error">Enter a valid 10-digit mobile number</small>
          )}
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <div className={`input-underline ${focused.password ? 'focused' : ''} floating`}>
            <input
              value={password}
              className="auth-input"
              placeholder=" "
              type="password"
              required
              onChange={handlePasswordChange}
              onBlur={() => { handleBlur('password')(); setFocused((s)=>({...s, password:false})); }}
              onFocus={() => setFocused((s)=>({...s, password:true}))}
            />
            <label>Password</label>
          </div>
          {touched.password && !validatePassword(password) && (
            <small className="input-error">Invalid password format</small>
          )}
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </motion.div>
  );
};
