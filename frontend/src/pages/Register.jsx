import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getApiUrl } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Citizen",
    team: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.role === "Rescue" && !formData.team) {
      alert("Please select or enter your Rescue Team name.");
      return;
    }

    try {
      const response = await fetch(getApiUrl("/api/users/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Registration Successful!\nPlease login.");

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "Citizen",
          team: "",
        });

        // Redirect to Login Page
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Registration Failed. Make sure the backend server is running.");
    }
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">📝 Register for ResQAI</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Account Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Citizen">Citizen (Request Emergency SOS)</option>
              <option value="Rescue">Rescue Team (Respond to Missions)</option>
              <option value="Admin">Admin (Control Center & Dispatch)</option>
            </select>
          </div>

          {formData.role === "Rescue" && (
            <div className="mb-3 p-3 bg-light rounded border border-primary">
              <label className="form-label fw-bold text-primary">
                🚑 Select Your Rescue Team Unit
              </label>
              <select
                className="form-select mb-2"
                name="team"
                value={formData.team}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose Assigned Team --</option>
                <option value="Team Alpha">🚑 Team Alpha (Rapid Response)</option>
                <option value="Team Bravo">🚑 Team Bravo (Evacuation)</option>
                <option value="Team Charlie">🚑 Team Charlie (Search & Rescue)</option>
                <option value="Fire Team">🚒 Fire Team (Fire & Hazard)</option>
                <option value="Medical Team">🏥 Medical Team (First Aid & Trauma)</option>
                <option value="Police Team">🚓 Police Team (Law & Traffic)</option>
              </select>
              <small className="text-muted">
                Admins dispatch emergency missions to these exact team units.
              </small>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
            Create Account
          </button>
        </form>

        <hr />

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;