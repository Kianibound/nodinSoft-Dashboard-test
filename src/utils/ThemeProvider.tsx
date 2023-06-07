import { PaletteMode } from '@mui/material';
import React, { createContext, useState } from 'react';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light' as PaletteMode,
    toggleTheme: () => {},
  });

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    window.localStorage.getItem('theme') || 'light'
  );

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  window.localStorage.setItem('theme', newTheme);
};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};