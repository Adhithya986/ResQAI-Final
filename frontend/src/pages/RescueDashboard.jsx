import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";


function RescueDashboard() {
  const [requests, setRequests] = useState([]);

  // Logged-in User
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          Please login first.
        </div>
      </div>
    );
  }

  const TEAM = user.team;

  // Fetch Assigned SOS Requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/sos/team/${encodeURIComponent(TEAM)}`
      );

      const data = await res.json();

      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Complete Rescue
  const completeRescue = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/sos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Completed",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Rescue Mission Completed!");
        fetchRequests();
      } else {
        alert("❌ Unable to update status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-2">
        🚑 Rescue Team Dashboard
      </h1>

      <h4 className="text-center text-primary mb-4">
        {TEAM}
      </h4>

      {requests.length === 0 ? (
        <div className="alert alert-warning text-center">
          No Rescue Requests Assigned
        </div>
      ) : (
        requests.map((item) => (
          <div className="card shadow-lg mb-4 border-0" key={item._id}>
            <div className="card-body">

              <div className="row">

                {/* LEFT SIDE */}
                <div className="col-md-7">

                  <h3 className="text-danger">
                    🚨 {item.emergency}
                  </h3>

                  <hr />

                  <p>
                    <strong>👤 Name:</strong> {item.name}
                  </p>

                  <p>
                    <strong>📞 Phone:</strong> {item.phone}
                  </p>

                  <p>
                    <strong>🚑 Assigned Team:</strong>
                    <span className="badge bg-primary ms-2">
                      {item.assignedTo}
                    </span>
                  </p>

                  <p>
                    <strong>📝 Description:</strong> {item.description}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    <span className="badge bg-info ms-2">
                      {item.status}
                    </span>
                  </p>

                  <p>
                    <strong>📍 Latitude:</strong>{" "}
                    {item.location?.latitude || "Not Available"}
                  </p>

                  <p>
                    <strong>📍 Longitude:</strong>{" "}
                    {item.location?.longitude || "Not Available"}
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
                        width: "100%",
                        maxHeight: "280px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="border rounded d-flex align-items-center justify-content-center"
                      style={{
                        height: "280px",
                      }}
                    >
                      <h5>📷 No Image</h5>
                    </div>
                  )}

                </div>

              </div>

              <hr />

              {/* AI Analysis */}
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

              {/* Weather */}
              {item.location && (
                <WeatherCard
                  latitude={item.location.latitude}
                  longitude={item.location.longitude}
                />
              )}

              <div className="d-flex gap-2 mt-3">

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`,
                      "_blank"
                    )
                  }
                >
                  🗺️ Open Location
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => completeRescue(item._id)}
                >
                  ✔ Complete Rescue
                </button>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
export default RescueDashboard;