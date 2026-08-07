import "./EmergencyAlert.css";

function EmergencyAlert({ alert, onClose }) {
  if (!alert) return null;

  return (
    <div className="emergency-alert">
      <div className="alert-box">

        <h2>🚨 {alert.title}</h2>

        <p>{alert.message}</p>

        <button
          className="btn btn-light mt-3"
          onClick={onClose}
        >
          Dismiss
        </button>

      </div>
    </div>
  );
}

export default EmergencyAlert;