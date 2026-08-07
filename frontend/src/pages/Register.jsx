import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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

        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          📝 Register
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-3"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
           <option value="Citizen">Citizen</option>
<option value="Rescue">Rescue Team</option>
<option value="Admin">Admin</option>
          </select>

          {formData.role === "Rescue" && (
            <select
              className="form-select mb-3"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select Rescue Team</option>
              <option value="Team Alpha">Team Alpha</option>
              <option value="Team Bravo">Team Bravo</option>
              <option value="Team Charlie">Team Charlie</option>
              <option value="Fire Team">Fire Team</option>
              <option value="Medical Team">Medical Team</option>
              <option value="Police Team">Police Team</option>
            </select>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>

        </form>

        <hr />

        <p className="text-center mb-0">
          Already have an account?{" "}
          <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;