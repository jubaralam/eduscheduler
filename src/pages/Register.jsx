/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    role: "",
    gender: "",
    city: "",
    highest_qualification: "",
    preferred_language: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(formData, import.meta.env.VITE_BACKEND_URL);
    try {
      //   const res = await axios.post(
      //     `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
      //     { formData },
      //     {
      //       headers: {
      //         "Content-Type": "Application/json",
      //       },
      //     }
      //   );

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Add Instructor
            </Typography>

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
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />

              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="phone_no"
                variant="outlined"
                type="Number"
                fullWidth
                required
                value={formData.phone_no}
                name="phone_no"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="role"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={formData.role}
                name="role"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="gender"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={formData.gender}
                name="gender"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="city"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={formData.city}
                name="city"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="highest_qualification"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={formData.highest_qualification}
                name="highest_qualification"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                label="preferred_language"
                variant="outlined"
                type="text"
                fullWidth
                required
                value={formData.preferred_language}
                name="preferred_language"
                onChange={(e) => handleChange(e)}
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />

              {error && <Typography color="error">{error}</Typography>}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1,
                  borderRadius: 3,
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Box>

            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ width: "100%", mt: 2, py: 1, borderRadius: 3 }}
            >
              Have an account? Click here to log in.
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
