import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-brand-200 dark:bg-brand-700 text-xl rounded-full transition-all duration-300 transform hover:scale-110"
      aria-label="Toggle Theme"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
