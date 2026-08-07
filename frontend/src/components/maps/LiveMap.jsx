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
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
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
              <h5>{item.name}</h5>

              <p>
                <strong>Emergency:</strong> {item.emergency}
              </p>

              <p>
                <strong>Status:</strong> {item.status}
              </p>

              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default LiveMap;