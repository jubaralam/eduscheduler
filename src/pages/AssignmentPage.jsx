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
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { toast } from "react-toast";
import { useDispatch, useSelector } from "react-redux";
import { addInstructors } from "../stateManagement/userSlice";
// import { toast } from "react-toastify";
const AssignmentPage = () => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors);
  const course = useSelector((state) => state.assignCourse);
  const token = useSelector((state) => state.token);
  const { id } = useParams();

  const [error, setError] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInstructor) {
      setError("Please select an instructor.");
      return;
    }

    setLoading(true);

    const payload = {
      instructorId: selectedInstructor._id,
      courseId: id,
      start_time: startTime,
      end_time: endTime,
      topic: course[0].title,
    };
    console.log("payload", payload);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lecture/assign`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "course has assigned");
      navigate("/admin-dashboard");
      toast.success(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to assign. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const findInstructor = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addInstructors({ instructors: res.data.data }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch instructors. Please try again."
      );
    }
  };

  useEffect(() => {
    findInstructor();
  }, []);

  return (
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
            <Typography variant="h5" sx={{ mb: 2 }}>
              Assignment Page
            </Typography>
            <Box>
              {loading ? (
                <LoadingSpinner />
              ) : course ? (
                <CourseCard {...course[0]} />
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
              {/* Searchable Instructor Dropdown */}
              <Autocomplete
                options={instructors || []}
                getOptionLabel={(option) => option.name}
                value={selectedInstructor}
                onChange={(event, newValue) => setSelectedInstructor(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assign to"
                    variant="outlined"
                    required
                  />
                )}
              />

              {/* Start Time Input */}
              <TextField
                label="Start Time"
                type="datetime-local"
                fullWidth
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              {/* End Time Input */}
              <TextField
                label="End Time"
                type="datetime-local"
                fullWidth
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
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
  );
};

export default AssignmentPage;
