import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const UpdateProfileComponent = () => {
  const { user, setUser } = useContext(UserContext);

  // Initialize state from context or default values
  const [profile, setProfile] = useState(() => ({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex@example.com",
    careerGoal: user?.careerGoal || "Software Engineer",
    extraCareers: user?.extraCareers || [],
    currentGrade: user?.currentGrade || "A",
    preferences: user?.preferences || {
      darkMode: false,
      notifications: true,
      weeklyReports: true,
    },
  }));

  const [showModal, setShowModal] = useState(false);
  const [selectedCareers, setSelectedCareers] = useState(profile.extraCareers);

  // Career options
  const careerOptions = [
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer",
  ];

  const gradeOptions = ["A", "B", "C", "D", "F"];

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setProfile((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle add career modal toggle
  const handleAddCareer = () => {
    setShowModal(true);
  };

  // Handle checkbox in modal
  const toggleCareer = (career) => {
    setSelectedCareers((prev) =>
      prev.includes(career)
        ? prev.filter((c) => c !== career)
        : [...prev, career]
    );
  };

  // Save careers from modal
  const handleSaveCareers = () => {
    setProfile((prev) => ({
      ...prev,
      extraCareers: selectedCareers,
    }));

    setShowModal(false);
  };

  // Handle profile save
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save globally and persist
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    alert("Profile updated successfully!");
  };

  // Careers to display in modal (exclude current goal)
  const availableCareers = careerOptions.filter(
    (c) => c !== profile.careerGoal
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-emerald-700">
        Update Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Career Goals
          </h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Current Goal:{" "}
              <span className="font-semibold text-emerald-700">
                {profile.careerGoal}
              </span>
            </p>
            <button
              type="button"
              onClick={handleAddCareer}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            >
              ADD CAREER
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Change Main Career Goal
          </label>
          <select
            name="careerGoal"
            value={profile.careerGoal}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
          >
            {careerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {profile.extraCareers?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Additional Careers:
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {profile.extraCareers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Academic Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Academic Information
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Grade
          </label>
          <div className="flex space-x-4">
            {gradeOptions.map((grade) => (
              <label key={grade} className="inline-flex items-center">
                <input
                  type="radio"
                  name="currentGrade"
                  value={grade}
                  checked={profile.currentGrade === grade}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">{grade}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Preferences
          </h2>
          <div className="space-y-3">
            {Object.entries(profile.preferences).map(([key, value]) => (
              <label key={key} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Modal for Add Career */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add Additional Careers
            </h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableCareers.map((career) => (
                <label
                  key={career}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCareers.includes(career)}
                    onChange={() => toggleCareer(career)}
                    className="h-4 w-4 text-emerald-600"
                  />
                  <span className="text-gray-700">{career}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCareers}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileComponent;
