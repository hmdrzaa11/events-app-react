import React, { useEffect } from "react";
import "./Notification.css";

export default function Notification({ message, status, onNotificationClose }) {
  useEffect(() => {
    let timerId = setTimeout(() => {
      onNotificationClose();
    }, 5000);
    return () => clearTimeout(timerId);
  }, [onNotificationClose]);
  return (
    <div className="Notification">
      <h2 className="Notification-status">{status}</h2>
      <p className="Notification-message">{message}</p>
    </div>
  );
}
