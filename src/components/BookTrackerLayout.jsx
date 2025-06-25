import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Tab,
  Tabs,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Home as HomeIcon,
  LibraryBooks as AllBooksIcon,
  BookmarkBorder as WishlistIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import { useTheme as useCustomTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import UserProfile from "./UserProfile";
import AnimatedBookIcon from "./AnimatedBookIcon";

const BookTrackerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { getBookStats } = useBooks();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const stats = getBookStats();

  const navigationItems = [
    {
      text: "About",
      icon: <HomeIcon />,
      path: "/book-tracker",
      count: null,
    },
    {
      text: "Library",
      icon: <AllBooksIcon />,
      path: "/book-tracker/books",
      count: stats.total,
    },
    {
      text: "Wishlist",
      icon: <WishlistIcon />,
      path: "/book-tracker/wishlist",
      count: stats.wishlist,
    },
    {
      text: "Currently Reading",
      icon: <ReadingIcon />,
      path: "/book-tracker/currently-reading",
      count: stats.currentlyReading,
    },
    {
      text: "Finished",
      icon: <FinishedIcon />,
      path: "/book-tracker/finished",
      count: stats.finished,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleProfileOpen = () => {
    setProfileDialogOpen(true);
    handleUserMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const isCurrentPath = (path) => {
    if (path === "/book-tracker") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getCurrentTabValue = () => {
    const currentItem = navigationItems.find((item) =>
      isCurrentPath(item.path),
    );
    return currentItem ? currentItem.path : navigationItems[0].path;
  };

  const handleTabChange = (event, newValue) => {
    handleNavigation(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      {/* Top Navigation Bar */}
      <AppBar
        position="sticky"
        sx={{
          background: "#000",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          {/* Brand/Logo */}
          <Box display="flex" alignItems="center" gap={1} sx={{ mr: 4 }}>
            <AnimatedBookIcon
              size={32}
              color="white"
              speed="normal"
              glowColor="rgba(255,255,255,0.3)"
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                fontFamily: '"Orbitron", monospace',
                textTransform: "uppercase",
                letterSpacing: "1px",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
                animation: "glow 2s ease-in-out infinite alternate",
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
              }}
            >
              BookTracker
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* User Profile & Theme Toggle */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Theme Toggle */}
            <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* User Avatar & Menu */}
            <Tooltip title="Account">
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{
                  p: 0,
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: 32,
                    height: 32,
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuClick}
                sx={{
                  color: "white",
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Desktop Navigation Tabs */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Tabs
                value={getCurrentTabValue()}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTab-root": {
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    textTransform: "none",
                    minHeight: 48,
                    borderRadius: "25px",
                    margin: "0 5px",
                    padding: "8px 16px",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      transition: "left 0.5s",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                    "&.Mui-selected": {
                      color: "white !important",
                      backgroundColor: "rgba(102, 126, 234, 0.8)",
                      background:
                        "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
                      fontWeight: 600,
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                {navigationItems.map((item) => (
                  <Tab
                    key={item.path}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        {item.icon}
                        <span>{item.text}</span>
                      </Box>
                    }
                    value={item.path}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          {/* Mobile Navigation Menu */}
          {isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                color="inherit"
                onClick={handleMobileMenuClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>

        {/* Mobile Menu Collapse */}
        {isMobile && (
          <Collapse in={mobileMenuOpen}>
            <List sx={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
              {navigationItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                  selected={isCurrentPath(item.path)}
                  sx={{
                    color: "white",
                    borderRadius: "25px",
                    margin: "4px 8px",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      transition: "left 0.5s",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(102, 126, 234, 0.8)",
                      background:
                        "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)",
                      fontWeight: 600,
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      "&::before": {
                        left: "100%",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isCurrentPath(item.path) ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          minHeight: "calc(100vh - 64px)",
          background: isDarkMode
            ? "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
            : "linear-gradient(135deg, #1565c0 0%, #283593 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            backgroundColor: isDarkMode
              ? "rgba(30,30,30,0.95)"
              : "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            minHeight: "calc(100vh - 128px)",
            p: 3,
            animation: "fadeInUp 0.8s ease-out",
            "@keyframes fadeInUp": {
              from: {
                opacity: 0,
                transform: "translateY(30px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },

            "@keyframes glow": {
              from: {
                textShadow:
                  "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6",
              },
              to: {
                textShadow:
                  "0 0 10px #fff, 0 0 20px #fff, 0 0 25px #0073e6, 0 0 30px #0073e6",
              },
            },
          }}
        >
          <Outlet />
        </Box>
      </Container>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem onClick={handleProfileOpen} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ mr: 2, color: "action.active" }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: "error.main" }}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* User Profile Dialog */}
      <UserProfile
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
      />
    </Box>
  );
};

export default BookTrackerLayout;
