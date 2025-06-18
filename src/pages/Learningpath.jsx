import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaClock, FaCalendarAlt, FaYoutube, FaFilePdf, FaGlobe, FaCheck, FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const LearningPath = () => {
  const [time, setTime] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Study');
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const learningPath = {
    title: "Web Development Bootcamp",
    duration: "12 weeks",
    description: "A comprehensive path to become a full-stack web developer",
    progress: 35,
    weeklyPlan: [
      {
        week: 1,
        title: "HTML Fundamentals",
        description: "Learn the structure of web pages",
        completed: true,
        modules: [
          { id: 1, title: "HTML Basics", duration: "2 hours", completed: true },
          { id: 2, title: "Forms and Inputs", duration: "1.5 hours", completed: true },
          { id: 3, title: "Semantic HTML", duration: "1 hour", completed: true }
        ]
      },
      {
        week: 2,
        title: "CSS Styling",
        description: "Style your web pages with CSS",
        completed: true,
        modules: [
          { id: 4, title: "CSS Selectors", duration: "2 hours", completed: true },
          { id: 5, title: "Layouts with Flexbox", duration: "2.5 hours", completed: true },
          { id: 6, title: "CSS Grid", duration: "2 hours", completed: false }
        ]
      },
      {
        week: 3,
        title: "JavaScript Basics",
        description: "Add interactivity to your websites",
        completed: false,
        modules: [
          { id: 7, title: "Variables and Data Types", duration: "2 hours", completed: false },
          { id: 8, title: "Functions and Scope", duration: "2.5 hours", completed: false },
          { id: 9, title: "DOM Manipulation", duration: "3 hours", completed: false }
        ]
      },
      {
        week: 4,
        title: "Advanced JavaScript",
        description: "Deep dive into modern JavaScript",
        completed: false,
        modules: [
          { id: 10, title: "ES6 Features", duration: "2.5 hours", completed: false },
          { id: 11, title: "Async Programming", duration: "3 hours", completed: false },
          { id: 12, title: "Error Handling", duration: "1.5 hours", completed: false }
        ]
      }
    ],
    dailyTask: {
      title: "CSS Grid Implementation",
      description: "Create a responsive layout using CSS Grid",
      duration: "60 minutes",
      moduleId: 6
    },
    resources: [
      {
        id: 1,
        title: "CSS Grid Tutorial",
        type: "video",
        source: "YouTube",
        link: "https://www.youtube.com/watch?v=9zBsdzdE4sM",
        duration: "25 min"
      },
      {
        id: 2,
        title: "Complete CSS Guide",
        type: "pdf",
        source: "Mozilla Developer Network",
        link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        duration: "45 min"
      },
      {
        id: 3,
        title: "CSS Grid Generator",
        type: "website",
        source: "CSS-Tricks",
        link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
        duration: "15 min"
      }
    ]
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      if (sessionType === 'Study') {
        setSessionType('Break');
        setTime(300);
      } else {
        setSessionType('Study');
        setTime(1500);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Study');
    setTime(1500);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const toggleModuleCompletion = (weekIndex, moduleIndex) => {
    const moduleId = learningPath.weeklyPlan[weekIndex].modules[moduleIndex].id;
    if (completedModules.includes(moduleId)) {
      setCompletedModules(completedModules.filter(id => id !== moduleId));
    } else {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* UI content here */}
      {/* Code truncated for brevity. You already have the full JSX layout working fine */}
    </div>
  );
};

export default LearningPath;
