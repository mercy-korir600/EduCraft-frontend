// src/components/OnboardingModal.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; 

const OnboardingModal = ({ isOpen, onClose }) => {
  const [newCareer, setNewCareer] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext); 

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!newCareer.trim()) {
      setError("Career name cannot be empty");
      return;
    }
    if (newCareer.length > 50) {
      setError("Career name is too long (max 50 characters)");
      return;
    }

    // Update user's career goal globally
    const updatedUser = { ...user, careerGoal: newCareer.trim() };
    setUser(updatedUser); // Updates context + localStorage

    // Reset and close modal
    setNewCareer("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">Add New Career</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Career Name
            </label>
            <input
              type="text"
              value={newCareer}
              onChange={(e) => {
                setNewCareer(e.target.value);
                setError("");
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter career name"
              maxLength={50}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-gray-500 text-xs mt-1">
              {newCareer.length}/50 characters
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setNewCareer("");
                setError("");
                onClose();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Add Career
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
