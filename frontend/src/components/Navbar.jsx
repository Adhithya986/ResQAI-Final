import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      background: "#0f172a",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>🚨 ResQAI</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/features" style={{ color: "white", textDecoration: "none" }}>Features</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
        <Link to="/sos">SOS</Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;