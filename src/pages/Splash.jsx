import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import studpic from "../assets/studpic.png";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen font-sans flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-900 transition-colors duration-500">
        
        {/* Navigation Header */}
        <nav className="w-full max-w-7xl flex justify-between items-center p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
            EduCraft
          </h1>
          <ThemeToggle />
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl w-full text-center">
          
          <div className="relative group mb-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={studpic}
              alt="Students learning"
              className="relative w-full max-w-2xl object-cover rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
            Elevate Your <span className="text-emerald-600 dark:text-emerald-400">Learning</span> Journey
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10 leading-relaxed">
            EduCraft is an interactive platform designed to help students learn, collaborate, and grow. 
            Connect with tools and peers to master your university or high school courses.
          </p>

          {/* Features Card - Glassmorphism style */}
          <div className="w-full max-w-3xl bg-white/40 dark:bg-emerald-900/10 backdrop-blur-md border border-white/20 dark:border-emerald-500/20 p-8 rounded-3xl shadow-xl mb-12 text-left">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-6 flex items-center gap-2">
              Why Choose EduCraft?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Tailored study materials",
                "Live discussion boards",
                "Goal & progress tracking",
                "Collaborative study groups"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-slate-700 dark:text-slate-200">
                  <HiCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={() => navigate("/Login")}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-emerald-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30"
          >
            Get Started Free
            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </main>

        {/* Subtle Footer Decor */}
        <footer className="py-8 text-slate-400 dark:text-slate-600 text-sm">
          © 2026 EduCraft. Empowering the next generation of learners.
        </footer>
      </div>
    </PageWrapper>
  );
};

export default Splash;