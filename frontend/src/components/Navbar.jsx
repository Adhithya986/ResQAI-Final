import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const team = localStorage.getItem("team");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("team");
    alert("👋 Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #0b1120 0%, #1e293b 100%)",
        color: "white",
        padding: "12px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "1.6rem" }}>🚨</span>
        <span style={{ fontSize: "1.35rem", fontWeight: "bold", letterSpacing: "0.5px" }}>
          ResQ<span style={{ color: "#38bdf8" }}>AI</span>
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
        <Link
          to="/"
          style={{
            color: isActive("/") ? "#38bdf8" : "#e2e8f0",
            textDecoration: "none",
            fontWeight: isActive("/") ? "bold" : "normal",
            fontSize: "0.95rem",
          }}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={{
            color: isActive("/about") ? "#38bdf8" : "#e2e8f0",
            textDecoration: "none",
            fontWeight: isActive("/about") ? "bold" : "normal",
            fontSize: "0.95rem",
          }}
        >
          About
        </Link>

        <Link
          to="/features"
          style={{
            color: isActive("/features") ? "#38bdf8" : "#e2e8f0",
            textDecoration: "none",
            fontWeight: isActive("/features") ? "bold" : "normal",
            fontSize: "0.95rem",
          }}
        >
          Features
        </Link>

        <Link
          to="/contact"
          style={{
            color: isActive("/contact") ? "#38bdf8" : "#e2e8f0",
            textDecoration: "none",
            fontWeight: isActive("/contact") ? "bold" : "normal",
            fontSize: "0.95rem",
          }}
        >
          Contact
        </Link>

        {role === "Admin" && (
          <>
            <Link
              to="/dashboard"
              style={{
                color: isActive("/dashboard") ? "#38bdf8" : "#cbd5e1",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/broadcast"
              style={{
                color: isActive("/broadcast") ? "#38bdf8" : "#cbd5e1",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            >
              📢 Broadcast
            </Link>
          </>
        )}

        {role === "Rescue" && (
          <Link
            to="/rescue-dashboard"
            style={{
              color: isActive("/rescue-dashboard") ? "#38bdf8" : "#cbd5e1",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          >
            🚑 Missions {team ? `(${team})` : ""}
          </Link>
        )}

        <Link
          to="/sos"
          style={{
            background: "#ef4444",
            color: "white",
            textDecoration: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.9rem",
            boxShadow: "0 2px 10px rgba(239,68,68,0.4)",
          }}
        >
          🚨 SEND SOS
        </Link>

        {token ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "10px" }}>
            <span
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "0.82rem",
                color: "#e2e8f0",
              }}
            >
              👤 {name || "User"} ({role || "Citizen"})
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-light"
              style={{ fontSize: "0.82rem", padding: "4px 10px" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", marginLeft: "10px" }}>
            <Link
              to="/login"
              className="btn btn-sm btn-outline-light"
              style={{ fontSize: "0.85rem", padding: "5px 12px" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-primary"
              style={{ fontSize: "0.85rem", padding: "5px 12px" }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;