import React from "react";

function About() {
  return (
    <div className="container py-5">

      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          🚨 ResQAI
        </h1>

        <h3 className="text-primary">
          AI-Powered Disaster Response & Emergency Coordination Platform
        </h3>

        <p className="lead mt-3">
          ResQAI is an intelligent emergency response platform designed
          to connect people in distress with administrators and rescue
          teams quickly and efficiently.
        </p>
      </div>

      {/* ABOUT */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">
          <h2 className="text-primary mb-3">
            🌍 About ResQAI
          </h2>

          <p>
            ResQAI is a full-stack AI-powered disaster response system
            developed to improve emergency communication, coordination,
            and rescue operations.
          </p>

          <p>
            During emergencies such as floods, fires, earthquakes,
            accidents, and medical emergencies, people may struggle to
            communicate their exact situation and location.
          </p>

          <p>
            ResQAI provides a centralized platform where an individual
            can send an SOS request containing their personal details,
            emergency type, description, GPS location, and disaster
            image.
          </p>

          <p className="mb-0">
            The emergency request can then be monitored by administrators,
            analyzed using AI, displayed on a live map, and assigned to
            an appropriate rescue team.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mb-5">
        <h2 className="text-center mb-4">
          ⚙️ How ResQAI Works
        </h2>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <div className="display-5">🚨</div>
                <h4 className="mt-3">1. Send SOS</h4>
                <p>
                  The user provides emergency details and sends an
                  SOS request.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <div className="display-5">📍</div>
                <h4 className="mt-3">2. Location</h4>
                <p>
                  The user's GPS coordinates can be attached to the
                  emergency request.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <div className="display-5">🤖</div>
                <h4 className="mt-3">3. AI Analysis</h4>
                <p>
                  Uploaded disaster images can be analyzed using AI
                  to provide useful emergency information.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm text-center">
              <div className="card-body">
                <div className="display-5">🚑</div>
                <h4 className="mt-3">4. Rescue</h4>
                <p>
                  Administrators can assign suitable rescue teams
                  to the emergency.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* KEY FEATURES */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">

          <h2 className="text-primary mb-4">
            ⭐ Key Features
          </h2>

          <div className="row">

            <div className="col-md-6">
              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  🚨 Emergency SOS System
                </li>

                <li className="list-group-item">
                  📍 GPS Location Sharing
                </li>

                <li className="list-group-item">
                  🎤 Voice SOS Input
                </li>

                <li className="list-group-item">
                  📷 Disaster Image Upload
                </li>

                <li className="list-group-item">
                  🤖 AI Disaster Image Analysis
                </li>

              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  🗺️ Live Emergency Map
                </li>

                <li className="list-group-item">
                  🌦️ Weather Information
                </li>

                <li className="list-group-item">
                  🚑 Rescue Team Assignment
                </li>

                <li className="list-group-item">
                  📊 Admin Dashboard
                </li>

                <li className="list-group-item">
                  ⚡ Real-Time SOS Notifications
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* SYSTEM FLOW */}
      <div className="mb-5">
        <h2 className="text-center mb-4">
          🔄 Emergency Response Flow
        </h2>

        <div className="card shadow border-0">
          <div className="card-body text-center p-4">

            <div className="row align-items-center">

              <div className="col-md">
                <h4>👤 User</h4>
                <p>Reports Emergency</p>
              </div>

              <div className="col-md-auto">
                <h2>➡️</h2>
              </div>

              <div className="col-md">
                <h4>🚨 SOS</h4>
                <p>Emergency Request</p>
              </div>

              <div className="col-md-auto">
                <h2>➡️</h2>
              </div>

              <div className="col-md">
                <h4>🤖 AI</h4>
                <p>Analyze Information</p>
              </div>

              <div className="col-md-auto">
                <h2>➡️</h2>
              </div>

              <div className="col-md">
                <h4>👨‍💻 Admin</h4>
                <p>Monitor & Assign</p>
              </div>

              <div className="col-md-auto">
                <h2>➡️</h2>
              </div>

              <div className="col-md">
                <h4>🚑 Rescue</h4>
                <p>Respond</p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* TECHNOLOGY */}
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body p-4">

          <h2 className="text-primary mb-4">
            💻 Technology Used
          </h2>

          <div className="row text-center">

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>⚛️ React</h4>
                <p className="mb-0">
                  Frontend user interface
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🟢 Node.js</h4>
                <p className="mb-0">
                  Backend runtime
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🚂 Express.js</h4>
                <p className="mb-0">
                  Backend API
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🍃 MongoDB</h4>
                <p className="mb-0">
                  Emergency data storage
                </p>
              </div>
            </div>

          </div>

          <div className="row text-center mt-2">

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🤖 Gemini AI</h4>
                <p className="mb-0">
                  Image analysis
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🔌 Socket.IO</h4>
                <p className="mb-0">
                  Real-time communication
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🗺️ Maps</h4>
                <p className="mb-0">
                  Emergency location
                </p>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="border rounded p-3 h-100">
                <h4>🌦️ Weather API</h4>
                <p className="mb-0">
                  Weather information
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* OBJECTIVE */}
      <div className="card bg-dark text-white shadow-lg border-0 mb-5">
        <div className="card-body p-5 text-center">

          <h2>🎯 Our Objective</h2>

          <p className="lead mt-3 mb-0">
            To build a reliable and intelligent emergency coordination
            platform that helps people communicate emergencies quickly
            and helps response teams organize and respond more
            efficiently.
          </p>

        </div>
      </div>

      {/* FINAL MESSAGE */}
      <div className="text-center">

        <h2>
          🚨 When Every Second Matters, ResQAI Responds.
        </h2>

        <p className="text-muted mt-3">
          AI • Location • Communication • Coordination • Rescue
        </p>

      </div>

    </div>
  );
}

export default About;