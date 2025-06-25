import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Tabs,
  Tab,
  Container,
  Avatar,
  Fade,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  AutoAwesome as StarIcon,
  MenuBook as BookIcon,
  TrendingUp as TrendingIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login, signup, error, isLoading, clearError, revealPassword } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [revealedPassword, setRevealedPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");

  // Dark mode TextField styling
  const textFieldSx = {
    '& .MuiInputLabel-root': {
      color: (theme) =>
        theme.palette.mode === 'dark' ? '#ffffff !important' : '#000000 !important',
      '&.Mui-focused': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#90caf9 !important' : '#1976d2 !important',
      },
    },
    '& .MuiFormHelperText-root': {
      color: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7) !important' : 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#2a2a2a !important' : '#ffffff !important',
      color: (theme) =>
        theme.palette.mode === 'dark' ? '#ffffff !important' : '#000000 !important',
      '& fieldset': {
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3) !important' : 'rgba(0, 0, 0, 0.23) !important',
      },
      '&:hover fieldset': {
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5) !important' : 'rgba(0, 0, 0, 0.4) !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? '#90caf9 !important' : '#1976d2 !important',
      },
      '&.Mui-focused': {
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#2a2a2a !important' : '#ffffff !important',
      },
      '& input': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#ffffff !important' : '#000000 !important',
        backgroundColor: 'transparent !important',
      },
      '& input::placeholder': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#b0b0b0 !important' : '#666666 !important',
        opacity: '1 !important',
      },
    },
  };

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Forgot password form state
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    username: "",
  });



  const [formErrors, setFormErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [hasTriedSignup, setHasTriedSignup] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState({});
  const [forgotPasswordAvailability, setForgotPasswordAvailability] = useState({});

  // Helper function to get username icon color based on availability
  const getUsernameIconColor = (username) => {
    if (usernameAvailability[username] === false) return "error";
    if (validFields.username) return "success"; // default to available
    return "action";
  };

  // Helper function to get username border color
  const getUsernameBorderColor = (username) => {
    if (usernameAvailability[username] === false) return "error.main";
    if (validFields.username) return "success.main"; // default to available
    return undefined;
  };

  // Helper function to get username helper text color
  const getUsernameHelperColor = (username) => {
    if (usernameAvailability[username] === false) return "error.main";
    if (validFields.username) return "success.main"; // default to available
    return undefined;
  };

  // Helper functions for forgot password username checking
  const getForgotPasswordIconColor = (username) => {
    if (forgotPasswordAvailability[username] === true) return "success"; // user exists
    if (forgotPasswordAvailability[username] === false) return "error"; // no user
    return "action";
  };

  const getForgotPasswordBorderColor = (username) => {
    if (forgotPasswordAvailability[username] === true) return "success.main";
    if (forgotPasswordAvailability[username] === false) return "error.main";
    return undefined;
  };

  const getForgotPasswordHelperColor = (username) => {
    if (forgotPasswordAvailability[username] === true) return "success.main";
    if (forgotPasswordAvailability[username] === false) return "error.main";
    return undefined;
  };

  // Clear auth errors only when manually switching tabs, not on login/signup attempts
  useEffect(() => {
    // Only clear errors when explicitly switching tabs, not on initial load or after failed login
    setSuccessMessage("");
  }, [showForgotPassword]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Clear form errors when switching tabs
    setFormErrors({});
    setValidFields({});
    setPasswordStrength('');
    setHasTriedSubmit(false);
    setHasTriedSignup(false);
    setUsernameAvailability({});
    setForgotPasswordAvailability({});
    setRevealedPassword("");
    setCopyFeedback("");
    // Clear auth errors when manually switching tabs
    clearError();
  };

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for username
    if (field === 'username') {
      const newErrors = { ...formErrors };
      const newValidFields = { ...validFields };
      if (value.trim() === '') {
        newErrors.username = "Username is required";
        delete newValidFields.username;
      } else if (value.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
        delete newValidFields.username;
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        newErrors.username = "Username can only contain letters, numbers, and underscores";
        delete newValidFields.username;
      } else if (value.length > 20) {
        newErrors.username = "Username must be 20 characters or less";
        delete newValidFields.username;
      } else {
        delete newErrors.username;
        newValidFields.username = true;
      }
      setFormErrors(newErrors);
      setValidFields(newValidFields);
    } else if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const checkUsernameAvailability = (username) => {
    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameAvailability(prev => ({ ...prev, [username]: undefined }));
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("bookTrackerDemo_users") || "[]");
      // Filter out any null/undefined users and ensure they have username property
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const isTaken = validUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

      console.log('Checking username:', username, 'against valid users:', validUsers.map(u => u.username));
      console.log('Is taken:', !!isTaken);

      // Set availability based on whether username exists
      setUsernameAvailability(prev => ({
        ...prev,
        [username]: !isTaken
      }));
    } catch (error) {
      console.error('Error checking username availability:', error);
      // Default to available on error
      setUsernameAvailability(prev => ({ ...prev, [username]: true }));
    }
  };

  const handleSignupChange = (field, value) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for signup fields
    const newErrors = { ...formErrors };
    const newValidFields = { ...validFields };

    if (field === 'username') {
      if (value.trim() === '') {
        newErrors.username = "Username is required";
        delete newValidFields.username;
        setUsernameAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (value.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
        delete newValidFields.username;
        setUsernameAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        newErrors.username = "Username can only contain letters, numbers, and underscores";
        delete newValidFields.username;
        setUsernameAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (value.length > 20) {
        newErrors.username = "Username must be 20 characters or less";
        delete newValidFields.username;
        setUsernameAvailability(prev => ({ ...prev, [value]: undefined }));
      } else {
        delete newErrors.username;
        newValidFields.username = true;
        // Check availability immediately
        checkUsernameAvailability(value);
      }
    } else if (field === 'name') {
      // No validation for name field
      delete newErrors.name;
      newValidFields.name = true;
    } else if (field === 'password') {
      // Password strength indicator
      if (value === '') {
        newErrors.password = "Password is required";
        setPasswordStrength('');
        delete newValidFields.password;
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        setPasswordStrength('Weak');
        delete newValidFields.password;
      } else if (value.length < 8) {
        setPasswordStrength('Fair');
        delete newErrors.password;
        newValidFields.password = true;
      } else if (value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        setPasswordStrength('Strong');
        delete newErrors.password;
        newValidFields.password = true;
      } else {
        setPasswordStrength('Good');
        delete newErrors.password;
        newValidFields.password = true;
      }

      // Also check confirm password if it exists
      if (signupForm.confirmPassword && value !== signupForm.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        delete newValidFields.confirmPassword;
      } else if (signupForm.confirmPassword && value === signupForm.confirmPassword) {
        delete newErrors.confirmPassword;
        newValidFields.confirmPassword = true;
      }
    } else if (field === 'confirmPassword') {
      if (value === '') {
        newErrors.confirmPassword = "Please confirm your password";
        delete newValidFields.confirmPassword;
      } else if (value !== signupForm.password) {
        newErrors.confirmPassword = "Passwords do not match";
        delete newValidFields.confirmPassword;
      } else {
        delete newErrors.confirmPassword;
        newValidFields.confirmPassword = true;
      }
    }

    setFormErrors(newErrors);
    setValidFields(newValidFields);
  };

  const checkForgotPasswordUsername = (username) => {
    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      setForgotPasswordAvailability(prev => ({ ...prev, [username]: undefined }));
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("bookTrackerDemo_users") || "[]");
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const userExists = validUsers.find(u => u.username.toLowerCase() === username.toLowerCase());

      setForgotPasswordAvailability(prev => ({
        ...prev,
        [username]: !!userExists
      }));
    } catch (error) {
      console.error('Error checking username:', error);
      setForgotPasswordAvailability(prev => ({ ...prev, [username]: false }));
    }
  };

  const handleForgotPasswordChange = (field, value) => {
    setForgotPasswordForm((prev) => ({ ...prev, [field]: value }));

    // Real-time validation for forgot password username
    if (field === 'username') {
      const newErrors = { ...formErrors };
      if (value.trim() === '') {
        newErrors.username = "Username is required";
        setForgotPasswordAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (value.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
        setForgotPasswordAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        newErrors.username = "Username can only contain letters, numbers, and underscores";
        setForgotPasswordAvailability(prev => ({ ...prev, [value]: undefined }));
      } else if (value.length > 20) {
        newErrors.username = "Username must be 20 characters or less";
        setForgotPasswordAvailability(prev => ({ ...prev, [value]: undefined }));
      } else {
        delete newErrors.username;
        checkForgotPasswordUsername(value);
      }
      setFormErrors(newErrors);
    } else if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };



  const validateLoginForm = () => {
    const errors = {};

    if (!loginForm.username.trim()) {
      errors.username = "Username is required";
    } else if (loginForm.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(loginForm.username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    } else if (loginForm.username.length > 20) {
      errors.username = "Username must be 20 characters or less";
    }

    if (!loginForm.password) {
      errors.password = "Password is required";
    } else if (loginForm.password.length < 1) {
      errors.password = "Password cannot be empty";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignupForm = () => {
    const errors = {};

    if (!signupForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!signupForm.username.trim()) {
      errors.username = "Username is required";
    } else if (signupForm.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(signupForm.username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    } else if (signupForm.username.length > 20) {
      errors.username = "Username must be 20 characters or less";
    }

    if (!signupForm.password) {
      errors.password = "Password is required";
    } else if (signupForm.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!signupForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    // Always validate form on submit to show errors
    const isValid = validateLoginForm();
    if (!isValid) {
      // Validation errors are already set in formErrors
      return;
    }

    // Don't clear auth errors before login - let the auth context handle it
    const result = await login(loginForm.username, loginForm.password);
    if (!result.success) {
      // Error is handled by context and will be displayed in the Alert
      // The error should now persist and be visible to the user
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setHasTriedSignup(true);

    // Always validate form on submit to show errors
    const isValid = validateSignupForm();

    if (!isValid) {
      // Validation errors are already set in formErrors
      return;
    }

    // Don't block signup based on availability check - let server handle it
    console.log('Form data before signup:', signupForm);
    console.log('Username availability state:', usernameAvailability);

    // Don't clear auth errors before signup - let the auth context handle it
    const { confirmPassword: _, ...userData } = signupForm;
    console.log('Attempting signup with userData:', userData);
    console.log('userData keys:', Object.keys(userData));
    console.log('userData values:', Object.values(userData));

    try {
      const result = await signup(userData);
      console.log('Signup result:', result);
      if (!result.success) {
        // Error is handled by context and will be displayed in the Alert
        console.log('Signup failed with error:', result.error);
      } else {
        console.log('Signup successful! User should be logged in now.');
      }
    } catch (error) {
      console.error('Signup threw an error:', error);
    }
  };

  const handleForgotPassword = () => {
    console.log('handleForgotPassword called - synchronous implementation');

    // Check if user exists before attempting to reveal password
    if (forgotPasswordAvailability[forgotPasswordForm.username] === false) {
      console.log('User not found - setting error');
      setFormErrors({ username: "No user found with this username" });
      return;
    }

    // Validate username format
    if (!forgotPasswordForm.username.trim()) {
      console.log('Username empty - setting error');
      setFormErrors({ username: "Username is required" });
      return;
    }

    try {
      console.log('About to reveal password synchronously');

      // Get users from localStorage directly (synchronous)
      const users = JSON.parse(localStorage.getItem("bookTrackerDemo_users") || "[]");

      // Filter out invalid users and find the target user
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const user = validUsers.find(u => u.username.toLowerCase() === forgotPasswordForm.username.toLowerCase());

      if (!user) {
        console.log('User not found in storage');
        setFormErrors({ username: "No account found with this username" });
        setSuccessMessage("");
        setRevealedPassword("");
        return;
      }

      console.log('Success - user found, revealing password');
      setSuccessMessage("");
      setRevealedPassword(user.password);
      setFormErrors({});

    } catch (error) {
      console.error('Error in handleForgotPassword:', error);
      setFormErrors({ username: "Failed to reveal password. Please try again." });
      setSuccessMessage("");
      setRevealedPassword("");
    }
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(revealedPassword);
      setCopyFeedback("Copied!");
      setTimeout(() => setCopyFeedback(""), 2000);
    } catch (error) {
      setCopyFeedback("Failed to copy");
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  };



  const demoLogin = async () => {
    await login("demo", "demo123");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
          flexWrap="wrap"
        >
          {/* Left Side - Branding */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 500,
              color: "white",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <BookIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h3" fontWeight="bold">
                BookTrackerDemo
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mb: 3, opacity: 0.95 }}>
              Track Your Reading Journey
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
            >
              Discover, track, and celebrate your reading achievements. Set
              goals, write reviews, and build your personal library.
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <TrendingIcon sx={{ opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Set and track your yearly reading goals
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <StarIcon sx={{ opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Rate and review your favorite books
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <TrophyIcon sx={{ opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Earn achievements and build reading streaks
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Login Form */}
          <Card
            sx={{
              flex: 1,
              maxWidth: 450,
              borderRadius: 3,
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? "0 20px 40px rgba(0,0,0,0.5)"
                  : "0 20px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? "rgba(33, 33, 33, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                textAlign="center"
                fontWeight={600}
                mb={1}
                sx={{ color: "text.primary" }}
              >
                {activeTab === 0 ? "Welcome Back" : "Create Account"}
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                mb={3}
                sx={{
                  color: "text.primary",
                  opacity: (theme) => theme.palette.mode === 'dark' ? 0.9 : 0.8
                }}
              >
                {activeTab === 0
                  ? "Sign in to continue your reading journey"
                  : "Start tracking your personal reading journey"}
              </Typography>

              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  mb: 3,
                  "& .MuiTab-root": {
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: 500,
                    "&.Mui-selected": {
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 600,
                    },
                    "&:hover": {
                      color: (theme) => theme.palette.primary.dark,
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.main}08`,
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    height: 3,
                  },
                }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#3e2723' : '#ffebee',
                    border: (theme) =>
                      theme.palette.mode === 'dark' ? '2px solid #ef5350' : '2px solid #f44336',
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#ffcdd2' : '#d32f2f'
                    },
                    '& .MuiAlert-icon': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#ef5350' : '#f44336'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              {activeTab === 0 && (
                <Fade in={activeTab === 0} timeout={300}>
                  <Box component="form" onSubmit={handleLogin}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={loginForm.username}
                      onChange={(e) =>
                        handleLoginChange("username", e.target.value)
                      }
                      error={!!formErrors.username || (hasTriedSubmit && !loginForm.username)}
                      helperText={formErrors.username || (validFields.username ? "Valid username" : "")}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                color: validFields.username
                                  ? "success.main"
                                  : (theme) => theme.palette.mode === 'dark'
                                    ? 'rgba(255, 255, 255, 0.7)'
                                    : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        ...textFieldSx,
                        "& .MuiOutlinedInput-root": {
                          ...textFieldSx['& .MuiOutlinedInput-root'],
                          "&.Mui-focused": {
                            ...textFieldSx['& .MuiOutlinedInput-root']['&.Mui-focused'],
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: validFields.username ? "success.main" : "#1976d2 !important",
                            }
                          }
                        },
                        "& .MuiFormHelperText-root": {
                          color: validFields.username ? "success.main" : undefined,
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) =>
                        handleLoginChange("password", e.target.value)
                      }
                      error={!!formErrors.password || (hasTriedSubmit && !loginForm.password)}
                      helperText={formErrors.password || (hasTriedSubmit && !loginForm.password ? "Password is required" : "")}
                      margin="normal"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.7)'
                                  : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? '#90caf9'
                                  : 'primary.main'
                              }}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: 48,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Login"
                      )}
                    </Button>

                    <Box textAlign="center" sx={{ mb: 2 }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          setShowForgotPassword(true);
                          setFormErrors({});
                          setSuccessMessage("");
                          setRevealedPassword("");
                          setCopyFeedback("");
                        }}
                        sx={{
                          textTransform: "none",
                          color: (theme) => theme.palette.mode === 'dark'
                            ? '#90caf9'
                            : 'primary.main'
                        }}
                        type="button"
                      >
                        Forgot Password?
                      </Button>
                    </Box>

                    <Divider
                      sx={{
                        my: 2,
                        "& .MuiDivider-wrapper": {
                          color: "text.primary",
                          opacity: (theme) => theme.palette.mode === 'dark' ? 0.9 : 1
                        },
                        "&::before, &::after": {
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.12)'
                              : 'rgba(0, 0, 0, 0.12)'
                        }
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontWeight: 500,
                          opacity: (theme) => theme.palette.mode === 'dark' ? 0.9 : 1
                        }}
                      >
                        or
                      </Typography>
                    </Divider>

                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={demoLogin}
                      disabled={isLoading}
                      sx={{ mb: 2 }}
                    >
                      Try Demo Account
                    </Button>




                  </Box>
                </Fade>
              )}

              {/* Signup Form */}
              {activeTab === 1 && (
                <Fade in={activeTab === 1} timeout={300}>
                  <Box component="form" onSubmit={handleSignup}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={signupForm.name}
                      onChange={(e) =>
                        handleSignupChange("name", e.target.value)
                      }
                      error={!!formErrors.name || (hasTriedSignup && !signupForm.name.trim())}
                      helperText={formErrors.name || (hasTriedSignup && !signupForm.name.trim() ? "Name is required" : "")}
                      margin="normal"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.7)'
                                  : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldSx}
                    />

                    <TextField
                      fullWidth
                      label="Username"
                      value={signupForm.username}
                      onChange={(e) =>
                        handleSignupChange("username", e.target.value)
                      }
                      error={!!formErrors.username || (hasTriedSignup && (!signupForm.username.trim() || signupForm.username.length < 3)) || (usernameAvailability[signupForm.username] === false)}
                      helperText={
                        formErrors.username ||
                        (usernameAvailability[signupForm.username] === false ? "Username unavailable" :
                         hasTriedSignup && !signupForm.username.trim() ? "Username is required" :
                         hasTriedSignup && signupForm.username.length < 3 ? "Username must be at least 3 characters" :
                         validFields.username ? "Username available" : "")
                      }
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon
                              sx={{
                                color: usernameAvailability[signupForm.username] === false
                                  ? 'error.main'
                                  : validFields.username
                                    ? 'success.main'
                                    : (theme) => theme.palette.mode === 'dark'
                                      ? 'rgba(255, 255, 255, 0.7)'
                                      : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        ...textFieldSx,
                        "& .MuiOutlinedInput-root": {
                          ...textFieldSx['& .MuiOutlinedInput-root'],
                          "&.Mui-focused": {
                            ...textFieldSx['& .MuiOutlinedInput-root']['&.Mui-focused'],
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: getUsernameBorderColor(signupForm.username),
                            }
                          }
                        },
                        "& .MuiFormHelperText-root": {
                          color: getUsernameHelperColor(signupForm.username),
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={signupForm.password}
                      onChange={(e) =>
                        handleSignupChange("password", e.target.value)
                      }
                      error={!!formErrors.password || (hasTriedSignup && (!signupForm.password || signupForm.password.length < 6))}
                      helperText={
                        formErrors.password ||
                        (hasTriedSignup && !signupForm.password ? "Password is required" : hasTriedSignup && signupForm.password.length < 6 ? "Password must be at least 6 characters" : passwordStrength ? `Password strength: ${passwordStrength}` : "At least 6 characters")
                      }
                      sx={{
                        ...textFieldSx,
                        "& .MuiFormHelperText-root": {
                          color: passwordStrength === 'Strong' ? "success.main" :
                                passwordStrength === 'Good' ? "warning.main" :
                                passwordStrength === 'Fair' ? "orange" :
                                passwordStrength === 'Weak' ? "error.main" : undefined,
                        }
                      }}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.7)'
                                  : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? '#90caf9'
                                  : 'primary.main'
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupForm.confirmPassword}
                      onChange={(e) =>
                        handleSignupChange("confirmPassword", e.target.value)
                      }
                      error={!!formErrors.confirmPassword || (hasTriedSignup && (!signupForm.confirmPassword || signupForm.confirmPassword !== signupForm.password))}
                      helperText={formErrors.confirmPassword || (hasTriedSignup && !signupForm.confirmPassword ? "Please confirm your password" : hasTriedSignup && signupForm.confirmPassword !== signupForm.password ? "Passwords do not match" : "")}
                      margin="normal"
                      sx={textFieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? 'rgba(255, 255, 255, 0.7)'
                                  : 'action.active'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              sx={{
                                color: (theme) => theme.palette.mode === 'dark'
                                  ? '#90caf9'
                                  : 'primary.main'
                              }}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isLoading}
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: 48,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Create Account"
                      )}
                    </Button>


                  </Box>
                </Fade>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Forgot Password Inline Form (Testing) */}
      {showForgotPassword && (
        <Card sx={{
          mt: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? "rgba(33, 33, 33, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>Reveal Password</Typography>
            <Typography variant="body2" sx={{
              mb: 3,
              color: "text.primary",
              opacity: (theme) => theme.palette.mode === 'dark' ? 0.9 : 0.7
            }}>
              Enter your username and we'll reveal your password.
            </Typography>

            {successMessage && (
              <Alert
                severity="success"
                sx={{
                  mb: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2e7d32' : '#e8f5e8',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff' : '#2e7d32',
                  '& .MuiAlert-icon': {
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#81c784' : '#4caf50'
                  }
                }}
              >
                {successMessage}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              value={forgotPasswordForm.username}
              onChange={(e) => handleForgotPasswordChange("username", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleForgotPassword();
                }
              }}
              error={!!formErrors.username || (forgotPasswordAvailability[forgotPasswordForm.username] === false)}
              helperText={
                formErrors.username ||
                (forgotPasswordAvailability[forgotPasswordForm.username] === false ? "No user found" :
                 forgotPasswordAvailability[forgotPasswordForm.username] === true ? "✓ User found" : "")
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon
                      sx={{
                        color: forgotPasswordAvailability[forgotPasswordForm.username] === false
                          ? 'error.main'
                          : forgotPasswordAvailability[forgotPasswordForm.username] === true
                            ? 'success.main'
                            : (theme) => theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : 'action.active'
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                ...textFieldSx,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  ...textFieldSx['& .MuiOutlinedInput-root'],
                  "&.Mui-focused": {
                    ...textFieldSx['& .MuiOutlinedInput-root']['&.Mui-focused'],
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: getForgotPasswordBorderColor(forgotPasswordForm.username),
                    }
                  }
                },
                "& .MuiFormHelperText-root": {
                  color: getForgotPasswordHelperColor(forgotPasswordForm.username),
                }
              }}
            />

            {revealedPassword && (
              <Alert
                severity="success"
                sx={{
                  mb: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#2e7d32' : '#e8f5e8',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#ffffff' : '#2e7d32',
                  '& .MuiAlert-icon': {
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#81c784' : '#4caf50'
                  }
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" sx={{
                    color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#2e7d32'
                  }}>
                    <strong>Password:</strong> {revealedPassword}
                  </Typography>
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    onClick={handleCopyPassword}
                    sx={{
                      ml: 1,
                      borderColor: (theme) => theme.palette.mode === 'dark' ? '#81c784' : '#4caf50',
                      color: (theme) => theme.palette.mode === 'dark' ? '#81c784' : '#4caf50',
                      '&:hover': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#66bb6a' : '#388e3c',
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(129, 199, 132, 0.1)' : 'rgba(76, 175, 80, 0.1)'
                      }
                    }}
                    color={copyFeedback === "Copied!" ? "success" : "primary"}
                  >
                    {copyFeedback || "Copy"}
                  </Button>
                </Box>
              </Alert>
            )}

            <Box display="flex" gap={1}>
              <Button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setRevealedPassword("");
                  setCopyFeedback("");
                  setSuccessMessage("");
                  setFormErrors({});
                }}>Back</Button>
              <Button
                onClick={(e) => {
                  try {
                    e.preventDefault();
                    e.stopPropagation();
                    handleForgotPassword();
                  } catch (error) {
                    console.error('Button click error:', error);
                    alert('Button error: ' + error.message);
                  }
                }}
                variant="contained"
                disabled={isLoading || !forgotPasswordForm.username.trim()}
                type="button"
              >
                {isLoading ? "Finding..." : "Reveal Password"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}


    </Box>
  );
};

export default LoginPage;
