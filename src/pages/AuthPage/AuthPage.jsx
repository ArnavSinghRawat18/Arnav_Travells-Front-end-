import React from 'react';
import { motion } from 'framer-motion';
import './AuthPage.css';
import { AuthModal } from '../../components';

export const AuthPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="auth-page-root d-flex align-center justify-center"
    >
      <div className="auth-page-card shadow">
        <AuthModal />
      </div>
    </motion.div>
  );
};

export default AuthPage;
