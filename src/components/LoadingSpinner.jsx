import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ImportContacts as BookIcon } from "@mui/icons-material";
import AnimatedBookIcon from "./AnimatedBookIcon";

const LoadingSpinner = ({
  size = "medium",
  message = "Loading your books...",
  type = "circular",
  compact = false,
}) => {
  const getSizeConfig = (size) => {
    switch (size) {
      case "small":
        return { spinner: 24, icon: 40, spacing: 2 };
      case "large":
        return { spinner: 60, icon: 80, spacing: 4 };
      default:
        return { spinner: 40, icon: 60, spacing: 3 };
    }
  };

  const config = getSizeConfig(size);

  if (compact) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        p={1}
      >
        <CircularProgress size={20} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (type === "book") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={config.spacing * 2}
        px={config.spacing}
      >
        <Box sx={{ mb: config.spacing }}>
          <AnimatedBookIcon
            size={config.icon}
            color="primary.main"
            speed="normal"
            glowColor="rgba(33, 150, 243, 0.3)"
          />
        </Box>

        <Typography
          variant={size === "large" ? "h6" : "body1"}
          color="text.secondary"
          sx={{
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={config.spacing * 2}
      px={config.spacing}
    >
      <Box position="relative" mb={config.spacing}>
        <CircularProgress
          size={config.spinner}
          thickness={4}
          sx={{
            color: "primary.main",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <BookIcon
            sx={{
              fontSize: config.spinner * 0.5,
              color: "primary.light",
              opacity: 0.7,
            }}
          />
        </Box>
      </Box>

      <Typography
        variant={size === "large" ? "h6" : "body1"}
        color="text.secondary"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          maxWidth: 300,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

// Full page loading overlay
export const FullPageLoader = ({ message = "Loading your library..." }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        color: "white",
      }}
    >
      <AnimatedBookIcon
        size={80}
        color="white"
        speed="normal"
        glowColor="rgba(255, 255, 255, 0.3)"
      />
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          fontWeight: 500,
          textAlign: "center",
          maxWidth: 300,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

// Inline loading for buttons
export const ButtonLoader = () => {
  return (
    <CircularProgress
      size={16}
      thickness={4}
      sx={{ color: "inherit", mr: 1 }}
    />
  );
};

// Card loading placeholder
export const CardLoader = ({ height = 200 }) => {
  return (
    <Box
      sx={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey.100",
        borderRadius: 2,
        border: "1px dashed",
        borderColor: "grey.300",
      }}
    >
      <LoadingSpinner size="small" compact />
    </Box>
  );
};

export default LoadingSpinner;
