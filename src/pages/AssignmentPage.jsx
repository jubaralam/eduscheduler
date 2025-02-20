import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toast";
const AssignmentPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lecture/assign`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${course.token}`,
          },
        }
      );

      navigate("/admin-dashboard");
      toast.success(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const findInstructor = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${course.token}`,
          },
        }
      );
      console.log(res.data.data);
      setInstructor(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    }
  };

  useEffect(() => {
    const storedCourse = JSON.parse(localStorage.getItem("course")); // Fix: Use JSON.parse()
    if (storedCourse) {
      setCourse(storedCourse); // Fix: Properly set state
      console.log(storedCourse);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (course) {
      findInstructor();
      console.log("get called for users")
    }
  }, [id, course]);
  // setPayload({});

  return (
    <div>
      <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
        <Card elevation={6} sx={{ borderRadius: 4, bgcolor: "#f5f7fa" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              {" "}
              <Typography variant="h5" sx={{ mb: 2 }}>
                Assignment Page
              </Typography>
              <Box>
                {loading ? (
                  <LoadingSpinner />
                ) : course ? (
                  <CourseCard {...course} />
                ) : (
                  <p>No course data found.</p>
                )}
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Assign to"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? "Assigning..." : "Assign"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AssignmentPage;
