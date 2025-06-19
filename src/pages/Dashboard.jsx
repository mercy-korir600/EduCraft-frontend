import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardComponent from '../components/DashboardComponent';

const Dashboard = () => {
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
          <DashboardComponent />    
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  