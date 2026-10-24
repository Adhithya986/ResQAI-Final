import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isActive = (path) => location.pathname === path;

  // Determine user dashboard path
  const userPath =
    role === "Admin"
      ? "/dashboard"
      : role === "Rescue"
      ? "/rescue-dashboard"
      : token
      ? "/"
      : "/login";

  const userLabel =
    role === "Admin"
      ? "Admin"
      : role === "Rescue"
      ? "Missions"
      : token
      ? "Profile"
      : "Login";

  const userIcon =
    role === "Admin"
      ? "📊"
      : role === "Rescue"
      ? "🚑"
      : token
      ? "👤"
      : "🔑";

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <Link to="/" className={`mobile-nav-item ${isActive("/") ? "active" : ""}`}>
        <span className="icon">🏠</span>
        <span>Home</span>
      </Link>

      <Link to="/features" className={`mobile-nav-item ${isActive("/features") ? "active" : ""}`}>
        <span className="icon">⚡</span>
        <span>Features</span>
      </Link>

      {/* Floating Emergency Action Button */}
      <Link to="/sos" className="mobile-nav-sos pulse-animation" title="Send Instant SOS">
        <span className="icon">🚨</span>
        <span>SOS</span>
      </Link>

      <Link to="/about" className={`mobile-nav-item ${isActive("/about") ? "active" : ""}`}>
        <span className="icon">ℹ️</span>
        <span>About</span>
      </Link>

      <Link to={userPath} className={`mobile-nav-item ${isActive(userPath) ? "active" : ""}`}>
        <span className="icon">{userIcon}</span>
        <span>{userLabel}</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
