import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Container,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

const AddCourse = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const [formData, setFormData] = useState({
  
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("form data from course", formData);
    // if (!token) {
    //   setError("Token is missing.");
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const res = await axios.post(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/todo/add`,
    //     formData,
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   // alert(res.data.message);
    //   toast.success(res.data.message);
    //   navigate("/admin-dashboard");
    // } catch (error) {
    //   setError(error?.response?.data?.message || "Failed to add todo.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              Add New Course
            </Typography>
            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
          </Box>

          <CardContent>
            <form
              onSubmit={handleAdd}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                fullWidth
              />
              <TextField
                label="Poster Url"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                required
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Mode</InputLabel>
                <Select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="offline">Offline</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="introductory">Introductory</MenuItem>
                  <MenuItem value="fundamentals">Fundamentals</MenuItem>
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="hindi">Hindi</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="bengali">Bengali</MenuItem>
                  <MenuItem value="telugu">Telugu</MenuItem>

                  <MenuItem value="tamil">Tamil</MenuItem>
                  <MenuItem value="urdu">Urdu</MenuItem>

                  <MenuItem value="kannada">Kannada</MenuItem>

                  <MenuItem value="sanskrit">Sanskrit</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ padding: "12px" }}
              >
                {loading ? "Adding..." : "Add Course"}
              </Button>
            </form>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddCourse;
