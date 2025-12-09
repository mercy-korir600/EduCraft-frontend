import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardComponent from '../components/DashboardComponent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} />

      <div className="flex-1">
        <Header isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />

        <div className="p-4">
          <DashboardComponent />    
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  