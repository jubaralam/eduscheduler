import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, Container } from "@mui/material";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { addCourses, removeUser } from "../stateManagement/userSlice";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch user details & token
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const courses = useSelector((state) => state.courses);
  console.log("redux user data", user);
  console.log("redux token ", token);
  console.log("redux courses ", courses);

  // Fetch todos after token is available
  const getCourses = async () => {
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

      dispatch(addCourses({ courses: res.data.data }));
      setLoading(false);
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

  useEffect(() => {
    getCourses();
  }, []);

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
    dispatch(removeUser());
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
            {courses.length > 0 ? (
              courses.map((todo) => <CourseCard key={todo._id} {...todo} />)
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
