import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdDashboardCustomize, MdOutlineLibraryBooks, MdOutlineQuiz } from "react-icons/md";
import { SiChatbot, SiPivotaltracker } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { FiChevronDown, FiHelpCircle, FiX, FiSettings } from "react-icons/fi";
import { UserContext } from "../context/UserContext"; 
import { motion, AnimatePresence } from "framer-motion";

const careerGoals = {
  "Software Engineer": ["React", "Node.js", "Algorithms"],
  "Data Scientist": ["Python", "Machine Learning", "Statistics"],
  "UX Designer": ["Figma", "User Research", "Prototyping"],
};

const Sidebar = ({ isOpen, toggleOpen }) => {
  const { user } = useContext(UserContext); 
  const userGoal = user?.careerGoal ?? null;
  const [coursesOpen, setCoursesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!userGoal || !careerGoals[userGoal]) setCoursesOpen(false);
  }, [userGoal]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      toggleOpen(false);
    }
  }, [location.pathname]);

  const userCourses = userGoal ? careerGoals[userGoal] || [] : [];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen || window.innerWidth >= 1024 ? "open" : "closed"}
        className={`fixed lg:sticky top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 lg:z-30 h-screen transition-colors duration-300 overflow-y-auto no-scrollbar`}
      >
        <div className="flex flex-col h-full">
          {/* Header/Logo for Mobile */}
          <div className="p-6 lg:hidden flex justify-between items-center border-b dark:border-gray-700">
            <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">EduCraft</span>
            <button onClick={() => toggleOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <FiX />
            </button>
          </div>

          {/* Career Goal Section */}
          <div className="p-6 border-b dark:border-gray-700">
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Your Journey</div>
            <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-800/50">
              <div className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-1">Career Goal</div>
              <div className="font-bold text-gray-800 dark:text-gray-100">
                {userGoal ? (
                  userGoal
                ) : (
                  <Link to="/updateprofile" className="text-sm text-brand-600 dark:text-brand-400 underline decoration-2 underline-offset-4">
                    Set your goal
                  </Link>
                )}
              </div>
              {userGoal && (
                <div className="mt-3 w-full bg-brand-200 dark:bg-brand-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-600 dark:bg-brand-400 h-full w-1/3 rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 py-6 px-4 space-y-1">
            <SidebarItem
              to="/Dashboard"
              icon={<MdDashboardCustomize />}
              label="Dashboard"
            />

            <div className="pt-2">
              <button
                onClick={() => setCoursesOpen((prev) => !prev)}
                className={`flex items-center w-full py-3 px-4 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-400 transition-all group ${coursesOpen ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400' : ''}`}
              >
                <MdOutlineLibraryBooks className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
                <span className="flex-1 text-left font-medium">My Courses</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    coursesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pr-4 py-2 space-y-1">
                      {userGoal && userCourses.length > 0 ? (
                        userCourses.map((course) => (
                          <NavLink
                            key={course}
                            to={`/course/${encodeURIComponent(course)}`}
                            className={({ isActive }) =>
                              `block py-2 px-3 rounded-lg text-sm transition-all ${
                                isActive
                                  ? "bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300 font-bold"
                                  : "text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-300 hover:translate-x-1"
                              }`
                            }
                          >
                            {course}
                          </NavLink>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400 dark:text-gray-500 py-2 italic">
                          No courses to show.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <SidebarItem
              to="/Progresstracker"
              icon={<SiPivotaltracker />}
              label="Progress Tracker"
            />
            <SidebarItem
              to="/ask-ai"
              icon={<SiChatbot />}
              label="AI Tutor"
              isNew
            />
            <SidebarItem
              to="/updateprofile"
              icon={<FiSettings />}
              label="Settings"
            />
          </div>

          {/* Bottom Section */}
          <div className="p-6 border-t dark:border-gray-700">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-5 text-white shadow-lg shadow-brand-900/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiHelpCircle className="text-xl" />
                </div>
                <h3 className="font-bold">Support</h3>
              </div>
              <p className="text-xs text-brand-100 mb-4 leading-relaxed">
                Stuck on a problem? Our team is ready to help you 24/7.
              </p>
              <button className="w-full py-2.5 bg-white text-brand-700 rounded-xl text-sm font-bold hover:bg-brand-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

const SidebarItem = ({ to, icon, label, isNew }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-3 px-4 rounded-xl transition-all group ${
        isActive
          ? "bg-brand-600 text-white shadow-lg shadow-brand-900/20"
          : "text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-400"
      }`
    }
  >
    <span className={`text-2xl mr-3 transition-transform group-hover:scale-110`}>
      {icon}
    </span>
    <span className="flex-1 font-medium">{label}</span>
    {isNew && (
      <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
        New
      </span>
    )}
  </NavLink>
);

export default Sidebar;
