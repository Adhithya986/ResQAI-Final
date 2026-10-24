import { useState, useRef, useEffect } from "react";
import "./Sos.css";
import { getApiUrl } from "../services/api";

const EMERGENCY_TYPES = [
  { id: "Flood", label: "Flood", icon: "🌊" },
  { id: "Fire", label: "Fire Outbreak", icon: "🔥" },
  { id: "Earthquake", label: "Earthquake", icon: "🌍" },
  { id: "Accident", label: "Accident", icon: "🚗" },
  { id: "Medical Emergency", label: "Medical Crisis", icon: "🏥" },
  { id: "Cyclone / Storm", label: "Severe Storm", icon: "🌪️" },
];

function Sos() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergency, setEmergency] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const recognitionRef = useRef(null);

  // Auto-fill from localStorage if user is signed in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name && !name) setName(u.name);
        if (u.phone && !phone) setPhone(u.phone);
      }
    } catch {
      // Ignore parse errors
    }
    // Auto-fetch GPS location on load
    getLocation();
  }, []);

  const triggerHaptic = (pattern = 30) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Safe fallback
      }
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your mobile browser.");
      return;
    }

    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracy: Math.round(position.coords.accuracy || 0),
        });
        setLocLoading(false);
        setStatus("📍 Accurate GPS location locked.");
        triggerHaptic(20);
      },
      (error) => {
        setLocLoading(false);
        setStatus("⚠️ GPS access denied: " + error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleChipSelect = (typeId) => {
    setEmergency(typeId);
    triggerHaptic(30);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      triggerHaptic(25);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognitionRef.current = recognition;
    setIsListening(true);
    triggerHaptic(50);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev ? prev + " " + transcript : transcript));
      triggerHaptic([30, 30]);
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
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      alert("Please enter your contact phone number.");
      return;
    }
    if (!emergency) {
      alert("Please select the type of emergency.");
      return;
    }

    setSubmitting(true);
    triggerHaptic([100, 50, 100]);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());
    formData.append("emergency", emergency);
    formData.append("description", description.trim());

    if (location) {
      formData.append("location", JSON.stringify(location));
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(getApiUrl("/api/sos"), {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSubmitting(false);

      if (response.ok) {
        triggerHaptic([150, 100, 200]);
        alert("🚨 SOS ALERT BROADCASTED!\n\nRescue teams within your vicinity have been alerted with your coordinates.");
        // Reset form except contact info
        setEmergency("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
        setStatus("✅ SOS broadcasted successfully to Rescue Command.");
      } else {
        alert(data.message || "Failed to submit SOS.");
        setStatus("❌ Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert("❌ Unable to connect to backend server. Try calling local emergency helplines below.");
      setStatus("❌ Connection failed. Please use direct emergency calling.");
    }
  };

  return (
    <div className="sos-page-wrapper">
      <div className="sos-card">
        {/* Header */}
        <div className="sos-header">
          <h1>🚨 Emergency SOS</h1>
          <p>Instant beacon broadcast to nearby rescue units</p>
        </div>

        {/* GPS Location Status Pill */}
        <div
          className={`gps-banner ${
            locLoading ? "loading" : location ? "" : "error"
          }`}
        >
          <div className="gps-info">
            <span style={{ fontSize: "1.2rem" }}>
              {locLoading ? "📡" : location ? "📍" : "⚠️"}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                {locLoading
                  ? "Locating your GPS..."
                  : location
                  ? `GPS Locked (±${location.accuracy}m)`
                  : "GPS Location Needed"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                {location
                  ? `${location.latitude}, ${location.longitude}`
                  : "Tap refresh to pinpoint emergency location"}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={getLocation}
            style={{
              background: "white",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {locLoading ? "Locating..." : "🔄 Refresh"}
          </button>
        </div>

        {/* Quick Emergency Type Selection (1-tap Mobile Chips) */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: 700, fontSize: "0.88rem", color: "#334155", marginBottom: "8px" }}>
            Select Emergency Type *
          </label>
          <div className="emergency-grid">
            {EMERGENCY_TYPES.map((t) => (
              <button
                type="button"
                key={t.id}
                className={`emergency-chip ${emergency === t.id ? "selected" : ""}`}
                onClick={() => handleChipSelect(t.id)}
              >
                <span className="icon">{t.icon}</span>
                <span className="label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="sos-input-group">
          <label htmlFor="sos-name">Full Name *</label>
          <input
            id="sos-name"
            className="sos-input"
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="sos-input-group">
          <label htmlFor="sos-phone">Phone Number (to reach you) *</label>
          <input
            id="sos-phone"
            className="sos-input"
            type="tel"
            inputMode="tel"
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Emergency Description & Voice SOS */}
        <div className="sos-input-group">
          <label htmlFor="sos-desc">Situation Details / Landmark (Optional)</label>
          <textarea
            id="sos-desc"
            className="sos-input"
            rows="3"
            placeholder="e.g. Water level rising to 1st floor, 3 people stranded..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="button"
            className={`voice-btn ${isListening ? "listening" : ""}`}
            onClick={startListening}
          >
            <span>{isListening ? "🔴" : "🎤"}</span>
            <span>{isListening ? "Listening... Speak now" : "Speak Situation (Voice SOS)"}</span>
          </button>
        </div>

        {/* Camera / Photo Upload */}
        <div className="sos-input-group">
          <label>Snap / Upload Scene Photo (Optional)</label>
          {!imagePreview ? (
            <label className="camera-upload-box">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
              />
              <div style={{ fontSize: "2rem", marginBottom: "4px" }}>📸</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1e293b" }}>
                Tap to open camera or gallery
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Helps rescue teams assess the situation
              </div>
            </label>
          ) : (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={imagePreview}
                alt="Emergency Scene"
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "2px solid #3b82f6",
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Send SOS Trigger */}
        <button
          type="button"
          className="sos-submit-btn"
          onClick={sendSOS}
          disabled={submitting}
        >
          <span>{submitting ? "⏳" : "🚨"}</span>
          <span>{submitting ? "BROADCASTING SOS..." : "BROADCAST EMERGENCY SOS"}</span>
        </button>

        {status && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              textAlign: "center",
              background: status.includes("✅") ? "#f0fdf4" : status.includes("📍") ? "#eff6ff" : "#fef2f2",
              color: status.includes("✅") ? "#166534" : status.includes("📍") ? "#1e40af" : "#991b1b",
              border: "1px solid currentColor",
            }}
          >
            {status}
          </div>
        )}

        {/* 1-Tap Emergency Helplines for Instant Dialing */}
        <div className="emergency-helplines">
          <a href="tel:112" className="helpline-chip">
            <span>National Help</span>
            <span className="number">📞 112</span>
          </a>
          <a href="tel:108" className="helpline-chip">
            <span>Ambulance</span>
            <span className="number">🚑 108</span>
          </a>
          <a href="tel:101" className="helpline-chip">
            <span>Fire Brigade</span>
            <span className="number">🚒 101</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sos;