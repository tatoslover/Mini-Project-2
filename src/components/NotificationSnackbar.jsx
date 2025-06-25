import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  AlertTitle,
  Slide,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// Context for managing notifications globally
const NotificationContext = React.createContext();

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "info", options = {}) => {
    const notification = {
      id: Date.now() + Math.random(),
      message,
      type,
      title: options.title,
      duration: options.duration || 4000,
      action: options.action,
      persistent: options.persistent || false,
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto remove after duration (unless persistent)
    if (!notification.persistent && notification.duration > 0) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);
    }

    return notification.id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (message, options = {}) =>
    showNotification(message, "success", options);
  const error = (message, options = {}) =>
    showNotification(message, "error", { duration: 6000, ...options });
  const warning = (message, options = {}) =>
    showNotification(message, "warning", options);
  const info = (message, options = {}) =>
    showNotification(message, "info", options);

  const contextValue = {
    notifications,
    showNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationSnackbar />
    </NotificationContext.Provider>
  );
};

const NotificationSnackbar = () => {
  const { notifications, removeNotification } = useNotification();
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    } else if (notifications.length === 0) {
      setCurrentNotification(null);
    }
  }, [notifications, currentNotification]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (currentNotification) {
      removeNotification(currentNotification.id);
      setCurrentNotification(null);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
      default:
        return <InfoIcon />;
    }
  };

  if (!currentNotification) {
    return null;
  }

  return (
    <Snackbar
      open={!!currentNotification}
      autoHideDuration={
        currentNotification.persistent ? null : currentNotification.duration
      }
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          padding: 0,
        },
      }}
    >
      <Alert
        severity={currentNotification.type}
        onClose={handleClose}
        variant="filled"
        icon={getIcon(currentNotification.type)}
        sx={{
          minWidth: 300,
          maxWidth: 500,
          borderRadius: 2,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          "& .MuiAlert-message": {
            padding: "8px 0",
          },
        }}
        action={
          <>
            {currentNotification.action && currentNotification.action}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        {currentNotification.title && (
          <AlertTitle sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
            {currentNotification.title}
          </AlertTitle>
        )}
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
};

// Pre-configured notification functions for common book app actions
export const bookNotifications = {
  bookAdded: (title) => ({
    message: `"${title}" has been added to your library`,
    type: "success",
    title: "Book Added",
  }),

  bookUpdated: (title) => ({
    message: `"${title}" has been updated`,
    type: "success",
    title: "Book Updated",
  }),

  bookDeleted: (title) => ({
    message: `"${title}" has been removed from your library`,
    type: "info",
    title: "Book Removed",
  }),

  statusChanged: (title, status) => ({
    message: `"${title}" moved to ${status}`,
    type: "success",
    title: "Status Updated",
  }),

  progressUpdated: (title, progress) => ({
    message: `Reading progress updated to ${progress}%`,
    type: "success",
    title: "Progress Updated",
  }),

  bookRated: (title, rating) => ({
    message: `You rated "${title}" ${rating} stars`,
    type: "success",
    title: "Rating Added",
  }),

  searchError: () => ({
    message: "Unable to search books. Please check your connection and try again.",
    type: "error",
    title: "Search Failed",
    duration: 6000,
  }),

  saveError: () => ({
    message: "Failed to save your changes. Please try again.",
    type: "error",
    title: "Save Failed",
    duration: 6000,
  }),

  loadError: () => ({
    message: "Unable to load your books. Please refresh the page.",
    type: "error",
    title: "Loading Failed",
    persistent: true,
  }),
};

export default NotificationSnackbar;
