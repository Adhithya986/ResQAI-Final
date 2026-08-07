import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import HomeWeather from "../components/HomeWeather";
import HomeMap from "../components/HomeMap";
import EmergencyAlert from "../components/EmergencyAlert";

const socket = io("http://localhost:5000");

function Home() {
  const navigate = useNavigate();

  const [liveAlert, setLiveAlert] = useState(null);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.on("receive-alert", (data) => {
      setLiveAlert(data);

      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: "/logo.png",
        });
      }
    });

    return () => {
      socket.off("receive-alert");
    };
  }, []);

  return (
    <>
      <EmergencyAlert
        alert={liveAlert}
        onClose={() => setLiveAlert(null)}
      />

      <section className="hero">
        <h1>🚨 ResQAI</h1>

        <h2>AI Disaster Response & Emergency Coordination Platform</h2>

        <p>
          Helping people before, during and after disasters using Artificial
          Intelligence, GPS Tracking and Real-Time Emergency Response.
        </p>

        <div className="buttons">
          <button
            className="primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="danger"
            onClick={() => navigate("/sos")}
          >
            🚨 Send SOS
          </button>
        </div>
      </section>

      <HomeWeather />

      {/* Uncomment after Google Maps API is ready */}
      {/* <HomeMap /> */}

      <section className="features">
        <h2>Our Features</h2>

        <div className="cards">
          <div className="card">
            <h3>🚨 One Tap SOS</h3>
            <p>Send your live location instantly.</p>
          </div>

          <div className="card">
            <h3>📍 Live GPS</h3>
            <p>Track victims in real time.</p>
          </div>

          <div className="card">
            <h3>🤖 AI Analysis</h3>
            <p>Analyze disaster images automatically.</p>
          </div>

          <div className="card">
            <h3>🏥 Nearby Hospitals</h3>
            <p>Locate nearby emergency services.</p>
          </div>

          <div className="card">
            <h3>👥 Volunteers</h3>
            <p>Connect volunteers with victims.</p>
          </div>

          <div className="card">
            <h3>📊 Dashboard</h3>
            <p>Monitor all rescue requests live.</p>
          </div>
        </div>
      </section>

      <section className="alerts">
        <h2>🌍 Live Disaster Alerts</h2>

        <div className="alert-container">
          <div className="alert flood">
            <h3>🌊 Flood</h3>
            <p>Heavy rainfall reported in Hyderabad.</p>
          </div>

          <div className="alert fire">
            <h3>🔥 Fire</h3>
            <p>Forest fire detected in Nallamala region.</p>
          </div>

          <div className="alert quake">
            <h3>🌍 Earthquake</h3>
            <p>Minor tremors reported near Vizag.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <h2>Why Choose ResQAI?</h2>

        <div className="stats-container">
          <div className="stat">
            <h1>24/7</h1>
            <p>Emergency Monitoring</p>
          </div>

          <div className="stat">
            <h1>1000+</h1>
            <p>Citizens Supported</p>
          </div>

          <div className="stat">
            <h1>500+</h1>
            <p>Emergency Alerts</p>
          </div>

          <div className="stat">
            <h1>50+</h1>
            <p>Volunteer Teams</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div>
            <h2>🚨 ResQAI</h2>
            <p>
              Helping people before, during and after disasters using
              Artificial Intelligence.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p>Home</p>
            <p>About</p>
            <p>Features</p>
            <p>Contact</p>
          </div>

          <div>
            <h3>Emergency Numbers</h3>
            <p>🚓 Police : 100</p>
            <p>🚒 Fire : 101</p>
            <p>🚑 Ambulance : 108</p>
          </div>
        </div>

        <hr />

        <p className="copyright">
          © 2026 ResQAI | Built for IdeaVerse 2026
        </p>
      </footer>
    </>
  );
}

export default Home;