import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { SiChatbot,SiPivotaltracker  } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
/**
 * Sidebar navigation component with menu items and support section
 */
const Sidebar = () => {
  return (
    <nav className="w-64 bg-white shadow-md h-[calc(100vh-4rem)] sticky top-16">
      {/* Main navigation links */}
      <ul className="py-4">
        {/* <Link to="/Dashboard"  icon={<MdDashboardCustomize  className="text-2xl"/> }>Dashboard</Link> */}
        <SidebarItem to="/Dashboard" icon={<MdDashboardCustomize  className="text-2xl"/> }label="Dashboard" />
        <SidebarItem to="/Progresstracker" icon={<SiPivotaltracker  className="text-2xl"/>}label="Progress Tracker" />
        <SidebarItem to="/updateprofile" icon={<CgProfile className="text-2xl"/>} label="Update Profile" />
        <SidebarItem to="/ask-ai" icon={<SiChatbot className="text-2xl" />} label="Ask AI Assistant" />
      </ul>
      
      {/* Support section at the bottom */}
      <div className="px-4 py-6 border-t">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="font-medium text-emerald-700">Need help?</h3>
          <p className="text-sm text-gray-600 mt-1">Our support team is available 24/7</p>
          <button className="mt-2 w-full py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700">
            Contact Support
          </button>
        </div>
      </div>
    </nav>
  );
};

/**
 * Reusable sidebar item component
 * @param {string} to - Route path
 * @param {string} icon - Icon name
 * @param {string} label - Display text
 */
const SidebarItem = ({ to, icon, label }) => {
  return (
    <li className="px-4">
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center py-3 px-4 rounded-lg transition-colors ${
            isActive 
              ? 'bg-emerald-100 text-emerald-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`
        }
      >
        <span className="material-icons-outlined mr-3">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;