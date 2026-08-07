import WeatherCard from "../components/WeatherCard";
import { useEffect, useState } from "react";
import LiveMap from "../components/maps/LiveMap";
import { io } from "socket.io-client";




const socket = io("http://localhost:5000");
function Dashboard() {
  const [requests, setRequests] = useState([]);
  



  
  const [selectedImage, setSelectedImage] = useState({});

  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [emergencyFilter, setEmergencyFilter] = useState("All");
const [selectedTeams, setSelectedTeams] = useState({});
  const fetchRequests = async () => {
    try {
      const res = await fetch("https://resqai-final.onrender.com/api/sos");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/sos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const assignTeam = async (id) => {
  const assignedTo = selectedTeams[id];

  if (!assignedTo) {
    alert("Please select a rescue team.");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/sos/${id}/assign`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedTo }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("🚑 Team Assigned Successfully!");
      fetchRequests();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
  }
};

    const data = await res.json();

    if (data.success) {
      alert("✅ Status Updated Successfully!");
      fetchRequests(); // Reload latest data
    }
  } catch (error) {
    console.error(error);
  }
};
const assignTeam = async (id) => {
  const assignedTo = selectedTeams[id];

  if (!assignedTo) {
    alert("Please select a rescue team.");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/sos/${id}/assign`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedTo }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("🚑 Team Assigned Successfully!");

      // Clear the selected dropdown for this SOS
      setSelectedTeams((prev) => ({
        ...prev,
        [id]: "",
      }));

      fetchRequests();
    } else {
      alert(data.message || "Assignment failed.");
    }
  } catch (error) {
    console.error(error);
    alert("Server error while assigning team.");
  }
};
 useEffect(() => {
  fetchRequests();

  socket.on("newSOS", (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);

    alert("🚨 New SOS Received!");
  });

  return () => {
    socket.off("newSOS");
  };
}, []);

  const filteredRequests = requests.filter((item) => {
  const matchesSearch =
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.includes(search);

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

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">
        🚨 ResQAI Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card text-center bg-primary text-white">
            <div className="card-body">
              <h2>{requests.length}</h2>
              <p>Total SOS</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center bg-warning">
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

        <div className="col-md-3">
          <div className="card text-center bg-info text-white">
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

        <div className="col-md-3">
          <div className="card text-center bg-success text-white">
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

      <div className="mb-4">
  <h3 className="mb-3">🗺️ Live Emergency Map</h3>

  <LiveMap requests={requests} />
</div>

      {/* SOS Cards */}

  {filteredRequests.map((item) => (
  <div className="card shadow-lg mb-4 border-0" key={item._id}>
    <div className="card-body">

      <div className="row">

        {/* LEFT SIDE */}

        <div className="col-md-7">

          <h3>👤 {item.name}</h3>

          <hr />

          <p><strong>📞 Phone:</strong> {item.phone}</p>

          <p><strong>🚨 Emergency:</strong> {item.emergency}</p>

          <p><strong>📝 Description:</strong> {item.description}</p>

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

          <p>
            <strong>Status:</strong>
            {item.assignedTo && (
  <p className="mt-2">
    <strong>🚑 Assigned Team:</strong>{" "}
    <span className="badge bg-primary">
      {item.assignedTo}
    </span>
  </p>
)}{" "}
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

        {/* RIGHT SIDE */}

        <div className="col-md-5 text-center">

          {item.image ? (
            <img
  src={`http://localhost:5000/uploads/${item.image}`}
  alt="Disaster"
  className="img-fluid rounded shadow"
  style={{
    maxHeight: "260px",
    objectFit: "cover",
    cursor: "pointer",
    transition: "0.3s",
  }}
  onClick={() =>
    setSelectedImage(
      `http://localhost:5000/uploads/${item.image}`
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
          <div className="mt-3">

  <label className="form-label">
    🚑 Assign Rescue Team
  </label>

  <select
  className="form-select"
  value={selectedTeams[item._id] || ""}
  onChange={(e) =>
    setSelectedTeams({
      ...selectedTeams,
      [item._id]: e.target.value,
    })
  }
>
    <option value="">Select Team</option>

<option value="Team Alpha">🚑 Team Alpha</option>
<option value="Team Bravo">🚑 Team Bravo</option>
<option value="Team Charlie">🚑 Team Charlie</option>
<option value="Fire Team">🚒 Fire Team</option>
<option value="Medical Team">🏥 Medical Team</option>
<option value="Police Team">🚓 Police Team</option>

  </select>

<button
  className="btn btn-primary mt-2 w-100"
  onClick={() => assignTeam(item._id)}
>
  🚑 Assign Team
</button>
</div>

        </div>

      </div>

      <hr />

      {item.aiAnalysis && (

        
        <div
          className="alert alert-secondary"
          style={{
            whiteSpace: "pre-line",
            borderLeft: "6px solid #0d6efd",
          }}
        >
          <h5>🤖 AI Disaster Analysis</h5>

          {item.aiAnalysis}
        </div>

        
      )}
 
      {item.location && (
  <WeatherCard
    latitude={item.location.latitude}
    longitude={item.location.longitude}
  />
)}

      <div className="d-flex gap-2">

        <button
          className="btn btn-success"
          onClick={() => updateStatus(item._id, "Accepted")}
        >
          ✅ Accept
        </button>

        <button
          className="btn btn-warning"
          onClick={() => updateStatus(item._id, "Completed")}
        >
          ✔ Complete
        </button>

        <button
          className="btn btn-danger"
          onClick={() => updateStatus(item._id, "Rejected")}
        >
          ❌ Reject
        </button>

      </div>

    </div>
  </div>
))}
{selectedImage && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0,0,0,0.8)",
    }}
    onClick={() => setSelectedImage(null)}
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