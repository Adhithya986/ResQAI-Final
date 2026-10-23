import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/broadcast"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Broadcast />
            </ProtectedRoute>
          }
        />

        {/* Protected Rescue Route */}
        <Route
          path="/rescue-dashboard"
          element={
            <ProtectedRoute allowedRole="Rescue">
              <RescueDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;