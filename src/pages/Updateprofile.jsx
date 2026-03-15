import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SettingsComponent from '../components/SettingsComponent';


const Updateprofile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden">
          <SettingsComponent />  
        </main>
      </div>
    </div>
  );
};

export default Updateprofile;
  