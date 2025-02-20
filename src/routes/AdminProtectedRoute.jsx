/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.stringify(localStorage.getItem("user"));
    if (!storedToken && storedUser.role !== "admin") {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        🔒 Authenticating...
      </div>
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
