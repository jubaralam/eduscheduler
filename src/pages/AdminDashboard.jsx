import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, Container } from "@mui/material";
import CourseCard from "./CourseCard";

const AdminDashboard = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Fetch user details & token
  const getUserDetails = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(storedUser);
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.log(error.message);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos after token is available
  const getTodos = async () => {
    setLoading(true);
    if (!token) {
      setError("Token Not Found");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/course`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(res.data.data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch todos"
      );
    } finally {
      setLoading(false);
    }
  };

  // Run only once to get user details
  useEffect(() => {
    getUserDetails();
  }, []);

  // Run when token becomes available
  useEffect(() => {
    if (token) getTodos();
  }, [token]);

  useEffect(() => {
    if (deleteId) {
      const filteredData = todos.filter((todo) => todo._id !== deleteId);
      setTodos(filteredData);
    }
  }, [deleteId]);

  // Loading state
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleAdd = () => {
    navigate("/admin-dashboard/instructor-register");
  };

  // Display UI
  return (
    <Container component="main" maxWidth="" sx={{ mt: 6 }}>
      <Card elevation={6} sx={{ borderRadius: 4, bgcolor: "#f5f7fa" }}>
        <div className="dashboard-container">
          <div className="flex justify-between items-center">
            <h2>Dashboard, Welcome {user?.name}</h2>
            <Box>
              <button
                onClick={handleAdd}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin: "10px 15px",
                }}
              >
                Add Instructor
              </button>
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
            </Box>
          </div>
          {error && (
            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          )}

          <div className="card-container flex flex-wrap justify-center">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <CourseCard
                  key={todo._id}
                  {...todo}
                  token={token}
                  setDeleteId={setDeleteId}
                />
              ))
            ) : (
              <p>No todos available.</p>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
