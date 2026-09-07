import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * ThemeProvider — wraps your app to provide theme context.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'light'|'dark'} [props.defaultTheme='light'] - Initial theme
 * @param {string} [props.storageKey='erp_theme'] - localStorage key
 * @param {boolean} [props.forcedLight=false] - Lock to light mode only
 */
export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  storageKey = 'erp_theme',
  forcedLight = false,
}) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (forcedLight) {
      root.classList.remove('dark');
      localStorage.setItem(storageKey, 'light');
      setThemeState('light');
      return;
    }
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, forcedLight]);

  const setTheme = (newTheme) => {
    if (forcedLight) return;
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    if (forcedLight) return;
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: forcedLight ? 'light' : theme,
        setTheme,
        toggleTheme,
        isDark: !forcedLight && theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export default ThemeProvider;
