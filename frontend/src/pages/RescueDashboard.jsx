import { useEffect, useState, useCallback } from "react";
import WeatherCard from "../components/WeatherCard";
import socket from "../services/socket";
import { getApiUrl, getUploadUrl } from "../services/api";

function RescueDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safe user parse
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) user = JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
  }

  const team = user?.team || "";

  // Fetch Assigned SOS Requests
  const fetchRequests = useCallback(async () => {
    if (!team) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        getApiUrl(`/api/sos/team/${encodeURIComponent(team)}`)
      );

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("RescueDashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [team]);

  useEffect(() => {
    fetchRequests();

    socket.on("sosAssigned", (data) => {
      if (data?.assignedTo === team) {
        fetchRequests();
      }
    });

    socket.on("sosUpdated", () => {
      fetchRequests();
    });

    return () => {
      socket.off("sosAssigned");
      socket.off("sosUpdated");
    };
  }, [fetchRequests, team]);

  // Complete Rescue
  const completeRescue = async (id) => {
    try {
      const response = await fetch(getApiUrl(`/api/sos/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Rescue Mission Completed!");
        fetchRequests();
      } else {
        alert(data.message || "❌ Unable to update status");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Network error completing rescue");
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center shadow-sm">
          <h4>🔒 Authentication Required</h4>
          <p className="mb-0">Please login as a rescue personnel to view assigned missions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 pb-5">
      <h1 className="text-center mb-2">🚑 Rescue Team Dashboard</h1>

      <h4 className="text-center text-primary mb-4">
        Assigned Unit: <span className="badge bg-primary fs-5">{team || "Unassigned"}</span>
      </h4>

      {!team && (
        <div className="alert alert-warning text-center">
          ⚠️ Your account is registered as Rescue, but has no assigned team name. Please ask an Admin or update your profile.
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading assigned emergency missions...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          ✅ No active rescue requests assigned to <strong>{team}</strong> right now. Standby for dispatch.
        </div>
      ) : (
        requests.map((item) => (
          <div className="card shadow-lg mb-4 border-0" key={item._id}>
            <div className="card-body">
              <div className="row">
                {/* LEFT SIDE */}
                <div className="col-md-7">
                  <h3 className="text-danger">🚨 {item.emergency}</h3>
                  <hr />

                  <p>
                    <strong>👤 Victim Name:</strong> {item.name}
                  </p>

                  <p>
                    <strong>📞 Phone:</strong>{" "}
                    <a href={`tel:${item.phone}`} className="text-decoration-none">
                      {item.phone}
                    </a>
                  </p>

                  <p>
                    <strong>🚑 Assigned Team:</strong>
                    <span className="badge bg-primary ms-2">{item.assignedTo}</span>
                  </p>

                  <p>
                    <strong>📝 Description:</strong> {item.description || "No description provided."}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`badge ms-2 ${
                        item.status === "Completed"
                          ? "bg-success"
                          : item.status === "Accepted"
                          ? "bg-info"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {item.status}
                    </span>
                  </p>

                  <p>
                    <strong>📍 Coordinates:</strong>{" "}
                    {item.location?.latitude && item.location?.longitude
                      ? `${item.location.latitude.toFixed(5)}, ${item.location.longitude.toFixed(5)}`
                      : "Not Available"}
                  </p>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-5 text-center">
                  {item.image ? (
                    <img
                      src={getUploadUrl(item.image)}
                      alt="Disaster Scene"
                      className="img-fluid rounded shadow"
                      style={{
                        width: "100%",
                        maxHeight: "280px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="border rounded d-flex align-items-center justify-content-center bg-light"
                      style={{ height: "240px" }}
                    >
                      <h5 className="text-muted">📷 No Image Uploaded</h5>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Analysis */}
              {item.aiAnalysis && (
                <>
                  <hr />
                  <div
                    className="alert alert-secondary mt-3"
                    style={{
                      whiteSpace: "pre-line",
                      borderLeft: "6px solid #0d6efd",
                    }}
                  >
                    <h5>🤖 AI Disaster Analysis</h5>
                    {item.aiAnalysis}
                  </div>
                </>
              )}

              {/* Live Weather */}
              {item.location?.latitude && item.location?.longitude && (
                <WeatherCard
                  latitude={item.location.latitude}
                  longitude={item.location.longitude}
                />
              )}

              <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                {item.phone && (
                  <a
                    href={`tel:${item.phone}`}
                    className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-1"
                    style={{ minHeight: "48px", fontWeight: 700 }}
                  >
                    📞 Call Victim ({item.phone})
                  </a>
                )}

                {item.location?.latitude && item.location?.longitude ? (
                  <button
                    className="btn btn-primary d-flex align-items-center justify-content-center gap-1"
                    style={{ minHeight: "48px", fontWeight: 700 }}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${item.location.latitude},${item.location.longitude}`,
                        "_blank"
                      )
                    }
                  >
                    🗺️ Navigate in Maps
                  </button>
                ) : (
                  <button className="btn btn-secondary" disabled style={{ minHeight: "48px" }}>
                    📍 No GPS Location
                  </button>
                )}

                {item.status !== "Completed" && (
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center gap-1"
                    style={{ minHeight: "48px", fontWeight: 700 }}
                    onClick={() => completeRescue(item._id)}
                  >
                    ✔ Mark Mission Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RescueDashboard;