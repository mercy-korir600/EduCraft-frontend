import React from 'react';
import { CgProfile } from "react-icons/cg";
/**
 * Header component containing logo, title, and user profile
 */
const Header = () => {
  return (
    <header className="bg-white shadow w-full">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Application title/logo */}
        <h1 className="text-2xl font-bold text-emerald-600">Student Dashboard</h1>
        
        {/* User controls and profile section */}
        <div className="flex items-center space-x-4">
          {/* Notification bell icon */}
          <div className="relative">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          
          {/* User profile */}
          <div className="flex items-center">
            {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10"></div> */}  
       <CgProfile  className="text-2xl" />
            <span className="ml-2 font-medium">Alex Johnson</span>
          </div>
        </div>
      </div>
    </header> 
  );
};

export default Header;