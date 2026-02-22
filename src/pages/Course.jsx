import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CourseComponent from '../components/CourseComponent';
import { useNavigate } from "react-router-dom";


const Course = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-serif">
       <Sidebar open={sidebarOpen} />

      <div className="flex-1">
          <Header isOpen={sidebarOpen} toggleOpen={setSidebarOpen} />
        <div className="p-4">
          <CourseComponent/>
        </div>
      </div>
    </div>
  );
};

export default Course;
