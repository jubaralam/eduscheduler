import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 12px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "10px 15px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default InstructorDashboard;
