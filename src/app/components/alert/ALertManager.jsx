import { useState, useEffect } from "react";

const ALertManager = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "success", message: "Profile updated Successfully" },
    { id: 2, type: "error", message: "Failed to save changes" },
    { id: 3, type: "info", message: "New update available" },
    { id: 4, type: "warning", message: "Don't do it next time" },
  ]);

  const removeAlert = (id) =>{
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }
  const colors = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div className="space-y-3 w-80">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`border-l-4 p-4 rounded-md shadow-md flex justify-between items-center ${colors[alert.type]}`}
        >
          <span>{alert.message}</span>
          <button
            onClick={() => removeAlert(alert.id)}
            className="ml-3 font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ALertManager;
