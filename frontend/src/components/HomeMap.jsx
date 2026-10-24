import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import socket from "../services/socket";
import { getApiUrl } from "../services/api";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function HomeMap() {
  const [requests, setRequests] = useState([]);

 useEffect(() => {
  fetchSOS();

  socket.on("newSOS", () => {
    console.log("🚨 New SOS received");
    fetchSOS();
  });

  socket.on("sosAssigned", () => {
    console.log("🚑 SOS Assigned");
    fetchSOS();
  });

  return () => {
    socket.off("newSOS");
    socket.off("sosAssigned");
  };
}, []);

  const fetchSOS = async () => {
    try {
      const res = await fetch(getApiUrl("/api/sos"));
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) {
        setRequests(data);
      }
    } catch (err) {
      console.error("HomeMap fetch error:", err);
    }
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">

        <h3 className="text-primary">
          🛰 Live Disaster Map
        </h3>

        <MapContainer
          center={[17.385, 78.4867]}
          zoom={7}
          scrollWheelZoom={false}
          style={{
            height: "clamp(300px, 48vh, 480px)",
            width: "100%",
            borderRadius: "12px",
            zIndex: 1,
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {requests.map((item) => {
            if (!item.location) return null;

            return (
              <Marker
                key={item._id}
                position={[
                  item.location.latitude,
                  item.location.longitude,
                ]}
              >
                <Popup>
                  <div style={{ minWidth: "180px", maxWidth: "240px", fontSize: "0.9rem" }}>
                    <h5 style={{ margin: "0 0 6px", color: "#dc2626", fontWeight: 700 }}>
                      🚨 {item.emergency}
                    </h5>
                    <p style={{ margin: "4px 0" }}><b>Name:</b> {item.name}</p>
                    <p style={{ margin: "4px 0" }}>
                      <b>Phone:</b>{" "}
                      <a href={`tel:${item.phone}`} style={{ color: "#2563eb", fontWeight: 600 }}>
                        📞 {item.phone}
                      </a>
                    </p>
                    <p style={{ margin: "4px 0" }}>
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          background: item.status === "Rescued" ? "#dcfce7" : "#fee2e2",
                          color: item.status === "Rescued" ? "#166534" : "#991b1b",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.status}
                      </span>
                    </p>
                    {item.description && (
                      <p style={{ margin: "6px 0", fontSize: "0.82rem", color: "#475569" }}>
                        {item.description}
                      </p>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${item.location.latitude},${item.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        background: "#2563eb",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        width: "100%",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      🗺️ Open in Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

      </div>
    </div>
  );
}

export default HomeMap;