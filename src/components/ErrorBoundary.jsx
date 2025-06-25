import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (
      typeof window !== "undefined" &&
      window.location &&
      window.location.hostname === "localhost"
    ) {
      console.error("Error Boundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/booktracker-demo";
  };

  render() {
    if (this.state.hasError) {
      const { compact = false, fallback } = this.props;

      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Compact error display
      if (compact) {
        return (
          <Alert
            severity="error"
            sx={{
              my: 2,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(244, 67, 54, 0.05)',
              border: (theme) => `1px solid ${theme.palette.error.main}`,
              '& .MuiAlert-icon': {
                color: 'error.main'
              }
            }}
          >
            <AlertTitle sx={{ color: "error.main", fontWeight: 600 }}>
              Something went wrong
            </AlertTitle>
            <Box display="flex" gap={1} mt={1}>
              <Button size="small" onClick={this.handleRetry} color="primary">
                Try Again
              </Button>
            </Box>
          </Alert>
        );
      }

      // Full error page
      return (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.01)',
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 4,
              maxWidth: 500,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.paper : '#ffffff',
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: "error.main",
                mb: 2,
                opacity: 0.7,
              }}
            />

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Oops! Something went wrong
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                color: "text.primary",
                opacity: 0.8
              }}
            >
              We encountered an unexpected error while loading your books. Don't
              worry, your data is safe!
            </Typography>

            {typeof window !== "undefined" &&
              window.location &&
              window.location.hostname === "localhost" &&
              this.state.error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    textAlign: "left",
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(244, 67, 54, 0.05)',
                    border: (theme) => `1px solid ${theme.palette.error.main}`,
                    '& .MuiAlert-icon': {
                      color: 'error.main'
                    }
                  }}
                >
                  <AlertTitle sx={{ color: "error.main", fontWeight: 600 }}>
                    Error Details (Development)
                  </AlertTitle>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{
                      mt: 1,
                      color: "text.primary",
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                      padding: 1,
                      borderRadius: 1,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      fontSize: "0.75rem",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word"
                    }}
                  >
                    {this.state.error.toString()}
                  </Typography>
                  {this.state.errorInfo && (
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        mt: 1,
                        fontSize: "0.7rem",
                        color: "text.primary",
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                        padding: 1,
                        borderRadius: 1,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        maxHeight: "200px",
                        overflow: "auto"
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  )}
                </Alert>
              )}

            <Box display="flex" gap={2} justifyContent="center">
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleRetry}
                sx={{ px: 3 }}
              >
                Try Again
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                sx={{ px: 3 }}
              >
                Go Home
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 3, fontStyle: "italic" }}
            >
              If this problem persists, try refreshing the page or clearing your
              browser cache.
            </Typography>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for error handling in functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null);

  const handleError = React.useCallback((error) => {
    setError(error);
    console.error("Error handled:", error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  // Throw error to be caught by error boundary
  if (error) {
    throw error;
  }

  return { handleError, clearError };
};

export default ErrorBoundary;
