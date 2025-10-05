// src/components/OnboardingModal.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const OnboardingModal = ({ isOpen, onClose }) => {
  const { user, updateCareerGoal } = useContext(UserContext);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const allCareers = [
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer",
    "AI Engineer",
    "Cybersecurity Analyst",
  ];

  // Remove the current user careerGoal from list
  const filteredCareers = allCareers.filter(
    (career) => career !== user?.careerGoal
  );

  const handleSave = () => {
    if (!selectedCareer) {
      setError("Please select a career.");
      return;
    }

    updateCareerGoal(selectedCareer);
    setSelectedCareer("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">
          Add New Career
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Career
            </label>
            <select
              value={selectedCareer}
              onChange={(e) => {
                setSelectedCareer(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Choose a Career --</option>
              {filteredCareers.map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
