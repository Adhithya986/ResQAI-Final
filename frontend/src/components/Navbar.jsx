import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    alert("👋 Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        style={{
          background: "linear-gradient(135deg, #0b1120 0%, #1e293b 100%)",
          color: "white",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🚨</span>
          <span style={{ fontSize: "1.3rem", fontWeight: "800", letterSpacing: "0.5px" }}>
            ResQ<span style={{ color: "#38bdf8" }}>AI</span>
          </span>
        </Link>

        {/* Desktop Links (Hidden on small screens) */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <Link
            to="/"
            style={{
              color: isActive("/") ? "#38bdf8" : "#e2e8f0",
              textDecoration: "none",
              fontWeight: isActive("/") ? "bold" : "500",
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
              fontWeight: isActive("/about") ? "bold" : "500",
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
              fontWeight: isActive("/features") ? "bold" : "500",
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
              fontWeight: isActive("/contact") ? "bold" : "500",
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
              padding: "7px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "0.9rem",
              boxShadow: "0 2px 10px rgba(239,68,68,0.4)",
            }}
          >
            🚨 SEND SOS
          </Link>

          {token ? (
            <div className="d-flex align-items-center gap-2 ms-2">
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "5px 12px",
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
                style={{ fontSize: "0.82rem", padding: "5px 12px", minHeight: "34px" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2 ms-2">
              <Link
                to="/login"
                className="btn btn-sm btn-outline-light"
                style={{ fontSize: "0.85rem", padding: "6px 14px", minHeight: "34px" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-primary"
                style={{ fontSize: "0.85rem", padding: "6px 14px", minHeight: "34px" }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Header Right: Quick SOS Pill & Hamburger */}
        <div className="d-flex d-lg-none align-items-center gap-2">
          <Link
            to="/sos"
            onClick={closeMenu}
            style={{
              background: "#ef4444",
              color: "white",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "0.82rem",
              boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
            }}
          >
            🚨 SOS
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.6rem",
              padding: "4px 8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "40px",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "58px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(11, 17, 32, 0.98)",
            backdropFilter: "blur(12px)",
            zIndex: 999,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            overflowY: "auto",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {token && (
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                padding: "12px 16px",
                borderRadius: "12px",
                marginBottom: "8px",
              }}
            >
              <div style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "0.95rem" }}>
                👤 {name || "Logged In"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
                Role: {role || "Citizen"} {team ? `• Unit: ${team}` : ""}
              </div>
            </div>
          )}

          <Link
            to="/"
            onClick={closeMenu}
            style={{
              color: isActive("/") ? "#38bdf8" : "white",
              textDecoration: "none",
              fontSize: "1.15rem",
              fontWeight: "600",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            🏠 Home
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            style={{
              color: isActive("/about") ? "#38bdf8" : "white",
              textDecoration: "none",
              fontSize: "1.15rem",
              fontWeight: "600",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ℹ️ About ResQAI
          </Link>

          <Link
            to="/features"
            onClick={closeMenu}
            style={{
              color: isActive("/features") ? "#38bdf8" : "white",
              textDecoration: "none",
              fontSize: "1.15rem",
              fontWeight: "600",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ⚡ Platform Features
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            style={{
              color: isActive("/contact") ? "#38bdf8" : "white",
              textDecoration: "none",
              fontSize: "1.15rem",
              fontWeight: "600",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            📞 Emergency Contact
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                style={{
                  color: "#38bdf8",
                  textDecoration: "none",
                  fontSize: "1.15rem",
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                📊 Admin Dashboard
              </Link>
              <Link
                to="/broadcast"
                onClick={closeMenu}
                style={{
                  color: "#38bdf8",
                  textDecoration: "none",
                  fontSize: "1.15rem",
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                📢 Emergency Broadcast
              </Link>
            </>
          )}

          {role === "Rescue" && (
            <Link
              to="/rescue-dashboard"
              onClick={closeMenu}
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontSize: "1.15rem",
                fontWeight: "bold",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              🚑 Rescue Missions {team ? `(${team})` : ""}
            </Link>
          )}

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              to="/sos"
              onClick={closeMenu}
              className="btn btn-danger w-100 py-3 fw-bold"
              style={{ fontSize: "1.1rem", borderRadius: "10px" }}
            >
              🚨 SEND EMERGENCY SOS
            </Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-light w-100 py-2 mt-2"
                style={{ borderRadius: "10px" }}
              >
                🚪 Logout
              </button>
            ) : (
              <div className="d-flex gap-2 mt-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="btn btn-outline-light flex-fill py-2"
                  style={{ borderRadius: "10px" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="btn btn-primary flex-fill py-2"
                  style={{ borderRadius: "10px" }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;