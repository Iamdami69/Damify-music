import React, { createContext, useEffect, useState } from 'react';
import { UseLocalStorage } from '../../Hooks/UseLocalStorage/UseLocalStorage';
export const ThemeContext = createContext({
  ThemeData: null,
});

export function ThemeContextProvider({ children }) {
  const { GetLocalStorage } = UseLocalStorage();
  const [isDark, setIsDark] = useState(GetLocalStorage('ThemeState'));

  const ThemeData = {
    primaryBackground: !isDark ? '#111419' : '#fff',
    primaryColor: !isDark ? '#eeeeee' : '#060606',
    primaryColorTwo: !isDark ? '#dadee1' : '#39434f',
    depthColor: !isDark ? '#232a32' : '#dbe5f1',
    depthColorTwo: !isDark ? '#313131' : '#dddddd',
    depthColorDarkest: !isDark ? '#1f242e' : '#f9f9f9',
    brandColor: !isDark ? 'rgb(27,204,80)' : 'rgb(116,142,221)',
    brandColorTwo: !isDark ? 'rgb(97, 234, 138)' : 'rgb(112, 138, 220)',
    errorColor: !isDark ? '#ff4d4d' : '#ff7d4d',
  };
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta.content = ThemeData.primaryBackground;
  }, [ThemeData.primaryBackground]);
  return (
    <ThemeContext.Provider value={{ ThemeData, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
