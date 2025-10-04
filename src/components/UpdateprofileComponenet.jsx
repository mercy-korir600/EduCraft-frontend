import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const UpdateProfileComponent = () => {
  //  Access global user context
  const { user, setUser } = useContext(UserContext);

  //  Initialize form state safely using context or defaults
  const [profile, setProfile] = useState(() => ({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex@example.com",
    careerGoal: user?.careerGoal || "Software Engineer",
    currentGrade: user?.currentGrade || "A",
    preferences: user?.preferences || {
      darkMode: false,
      notifications: true,
      weeklyReports: true
    }
  }));

  // Options for select inputs
  const gradeOptions = ["A", "B", "C", "D", "F"];
  const careerOptions = [
    "Software Engineer",
    "Data Scientist",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer"
  ];

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setProfile((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  //  Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Update context and persist in localStorage
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    alert("Profile updated successfully!");
  };

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
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Career Goals
          </h2>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mb-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            >
              ADD CAREER
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Career Path
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
          </div>
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
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="darkMode"
                checked={profile.preferences.darkMode}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-gray-700">Dark Mode</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={profile.preferences.notifications}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-gray-700">Enable Notifications</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="weeklyReports"
                checked={profile.preferences.weeklyReports}
                onChange={handleChange}
                className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="ml-2 text-gray-700">
                Receive Weekly Progress Reports
              </span>
            </label>
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
    </div>
  );
};

export default UpdateProfileComponent;
