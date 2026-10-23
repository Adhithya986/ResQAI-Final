import React from "react";

function Features() {
  const features = [
    {
      icon: "🚨",
      title: "Emergency SOS",
      description:
        "Users can quickly send an emergency SOS request with their name, phone number, emergency type, description, location and disaster image.",
      color: "danger",
    },
    {
      icon: "📍",
      title: "Live GPS Location",
      description:
        "The system can retrieve the user's current GPS coordinates and attach them to the emergency request.",
      color: "primary",
    },
    {
      icon: "🎤",
      title: "Voice SOS",
      description:
        "Users can describe their emergency using voice input, making communication easier during stressful situations.",
      color: "info",
    },
    {
      icon: "📷",
      title: "Disaster Image Upload",
      description:
        "Users can upload an image of the emergency situation so administrators and AI services can analyze the incident.",
      color: "warning",
    },
    {
      icon: "🤖",
      title: "AI Disaster Analysis",
      description:
        "Uploaded disaster images can be analyzed using AI to provide useful information about the emergency.",
      color: "secondary",
    },
    {
      icon: "🗺️",
      title: "Live Emergency Map",
      description:
        "Emergency locations can be displayed on a map so administrators can understand where incidents are occurring.",
      color: "success",
    },
    {
      icon: "🌦️",
      title: "Weather Information",
      description:
        "Weather information can be displayed for the location associated with an emergency request.",
      color: "info",
    },
    {
      icon: "🚑",
      title: "Rescue Team Assignment",
      description:
        "Administrators can assign suitable rescue teams such as medical, police or fire teams to emergency requests.",
      color: "danger",
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      description:
        "Administrators can monitor SOS requests, view their status, inspect locations and manage emergency responses.",
      color: "primary",
    },
    {
      icon: "⚡",
      title: "Real-Time SOS Alerts",
      description:
        "Socket.IO enables real-time communication so new SOS requests can appear on the administrator dashboard immediately.",
      color: "warning",
    },
    {
      icon: "🔄",
      title: "SOS Status Management",
      description:
        "Administrators can update emergency requests between Pending, Accepted, Completed and Rejected states.",
      color: "success",
    },
    {
      icon: "📱",
      title: "Emergency Response Platform",
      description:
        "ResQAI brings emergency reporting, location, AI analysis, weather, mapping and rescue coordination into one platform.",
      color: "dark",
    },
  ];

  return (
    <div className="container py-5">

      {/* HERO */}
      <div className="text-center mb-5">

        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white mb-3"
          style={{
            width: "90px",
            height: "90px",
            fontSize: "45px",
          }}
        >
          🚨
        </div>

        <h1 className="display-4 fw-bold">
          ResQAI Features
        </h1>

        <p className="lead text-muted">
          Intelligent tools designed to improve emergency response,
          communication and rescue coordination.
        </p>

      </div>

      {/* MAIN FEATURES */}
      <div className="row g-4">

        {features.map((feature, index) => (
          <div className="col-md-6 col-lg-4" key={index}>

            <div
              className="card h-100 shadow-sm border-0"
              style={{
                transition: "0.3s",
              }}
            >

              <div className="card-body p-4">

                <div
                  className={`bg-${feature.color} text-white rounded-circle d-flex align-items-center justify-content-center mb-3`}
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "30px",
                  }}
                >
                  {feature.icon}
                </div>

                <h4 className="fw-bold">
                  {feature.title}
                </h4>

                <p className="text-muted mb-0">
                  {feature.description}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EMERGENCY FLOW */}
      <div className="mt-5">

        <h2 className="text-center fw-bold mb-4">
          🔄 How ResQAI Responds
        </h2>

        <div className="card shadow-lg border-0">

          <div className="card-body p-4">

            <div className="row text-center align-items-center">

              <div className="col-md">
                <div className="display-4">👤</div>
                <h5>User</h5>
                <small className="text-muted">
                  Reports emergency
                </small>
              </div>

              <div className="col-md-auto">
                <span className="fs-2">➡️</span>
              </div>

              <div className="col-md">
                <div className="display-4">🚨</div>
                <h5>SOS</h5>
                <small className="text-muted">
                  Request created
                </small>
              </div>

              <div className="col-md-auto">
                <span className="fs-2">➡️</span>
              </div>

              <div className="col-md">
                <div className="display-4">🤖</div>
                <h5>AI</h5>
                <small className="text-muted">
                  Information analyzed
                </small>
              </div>

              <div className="col-md-auto">
                <span className="fs-2">➡️</span>
              </div>

              <div className="col-md">
                <div className="display-4">👨‍💻</div>
                <h5>Admin</h5>
                <small className="text-muted">
                  Monitors emergency
                </small>
              </div>

              <div className="col-md-auto">
                <span className="fs-2">➡️</span>
              </div>

              <div className="col-md">
                <div className="display-4">🚑</div>
                <h5>Rescue Team</h5>
                <small className="text-muted">
                  Responds to emergency
                </small>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DASHBOARD FEATURES */}
      <div className="mt-5">

        <h2 className="text-center fw-bold mb-4">
          📊 Admin Dashboard Capabilities
        </h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="display-4">📈</div>
                <h4 className="mt-3">
                  Emergency Statistics
                </h4>
                <p className="text-muted">
                  View total, pending, accepted and completed SOS
                  requests.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="display-4">🔎</div>
                <h4 className="mt-3">
                  Search & Filter
                </h4>
                <p className="text-muted">
                  Quickly search emergency requests and filter them
                  by status or emergency type.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                <div className="display-4">🚑</div>
                <h4 className="mt-3">
                  Team Management
                </h4>
                <p className="text-muted">
                  Assign rescue teams and track which team is
                  handling an emergency.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* TECHNOLOGY */}
      <div className="mt-5">

        <h2 className="text-center fw-bold mb-4">
          💻 Technology Behind ResQAI
        </h2>

        <div className="row g-3">

          {[
            ["⚛️", "React", "Frontend"],
            ["🟢", "Node.js", "Backend"],
            ["🚂", "Express.js", "REST API"],
            ["🍃", "MongoDB", "Database"],
            ["🤖", "Gemini AI", "AI Analysis"],
            ["⚡", "Socket.IO", "Real-Time"],
            ["🗺️", "Maps", "Location"],
            ["🌦️", "Weather API", "Weather"],
          ].map(([icon, name, role], index) => (

            <div className="col-6 col-md-3" key={index}>

              <div className="border rounded p-3 text-center h-100">

                <div className="fs-1">
                  {icon}
                </div>

                <h5 className="mt-2 mb-1">
                  {name}
                </h5>

                <small className="text-muted">
                  {role}
                </small>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FINAL CTA */}
      <div className="card bg-dark text-white shadow-lg border-0 mt-5">

        <div className="card-body text-center p-5">

          <h2 className="fw-bold">
            🚨 Every Second Matters
          </h2>

          <p className="lead mt-3">
            ResQAI combines emergency communication, AI,
            location intelligence and rescue coordination
            into one platform.
          </p>

          <p className="mb-0">
            <strong>
              AI • Location • Communication • Coordination • Rescue
            </strong>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Features;