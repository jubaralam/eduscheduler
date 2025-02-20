import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CardContent,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role == "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/instructor-dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            {" "}
            <Typography variant="h5" sx={{ mb: 2 }}>
              Have an account? log in.
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
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />

              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
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
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{ width: "100%", mt: 2, py: 1, borderRadius: 3 }}
            >
              Don&#39;t have an account? Sign up now!
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
