// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Learningpath from './pages/Learningpath';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import Progresstracker from './pages/Progresstracker';
import Updateprofile from './pages/Updateprofile';
import AskAI from './pages/AskAI';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/Learningpath" element={<Learningpath />} />
        <Route path="/Course" element={<Course />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Progresstracker" element={<Progresstracker />} />
        <Route path="/Updateprofile" element={<Updateprofile />} />
        <Route path="/Ask-AI" element={<AskAI />} />
        {/* catch all route */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
