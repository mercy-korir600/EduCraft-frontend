import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/Onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learningpath"
          element={
            <ProtectedRoute>
              <Learningpath />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progresstracker"
          element={
            <ProtectedRoute>
              <Progresstracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateprofile"
          element={
            <ProtectedRoute>
              <Updateprofile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ask-ai"
          element={
            <ProtectedRoute>
              <AskAI />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC */}
        <Route path="/course" element={<Course />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;