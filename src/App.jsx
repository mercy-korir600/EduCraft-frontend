// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
// import Onboarding from "./pages/Onboarding"
// import Learningpath from "./pages/Learningpath"
// import Student from "./pages/Student"
// import Utility from "./pages/Utility"
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// function App() {
  

//   return (
//     <>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login/>} />
//         <Route path="/Signup" element={<Signup/>}/>
//         <Route path="/Onboarding" element={<Onboarding/>}/>
//         <Route path="/Learningpath" element={<Learningpath/>}/>
//         <Route path="/Student" element={<Student/>}/>
//         <Route path="/Utility" element={<Utility/>}/>
//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App



import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Onboarding from "./pages/Onboarding"
import Learningpath from "./pages/Learningpath"
import Utility from "./pages/Utility"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Progresstracker from "./pages/ProgressTracker";
import Updateprofile from "./pages/UpdateProfile";
import AskAI from './pages/AskAI';
import Student from "./pages/Student";

/**
 * Main application component that sets up routing and layout structure
 */
function App() {
  return (
    <Router>
           <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/Signup" element={<Signup/>}/>
              <Route path="/Onboarding" element={<Onboarding/>}/>
              <Route path="/Learningpath" element={<Learningpath/>}/>
              <Route path="/Student" element={<Student/>}/>
              <Route path="/Utility" element={<Utility/>}/>
              <Route path="/Progresstracker" element={<Progresstracker />} />
              <Route path="/Updateprofile" element={<Updateprofile />} />
              <Route path="/Ask-AI" element={<AskAI />} />
           </Routes>
    </Router>
  );
}

export default App;