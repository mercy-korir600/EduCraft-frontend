import { useState } from 'react';

const UpdateprofileComponent = () => {
  // User data state
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    careerGoal: 'Software Engineer',
    currentGrade: 'A',
    preferences: {
      darkMode: false,
      notifications: true,
      weeklyReports: true
    }
  });

  // Available options
  const gradeOptions = ['A', 'B', 'C', 'D', 'F'];
  const careerOptions = [
    'Software Engineer',
    'Data Scientist',
    'UX Designer',
    'Product Manager',
    'DevOps Engineer'
  ];

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend
    console.log('Updated profile:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Update Your Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Career Goals</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career Path</label>
            <select
              name="careerGoal"
              value={profile.careerGoal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {careerOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Academic Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Grade</label>
            <div className="flex space-x-4">
              {gradeOptions.map(grade => (
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
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
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
            <div className="block">
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
            </div>
            <div className="block">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="weeklyReports"
                  checked={profile.preferences.weeklyReports}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-700">Receive Weekly Progress Reports</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateprofileComponent;