// File: frontend/src/components/Notification.jsx
import './Notification.css';

function Notification({ message }) {
  if (!message) return null;
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
