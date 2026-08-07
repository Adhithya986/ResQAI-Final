import { useState, useRef } from "react";
import "./Sos.css";

const API_URL = "https://resqai-final.onrender.com";

function Sos() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergency, setEmergency] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [sending, setSending] = useState(false);

  const recognitionRef = useRef(null);

  // =========================
  // GET LOCATION
  // =========================
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("❌ Geolocation is not supported.");
      return;
    }

    setStatus("📍 Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(newLocation);

        setStatus("📍 Location Retrieved Successfully!");
      },
      (error) => {
        console.error("Location Error:", error);

        setStatus(
          "❌ Unable to get location. Please allow location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =========================
  // VOICE SOS
  // =========================
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
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
      const transcript =
        event.results[0][0].transcript;

      setDescription(transcript);

      setStatus("🎤 Voice description captured!");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech Recognition Error:",
        event.error
      );

      setIsListening(false);

      setStatus("❌ Voice recognition failed.");
    };
  };

  // =========================
  // SEND SOS
  // =========================
  const sendSOS = async () => {
    if (!name || !phone || !emergency) {
      alert(
        "⚠️ Please fill Name, Phone Number and Emergency."
      );
      return;
    }

    if (sending) return;

    setSending(true);
    setStatus("🚨 Sending SOS...");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("emergency", emergency);
    formData.append("description", description);

    if (location) {
      formData.append(
        "location",
        JSON.stringify(location)
      );
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${API_URL}/api/sos`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server Error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("SOS Response:", data);

      if (data.success) {
        alert(
          "🚨 SOS SENT SUCCESSFULLY!\n\nRescue teams have been notified."
        );

        // Reset form
        setName("");
        setPhone("");
        setEmergency("");
        setDescription("");
        setLocation(null);
        setImage(null);
        setStatus("✅ SOS Sent Successfully!");
      } else {
        alert(
          data.message ||
            "❌ Unable to send SOS."
        );

        setStatus(
          data.message ||
            "❌ Unable to send SOS."
        );
      }
    } catch (error) {
      console.error(
        "❌ SOS Error:",
        error
      );

      alert(
        "❌ Unable to connect to ResQAI server."
      );

      setStatus(
        "❌ Server connection failed."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sos-container">

      <h2>🚨 Emergency SOS</h2>

      {/* NAME */}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      {/* PHONE */}

      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      {/* EMERGENCY */}

      <select
        value={emergency}
        onChange={(e) =>
          setEmergency(e.target.value)
        }
      >
        <option value="">
          Select Emergency
        </option>

        <option value="Flood">
          Flood
        </option>

        <option value="Fire">
          Fire
        </option>

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

      {/* DESCRIPTION */}

      <textarea
        rows="5"
        placeholder="Describe your emergency..."
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      {/* VOICE */}

      <div
        style={{
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          type="button"
          onClick={startListening}
          disabled={isListening}
          className={
            isListening
              ? "location-btn"
              : "sos-button"
          }
        >
          {isListening
            ? "🎙 Listening..."
            : "🎤 Voice SOS"}
        </button>
      </div>

      {/* IMAGE */}

      <h4>
        📷 Upload Disaster Image
      </h4>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files[0])
        }
      />

      {/* IMAGE PREVIEW */}

      {image && (
        <div
          style={{
            marginTop: "15px",
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Disaster Preview"
            width="300"
            style={{
              borderRadius: "10px",
              border: "2px solid #ddd",
              maxWidth: "100%",
            }}
          />
        </div>
      )}

      <br />

      {/* LOCATION */}

      <button
        type="button"
        className="location-btn"
        onClick={getLocation}
      >
        📍 Get My Location
      </button>

      {location && (
        <div className="mt-3">

          <p>
            <strong>
              Latitude:
            </strong>{" "}
            {location.latitude}
          </p>

          <p>
            <strong>
              Longitude:
            </strong>{" "}
            {location.longitude}
          </p>

        </div>
      )}

      {/* SEND SOS */}

      <button
        type="button"
        className="sos-button"
        onClick={sendSOS}
        disabled={sending}
      >
        {sending
          ? "⏳ SENDING SOS..."
          : "🚨 SEND SOS"}
      </button>

      {/* STATUS */}

      {status && (
        <h3>{status}</h3>
      )}

    </div>
  );
}

export default Sos;