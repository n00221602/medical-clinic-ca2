import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

//Doctor pages
import DoctorIndex from "./pages/doctors/Index";
import SingleDoctor from "./pages/doctors/SingleDoctor";

//Forms
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorIndex />} />
        <Route path="/doctors/:id" element={<SingleDoctor/>} />
        
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
