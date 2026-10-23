import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        getApiUrl("/api/users/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (!data.success) return;

      // Save Login Data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("team", data.user.team);

      // Redirect Based on Role
      if (data.user.role === "Admin") {
        navigate("/dashboard");
      } else if (data.user.role === "Rescue") {
        navigate("/rescue-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          🔑 Login
        </h2>

        <form onSubmit={handleSubmit}>

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

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;