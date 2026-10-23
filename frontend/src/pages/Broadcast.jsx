import { useState } from "react";
import socket from "../services/socket";

function Broadcast() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendAlert = () => {
    if (!title || !message) {
      alert("Fill all fields");
      return;
    }

    socket.emit("broadcast-alert", {
      title,
      message,
    });

    alert("Alert Sent!");

    setTitle("");
    setMessage("");
  };

  return (
    <div className="container mt-5">
      <h2>Emergency Broadcast</h2>

      <input
        className="form-control mb-3"
        placeholder="Alert Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Alert Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="btn btn-danger"
        onClick={sendAlert}
      >
        Send Alert
      </button>
    </div>
  );
}

export default Broadcast;