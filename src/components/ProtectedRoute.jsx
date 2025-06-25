import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import AnimatedBookIcon from "./AnimatedBookIcon";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <AnimatedBookIcon size={60} color="white" speed="normal" />
        <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
          Loading BookTrackerDemo...
        </Typography>
      </Box>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;
