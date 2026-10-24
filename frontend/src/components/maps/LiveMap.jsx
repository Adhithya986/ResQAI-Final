import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LiveMap({ requests }) {
  console.log(requests);
  return (
    <MapContainer
      center={[17.3850, 78.4867]} // Hyderabad
      zoom={11}
      scrollWheelZoom={false}
      style={{
        height: "clamp(300px, 45vh, 480px)",
        width: "100%",
        borderRadius: "12px",
        zIndex: 1,
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
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
              <div style={{ minWidth: "170px", fontSize: "0.88rem" }}>
                <h5 style={{ margin: "0 0 6px", color: "#dc2626", fontWeight: 700 }}>
                  🚨 {item.emergency}
                </h5>
                <p style={{ margin: "3px 0" }}><strong>Name:</strong> {item.name}</p>
                <p style={{ margin: "3px 0" }}>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${item.phone}`} style={{ color: "#2563eb", fontWeight: 600 }}>
                    📞 {item.phone}
                  </a>
                </p>
                <p style={{ margin: "3px 0" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      background: item.status === "Completed" ? "#dcfce7" : "#fef3c7",
                      color: item.status === "Completed" ? "#166534" : "#92400e",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    {item.status}
                  </span>
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${item.location.latitude},${item.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    background: "#2563eb",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    width: "100%",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  🗺️ Navigate in Maps
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default LiveMap;