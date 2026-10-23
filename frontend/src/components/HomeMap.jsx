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
          style={{
            height: "500px",
            width: "100%",
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

                  <h5>🚨 {item.emergency}</h5>

                  <p><b>Name:</b> {item.name}</p>

                  <p><b>Phone:</b> {item.phone}</p>

                  <p><b>Status:</b> {item.status}</p>

                  <p><b>Assigned:</b> {item.assignedTo || "Not Assigned"}</p>

                  <p>{item.description}</p>

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