// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {
        name: "Alex Johnson",
        email: "alex@example.com",
        careerGoal: "Software Engineer",
        careerGoals: ["Software Engineer"],
      };
    } catch {
      return null;
    }
  });

  // Sync user changes with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Helper to update a user's career goal globally
  const updateCareerGoal = (newGoal) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        careerGoal: newGoal,
        careerGoals: prev?.careerGoals?.includes(newGoal)
          ? prev.careerGoals
          : [...(prev?.careerGoals || []), newGoal],
      };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateCareerGoal }}>
      {children}
    </UserContext.Provider>
  );
};
