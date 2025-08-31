import { AuthLogin, AuthSignup } from "../index";
import "./AuthModal.css";
import { useAuth } from "../../context";
import { motion } from 'framer-motion';

export const AuthModal = () => {
  const { authDispatch, selectedTab } = useAuth();

  const handleLoginClick = () => authDispatch({ type: "SET_TO_LOGIN" });
  const handleSignupClick = () => authDispatch({ type: "SET_TO_SIGNUP" });
  const hanelModalCloseClick = () => authDispatch({ type: "SHOW_AUTH_MODAL" });

  const indicatorStyle = selectedTab === 'login' ? { left: '0%', width: '50%' } : { left: '50%', width: '50%' };

  return (
    <div className="auth-modal-container fixed">
      <div className="auth-modal absolute shadow right-0">
        <div className="d-flex align-center shadow tab-row" style={{ position: 'relative' }}>
          <button className={`button btn-auth grow-shrink-basis cursor-pointer`} onClick={handleLoginClick}>Login</button>
          <button className={`button btn-auth grow-shrink-basis cursor-pointer`} onClick={handleSignupClick}>Signup</button>
          <button className="button btn-auth btn-close d-flex align-center justify-center cursor-pointer" onClick={hanelModalCloseClick}>
            <span className="material-icons-outlined">close</span>
          </button>
          <motion.div className="tab-indicator" layout transition={{ type: 'spring', stiffness: 400, damping: 30 }} style={indicatorStyle} />
        </div>
        <div className="auth-modal-body">
          <motion.div key={selectedTab} initial={{ x: selectedTab === 'login' ? 50 : -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: selectedTab === 'login' ? -50 : 50, opacity: 0 }} transition={{ duration: 0.35 }}>
            {selectedTab === "login" ? <AuthLogin /> : selectedTab === "signup" ? <AuthSignup /> : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
