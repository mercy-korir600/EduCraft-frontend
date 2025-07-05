import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme on initial load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // Update theme when toggled
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="absolute top-4 right-4 p-2 bg-emerald-200 dark:bg-emerald-700 text-xl rounded-full transition"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
