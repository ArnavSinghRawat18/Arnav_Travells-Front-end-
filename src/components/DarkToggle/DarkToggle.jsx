import React from 'react';
import './DarkToggle.css';
import { useDark } from '../../context/darkmode-context';

export const DarkToggle = () => {
  const { dark, setDark } = useDark();
  return (
    <button className="dark-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
      <div className={`icon ${dark ? 'dark' : 'light'}`}></div>
    </button>
  );
};

export default DarkToggle;
