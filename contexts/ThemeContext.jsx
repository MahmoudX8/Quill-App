import React, { createContext, useContext, useState } from 'react'

const themeCxt = createContext() ;
export const ThemeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);
    const changeMode = () => setDarkMode(!darkMode);
    const setMode = (mode) => {
      if(mode == 'dark') setDarkMode(true);
      else if(mode == 'light') setDarkMode(false);
      else return;
    };
  return (
    <themeCxt.Provider value={{darkMode, changeMode, setMode}}>
        {children}
    </themeCxt.Provider>
  )
};
export const useTheme = () => {
    const context = useContext(themeCxt);
    if (!context) {
        throw new Error('useTheme must be used within an ThemeContextProvider');
    }
    return context;
};
