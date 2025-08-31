import { createContext, useContext, useEffect, useState } from 'react';

const DarkContext = createContext();

export const DarkProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dark')) || false } catch(e){ return false }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
};

export const useDark = () => useContext(DarkContext);
