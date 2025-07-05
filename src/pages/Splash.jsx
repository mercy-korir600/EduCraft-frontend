import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import studpic from "../assets/studpic.png"
import { HiLightBulb } from "react-icons/hi";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center 
          bg-gradient-to-r from-emerald-200 via-emerald-50 to-emerald-300 
          dark:from-emerald-200 dark:via-emerald-50 dark:bg-emerald-100 dark:to-emerald-300 
          p-6 text-center transition-all">

          <ThemeToggle />

          <div className="absolute top-4 left-4 z-50">
  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
    bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900 
    dark:from-emerald-600 dark:via-emerald-400 dark:to-emerald-700 animate-glow">
    ThinkCrest
  </h1>
  {/* <HiLightBulb className='top-4 left-6 z-50' /> */}
</div>

 <img
   src={studpic}
   alt=""
   className=" w-2/3  object-cover  rounded-xl mb-6  "
 />
          <p className="text-lg md:text-xl font-semibold text-black dark:text-black max-w-2xl mb-8 mt-3">
            ThinkCrest is an interactive platform designed to help students learn, collaborate, and grow together.
            Whether you're in high school or university, ThinkCrest connects you with the tools, content, and peers to support your educational journey.
          </p>


          <div className=" p-6 rounded-xl shadow-lg max-w-3xl mb-6 text-left w-ful">
               {/* bg-gray-100 dark:bg-emerald-800 */}
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-rose-400 mb-2">
              Get ahead of your studies,give yourself an head start
            </h2>
            <ul className="list-disc list-inside text-black dark:text-black space-y-2">
              <li>Browse study materials tailored to your level and subject</li>
              <li>Interact with other students through discussion boards and live help</li>
              <li>Track your learning progress and set study goals</li>
              <li>Join study sessions, groups, challenges, and more</li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/Login")}
            className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900
animate-glow text-white px-8 py-3 rounded-2xl shadow-lg transition-all
              hover:bg-emerald-700 
              dark:bg-gradient-to-r dark:from-emerald-700 dark:via-emerald-500 dark:to-emerald-900 
              dark:hover:from-emerald-800 dark:hover:via-emerald-600 dark:hover:to-emerald-900"
          >
            Get Started
          </button>

        </div>
      </PageWrapper>
    </div>
  );
};

export default Splash;
