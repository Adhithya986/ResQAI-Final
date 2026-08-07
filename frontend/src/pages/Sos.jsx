import { useState, useRef } from "react";
import "./Sos.css";
function Sos() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergency, setEmergency] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [isListening, setIsListening] = useState(false);

const recognitionRef = useRef(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });



        setStatus("📍 Location Retrieved Successfully");
      },
      (error) => {
        setStatus(error.message);
      }
    );
  };

  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognitionRef.current = recognition;

  setIsListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setDescription(transcript);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error(event.error);
    setIsListening(false);
  };
};

  const sendSOS = async () => {
    if (!name || !phone || !emergency) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("emergency", emergency);
    formData.append("description", description);

    if (location) {
      formData.append("location", JSON.stringify(location));
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      alert(data.message);

      console.log(data);

      // Reset form
      setName("");
      setPhone("");
      setEmergency("");
      setDescription("");
      setLocation(null);
      setImage(null);
      setStatus("");

    } catch (error) {
      console.error(error);
      alert("❌ Unable to connect to backend.");
    }
  };

  return (
    <div className="sos-container">

      <h2>🚨 Emergency SOS</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        value={emergency}
        onChange={(e) => setEmergency(e.target.value)}
      >
        <option value="">Select Emergency</option>
        <option>Flood</option>
        <option>Fire</option>
        <option>Earthquake</option>
        <option>Accident</option>
        <option>Medical Emergency</option>
      </select>

      <textarea
        rows="5"
        placeholder="Describe your emergency..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
<div style={{ marginTop: "10px", marginBottom: "20px" }}>
  <button
    type="button"
    onClick={startListening}
    className={isListening ? "location-btn" : "sos-button"}
  >
    {isListening ? "🎙 Listening..." : "🎤 Voice SOS"}
  </button>
</div>
      <h4>📷 Upload Disaster Image</h4>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <div style={{ marginTop: "15px" }}>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            width="300"
            style={{
              borderRadius: "10px",
              border: "2px solid #ddd",
            }}
          />
        </div>
      )}

      <br />

      <button
        className="location-btn"
        onClick={getLocation}
      >
        📍 Get My Location
      </button>

      {location && (
        <>
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
        </>
      )}

      <button
        className="sos-button"
        onClick={sendSOS}
      >
        🚨 SEND SOS
      </button>

      <h3>{status}</h3>

    </div>
  );
}

export default Sos;