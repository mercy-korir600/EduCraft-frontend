// Sidebar.jsx
import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { SiChatbot, SiPivotaltracker } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import { UserContext } from "../context/UserContext"; 

// Map of career goal -> courses
const careerGoals = {
  "Software Engineer": ["React", "Node.js", "Algorithms"],
  "Data Scientist": ["Python", "Machine Learning", "Statistics"],
  "UX Designer": ["Figma", "User Research", "Prototyping"],
};

const Sidebar = () => {
  const { user } = useContext(UserContext); 
  const userGoal = user?.careerGoal ?? null;
  const [coursesOpen, setCoursesOpen] = useState(false);

  // Close dropdown if no userGoal
  useEffect(() => {
    if (!userGoal || !careerGoals[userGoal]) setCoursesOpen(false);
  }, [userGoal]);

  const userCourses = userGoal ? careerGoals[userGoal] || [] : [];

  return (
    <nav className="w-64 font-serif bg-white shadow-md h-[calc(100vh-4rem)] sticky top-16">
      {/* Career Goal Section */}
      <div className="p-4 border-b">
        <div className="text-sm text-gray-600">Career goal:</div>
        <div className="font-medium text-emerald-700">
          {userGoal ? (
            userGoal
          ) : (
            <Link to="/updateprofile" className="text-sm text-emerald-600 underline">
              Set your career goal
            </Link>
          )}
        </div>
      </div>

      <ul className="py-4">
        <SidebarItem
          to="/Dashboard"
          icon={<MdDashboardCustomize className="text-2xl" />}
          label="Dashboard"
        />

        {/* Courses Dropdown */}
        <li className="px-4">
          <button
            onClick={() => setCoursesOpen((prev) => !prev)}
            className="flex items-center w-full py-3 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <MdDashboardCustomize className="text-2xl mr-3" />
            <span className="flex-1 text-left">Courses</span>
            <FiChevronDown
              className={`transition-transform duration-200 ${
                coursesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown content */}
          {coursesOpen && (
            <div className="pl-12 mt-2">
              {userGoal ? (
                userCourses.length > 0 ? (
                  <ul>
                    {userCourses.map((course) => (
                      <li key={course} className="py-1">
                        <NavLink
                          to={`/course/${encodeURIComponent(course)}`}
                          className={({ isActive }) =>
                            `block text-sm py-1 rounded ${
                              isActive
                                ? "text-emerald-700 font-medium"
                                : "text-gray-700 hover:text-emerald-600"
                            }`
                          }
                        >
                          {course}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-gray-500">
                    No courses available for "{userGoal}".
                  </div>
                )
              ) : (
                <div className="text-sm text-gray-500">
                  No career goal selected.{" "}
                  <Link to="/updateprofile" className="text-emerald-600 underline">
                    Set it now
                  </Link>
                </div>
              )}
            </div>
          )}
        </li>

        <SidebarItem
          to="/Progresstracker"
          icon={<SiPivotaltracker className="text-2xl" />}
          label="Progress Tracker"
        />
        <SidebarItem
          to="/updateprofile"
          icon={<CgProfile className="text-2xl" />}
          label="Update Profile"
        />
        <SidebarItem
          to="/ask-ai"
          icon={<SiChatbot className="text-2xl" />}
          label="Ask AI Assistant"
        />
      </ul>

      {/* Support Section */}
      <div className="px-4 py-6 border-t">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-medium text-emerald-700">Need help?</h3>
          <p className="text-sm text-gray-600 mt-1">
            Our support team is available 24/7
          </p>
          <button className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700">
            Contact Support
          </button>
        </div>
      </div>
    </nav>
  );
};

// Reusable Sidebar Item
const SidebarItem = ({ to, icon, label }) => (
  <li className="px-4">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 rounded-lg transition-colors ${
          isActive
            ? "bg-emerald-100 text-emerald-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);

export default Sidebar;
