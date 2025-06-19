import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProgresstrackerComponent from '../components/ProgresstrackerComponenet';

const Progresstracker = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar toggles based on state */}
      <Sidebar open={sidebarOpen} />

      <div className="flex-1">
        {/* Header toggles sidebar */}
        <Header isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

        {/* Main content goes here */}
        <div className="p-4">
          {/* Student dashboard or content */}
          <ProgresstrackerComponent />
        </div>
      </div>
    </div>
  );
};

export default Progresstracker;
