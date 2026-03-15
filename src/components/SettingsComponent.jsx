import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { FiUser, FiSettings, FiLock, FiBell, FiTrash2, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";

const SettingsComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const { darkMode, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: user?.name || "Alex Johnson",
    email: user?.email || "alex@example.com",
    careerGoal: user?.careerGoal || "Software Engineer",
    currentGrade: user?.currentGrade || "A",
    notifications: true,
    weeklyDigest: true,
    publicProfile: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser({ ...user, ...profile });
      localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 800);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "preferences", label: "Preferences", icon: <FiSettings /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white px-4">Settings</h1>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
            
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Profile Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details and how others see you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Career Goal</label>
                  <select
                    name="careerGoal"
                    value={profile.careerGoal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                  >
                    <option>Software Engineer</option>
                    <option>Data Scientist</option>
                    <option>UX Designer</option>
                    <option>Product Manager</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-2xl border border-brand-100 dark:border-brand-800/50">
                  <FiGlobe className="text-brand-600 dark:text-brand-400 text-xl" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-brand-900 dark:text-brand-100">Public Profile</p>
                    <p className="text-xs text-brand-700 dark:text-brand-400">Allow others to see your progress and achievements.</p>
                  </div>
                  <input
                    type="checkbox"
                    name="publicProfile"
                    checked={profile.publicProfile}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-brand-600"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "preferences" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">App Preferences</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customize your experience within the application.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">Dark Mode</p>
                      <p className="text-xs text-gray-500">Switch between light and dark themes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-brand-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">Language</p>
                      <p className="text-xs text-gray-500">Select your preferred interface language.</p>
                    </div>
                    <select className="bg-transparent text-sm font-medium outline-none">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Security Settings</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manage your password and account security.</p>
                </div>

                <div className="space-y-4">
                  <button type="button" className="w-full text-left p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                    <p className="font-bold text-gray-800 dark:text-gray-200">Change Password</p>
                    <p className="text-xs text-gray-500">Update your account password regularly for better security.</p>
                  </button>

                  <button type="button" className="w-full text-left p-4 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group">
                    <div className="flex items-center gap-2 text-red-600">
                      <FiTrash2 />
                      <p className="font-bold">Delete Account</p>
                    </div>
                    <p className="text-xs text-red-500/70">Permanently remove your account and all data. This action is irreversible.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Notifications</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose what updates you want to receive.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive daily updates via email.</p>
                    </div>
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={profile.notifications}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-brand-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">Weekly Digest</p>
                      <p className="text-xs text-gray-500">A summary of your weekly progress.</p>
                    </div>
                    <input
                      type="checkbox"
                      name="weeklyDigest"
                      checked={profile.weeklyDigest}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-brand-600"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer Actions */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-2.5 rounded-xl text-sm font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-900/20 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SettingsComponent;
