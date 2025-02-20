import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        height: "100vh", // Full viewport height
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
