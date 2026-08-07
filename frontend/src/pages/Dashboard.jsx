import WeatherCard from "../components/WeatherCard";
import { useEffect, useState } from "react";
import LiveMap from "../components/maps/LiveMap";
import { io } from "socket.io-client";

const API_URL = "https://resqai-final.onrender.com";

// Socket.IO production server
const socket = io(API_URL);

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [emergencyFilter, setEmergencyFilter] = useState("All");

  const [selectedTeams, setSelectedTeams] = useState({});

  // ================================
  // FETCH SOS REQUESTS
  // ================================
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sos`);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Fetch SOS Error:", error);
    }
  };

  // ================================
  // UPDATE STATUS
  // ================================
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/sos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Status Updated Successfully!");
        fetchRequests();
      } else {
        alert(data.message || "❌ Unable to update status");
      }
    } catch (error) {
      console.error("❌ Status Update Error:", error);
      alert("❌ Server error while updating status.");
    }
  };

  // ================================
  // ASSIGN RESCUE TEAM
  // ================================
  const assignTeam = async (id) => {
    const assignedTo = selectedTeams[id];

    if (!assignedTo) {
      alert("⚠️ Please select a rescue team.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/sos/${id}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedTo }),
      });

      const data = await res.json();

      if (data.success) {
        alert("🚑 Team Assigned Successfully!");

        setSelectedTeams((prev) => ({
          ...prev,
          [id]: "",
        }));

        fetchRequests();
      } else {
        alert(data.message || "❌ Assignment failed.");
      }
    } catch (error) {
      console.error("❌ Assignment Error:", error);
      alert("❌ Server error while assigning team.");
    }
  };

  // ================================
  // SOCKET.IO
  // ================================
  useEffect(() => {
    fetchRequests();

    socket.on("connect", () => {
      console.log("🟢 Connected to ResQAI server:", socket.id);
    });

    socket.on("newSOS", (newRequest) => {
      console.log("🚨 New SOS received:", newRequest);

      setRequests((prev) => [newRequest, ...prev]);

      alert("🚨 New SOS Received!");
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from ResQAI server");
    });

    return () => {
      socket.off("connect");
      socket.off("newSOS");
      socket.off("disconnect");
    };
  }, []);

  // ================================
  // SEARCH + FILTER
  // ================================
  const filteredRequests = requests.filter((item) => {
    const name = item.name || "";
    const phone = item.phone || "";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      phone.includes(search);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesEmergency =
      emergencyFilter === "All" ||
      item.emergency === emergencyFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesEmergency
    );
  });

  // ================================
  // IMAGE URL
  // ================================
  const getImageUrl = (image) => {
    if (!image) return null;

    return `${API_URL}/uploads/${image}`;
  };

  return (
    <div className="container mt-4">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <h1 className="text-center mb-4">
        🚨 ResQAI Admin Dashboard
      </h1>

      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div className="row mb-4">

        <div className="col-md-3 mb-3">
          <div className="card text-center bg-primary text-white shadow">
            <div className="card-body">
              <h2>{requests.length}</h2>
              <p>Total SOS</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center bg-warning shadow">
            <div className="card-body">
              <h2>
                {
                  requests.filter(
                    (item) => item.status === "Pending"
                  ).length
                }
              </h2>

              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center bg-info text-white shadow">
            <div className="card-body">
              <h2>
                {
                  requests.filter(
                    (item) => item.status === "Accepted"
                  ).length
                }
              </h2>

              <p>Accepted</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card text-center bg-success text-white shadow">
            <div className="card-body">
              <h2>
                {
                  requests.filter(
                    (item) => item.status === "Completed"
                  ).length
                }
              </h2>

              <p>Completed</p>
            </div>
          </div>
        </div>

      </div>

      {/* ========================= */}
      {/* SEARCH + FILTER */}
      {/* ========================= */}

      <div className="card shadow mb-4">
        <div className="card-body">

          <div className="row">

            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="🔎 Search name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-4 mb-2">
              <select
                className="form-select"
                value={emergencyFilter}
                onChange={(e) =>
                  setEmergencyFilter(e.target.value)
                }
              >
                <option value="All">
                  All Emergencies
                </option>

                <option value="Flood">Flood</option>
                <option value="Fire">Fire</option>
                <option value="Earthquake">
                  Earthquake
                </option>
                <option value="Accident">
                  Accident
                </option>
                <option value="Medical Emergency">
                  Medical Emergency
                </option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* LIVE MAP */}
      {/* ========================= */}

      <div className="mb-4">

        <h3 className="mb-3">
          🗺️ Live Emergency Map
        </h3>

        <LiveMap requests={requests} />

      </div>

      {/* ========================= */}
      {/* SOS REQUESTS */}
      {/* ========================= */}

      {filteredRequests.length === 0 ? (

        <div className="alert alert-info text-center">
          No SOS requests found.
        </div>

      ) : (

        filteredRequests.map((item) => (

          <div
            className="card shadow-lg mb-4 border-0"
            key={item._id}
          >

            <div className="card-body">

              <div className="row">

                {/* ================= */}
                {/* LEFT SIDE */}
                {/* ================= */}

                <div className="col-md-7">

                  <h3>
                    👤 {item.name}
                  </h3>

                  <hr />

                  <p>
                    <strong>📞 Phone:</strong>{" "}
                    {item.phone}
                  </p>

                  <p>
                    <strong>🚨 Emergency:</strong>{" "}
                    {item.emergency}
                  </p>

                  <p>
                    <strong>📝 Description:</strong>{" "}
                    {item.description || "No description"}
                  </p>

                  {/* LOCATION */}

                  {item.location && (
                    <a
                      href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary mb-3"
                    >
                      📍 Open Live Location
                    </a>
                  )}

                  {/* ASSIGNED TEAM */}

                  {item.assignedTo && (
                    <p>
                      <strong>
                        🚑 Assigned Team:
                      </strong>{" "}

                      <span className="badge bg-primary">
                        {item.assignedTo}
                      </span>
                    </p>
                  )}

                  {/* STATUS */}

                  <p>

                    <strong>Status:</strong>{" "}

                    <span
                      className={`badge ${
                        item.status === "Pending"
                          ? "bg-warning text-dark"
                          : item.status === "Accepted"
                          ? "bg-info"
                          : item.status === "Completed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>

                  </p>

                </div>

                {/* ================= */}
                {/* RIGHT SIDE */}
                {/* ================= */}

                <div className="col-md-5 text-center">

                  {item.image ? (

                    <img
                      src={getImageUrl(item.image)}
                      alt="Disaster"
                      className="img-fluid rounded shadow"
                      style={{
                        maxHeight: "260px",
                        width: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setSelectedImage(
                          getImageUrl(item.image)
                        )
                      }
                    />

                  ) : (

                    <div
                      className="border rounded d-flex align-items-center justify-content-center"
                      style={{
                        height: "260px",
                      }}
                    >
                      <h4>📷 No Image</h4>
                    </div>

                  )}

                  {/* TEAM ASSIGNMENT */}

                  <div className="mt-3">

                    <label className="form-label">
                      🚑 Assign Rescue Team
                    </label>

                    <select
                      className="form-select"
                      value={
                        selectedTeams[item._id] || ""
                      }
                      onChange={(e) =>
                        setSelectedTeams((prev) => ({
                          ...prev,
                          [item._id]:
                            e.target.value,
                        }))
                      }
                    >

                      <option value="">
                        Select Team
                      </option>

                      <option value="Team Alpha">
                        🚑 Team Alpha
                      </option>

                      <option value="Team Bravo">
                        🚑 Team Bravo
                      </option>

                      <option value="Team Charlie">
                        🚑 Team Charlie
                      </option>

                      <option value="Fire Team">
                        🚒 Fire Team
                      </option>

                      <option value="Medical Team">
                        🏥 Medical Team
                      </option>

                      <option value="Police Team">
                        🚓 Police Team
                      </option>

                    </select>

                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={() =>
                        assignTeam(item._id)
                      }
                    >
                      🚑 Assign Team
                    </button>

                  </div>

                </div>

              </div>

              <hr />

              {/* ================= */}
              {/* AI ANALYSIS */}
              {/* ================= */}

              {item.aiAnalysis && (

                <div
                  className="alert alert-secondary"
                  style={{
                    whiteSpace: "pre-line",
                    borderLeft:
                      "6px solid #0d6efd",
                  }}
                >

                  <h5>
                    🤖 AI Disaster Analysis
                  </h5>

                  {item.aiAnalysis}

                </div>

              )}

              {/* ================= */}
              {/* WEATHER */}
              {/* ================= */}

              {item.location && (

                <WeatherCard
                  latitude={
                    item.location.latitude
                  }
                  longitude={
                    item.location.longitude
                  }
                />

              )}

              {/* ================= */}
              {/* ACTION BUTTONS */}
              {/* ================= */}

              <div className="d-flex gap-2 mt-3 flex-wrap">

                <button
                  className="btn btn-success"
                  onClick={() =>
                    updateStatus(
                      item._id,
                      "Accepted"
                    )
                  }
                >
                  ✅ Accept
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    updateStatus(
                      item._id,
                      "Completed"
                    )
                  }
                >
                  ✔ Complete
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    updateStatus(
                      item._id,
                      "Rejected"
                    )
                  }
                >
                  ❌ Reject
                </button>

              </div>

            </div>

          </div>

        ))

      )}

      {/* ========================= */}
      {/* IMAGE MODAL */}
      {/* ========================= */}

      {selectedImage && (

        <div
          className="modal d-block"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.8)",
          }}
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "100vh",
            }}
          >

            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "12px",
                boxShadow: "0 0 20px white",
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;