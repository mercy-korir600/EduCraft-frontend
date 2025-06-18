import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Onboarding from "./pages/Onboarding"
import Learningpath from "./pages/Learningpath"
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Onboarding" element={<Onboarding/>}/>
        <Route path="/Learningpath" element={<Learningpath/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
