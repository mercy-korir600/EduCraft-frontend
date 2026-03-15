// Header.jsx
import React from "react";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

const Header = ({ user, isOpen, toggleOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm font-serif w-full sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleOpen(!isOpen)}
            className="p-2 rounded-lg lg:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX className="text-2xl" /> : <HiMenuAlt2 className="text-2xl" />}
          </button>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-200 bg-clip-text text-transparent">
            EduCraft
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          
          <div className="hidden md:block relative">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute top-0.5 right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
          </div>
          
          <div className="flex items-center gap-2 pl-2 border-l dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
              {user?.name?.[0] || <CgProfile />}
            </div>
            <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200 truncate max-w-[100px]">
              {user?.name || "Guest"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
