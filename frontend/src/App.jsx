import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sos from "./pages/Sos";
import Dashboard from "./pages/Dashboard";
import RescueDashboard from "./pages/RescueDashboard";
import Broadcast from "./pages/Broadcast";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sos" element={<Sos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rescue-dashboard" element={<RescueDashboard />} />
      <Route path="/broadcast" element={<Broadcast />} 
      /></Routes>
    </>
  );
}

export default App;