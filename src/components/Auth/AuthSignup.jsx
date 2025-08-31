import "./Auth.css";
import { useAuth, useAlert } from "../../context";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../../utils";

import { signupHandler } from "../../services";
import { useState } from "react";
import { motion } from 'framer-motion';

export const AuthSignup = () => {
  const { username, email, password, number, confirmPassword, authDispatch } = useAuth();
  const { setAlert } = useAlert();
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState({});
  const [shake, setShake] = useState(false);

  const handleNumberChange = (event) => {
    authDispatch({ type: "NUMBER", payload: event.target.value });
  };

  const handleBlur = (field) => () => setTouched((s) => ({ ...s, [field]: true }));

  const handleNameChange = (event) => {
    authDispatch({ type: "NAME", payload: event.target.value });
  };

  const handleEmailChange = (event) => {
    authDispatch({ type: "EMAIL", payload: event.target.value });
  };

  const handlePasswordChange = (event) => {
    authDispatch({ type: "PASSWORD", payload: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    authDispatch({ type: "CONFIRM_PASSWORD", payload: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate current values from context instead of relying on module-level flags
    const numValid = validateNumber(number);
    const nameValid = validateName(username);
    const emailValid = validateEmail(email);
    const passValid = validatePassword(password);
    const confirmPassValid = password === confirmPassword && passValid;

    if (!numValid || !nameValid || !emailValid || !passValid || !confirmPassValid) {
      setAlert({ open: true, message: 'Please correct the highlighted fields', type: 'error' });
      setShake(true);
      setTimeout(()=>setShake(false), 600);
      return;
    }

    // Attempt signup and only clear on success
    const result = await signupHandler(username, number, email, password, setAlert);
    if (result) {
      authDispatch({ type: "CLEAR_USER_DATA" });
      return;
    }
    setShake(true);
    setTimeout(()=>setShake(false), 600);
  };

  return (
    <motion.div className={`auth-container ${shake ? 'shake' : ''}`} animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}>
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <div className={`input-underline ${focused.number ? 'focused' : ''} floating`}>
            <input
              value={number || ''}
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
          <div className={`input-underline ${focused.username ? 'focused' : ''} floating`}>
            <input
              value={username || ''}
              className="auth-input"
              placeholder=" "
              required
              onChange={handleNameChange}
              onBlur={() => { handleBlur('username')(); setFocused((s)=>({...s, username:false})); }}
              onFocus={() => setFocused((s)=>({...s, username:true}))}
            />
            <label>Name</label>
          </div>
          {touched.username && !validateName(username) && (
            <small className="input-error">Name must be at least 2 characters</small>
          )}
        </div>
        <div className="d-flex direction-column lb-in-container">
          <div className={`input-underline ${focused.email ? 'focused' : ''} floating`}>
            <input
              value={email || ''}
              className="auth-input"
              placeholder=" "
              type="email"
              required
              onChange={handleEmailChange}
              onBlur={() => { handleBlur('email')(); setFocused((s)=>({...s, email:false})); }}
              onFocus={() => setFocused((s)=>({...s, email:true}))}
            />
            <label>Email</label>
          </div>
          {touched.email && !validateEmail(email) && (
            <small className="input-error">Enter a valid email address</small>
          )}
        </div>
        <div className="d-flex direction-column lb-in-container">
          <div className={`input-underline ${focused.password ? 'focused' : ''} floating`}>
            <input
              value={password || ''}
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
            <small className="input-error">Password should be 8+ chars, include letters & numbers</small>
          )}
          <div className="password-strength">
            <div className={`strength-bar ${password && password.length >= 8 ? 'strong' : password && password.length >= 4 ? 'medium' : 'weak'}`} />
          </div>
        </div>
        <div className="d-flex direction-column lb-in-container">
          <div className={`input-underline ${focused.confirmPassword ? 'focused' : ''} floating`}>
            <input
              value={confirmPassword || ''}
              className="auth-input"
              placeholder=" "
              type="password"
              required
              onChange={handleConfirmPasswordChange}
              onBlur={() => { handleBlur('confirmPassword')(); setFocused((s)=>({...s, confirmPassword:false})); }}
              onFocus={() => setFocused((s)=>({...s, confirmPassword:true}))}
            />
            <label>Confirm Password</label>
          </div>
          {touched.confirmPassword && confirmPassword !== password && (
            <small className="input-error">Passwords do not match</small>
          )}
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};
