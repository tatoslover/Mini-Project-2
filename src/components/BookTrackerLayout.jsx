import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
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
} from "@mui/material";
import {
  Home as HomeIcon,
  LibraryBooks as AllBooksIcon,
  BookmarkBorder as WishlistIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  ImportContacts as LogoIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import { useTheme as useCustomTheme } from "../contexts/ThemeContext";

const BookTrackerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { getBookStats } = useBooks();
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <LogoIcon
              sx={{
                fontSize: 32,
                color: "white",
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                animation:
                  "pageFlip 4s cubic-bezier(0.4, 0.0, 0.2, 1) infinite, glow 2s ease-in-out infinite alternate",
                transformOrigin: "center",
                cursor: "pointer",
                perspective: "1000px",
                transformStyle: "preserve-3d",
                "&:hover": {
                  animation:
                    "pageFlipFast 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite, glow 1s ease-in-out infinite alternate",
                },
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "white",
                fontFamily: '"Orbitron", monospace',
                textTransform: "uppercase",
                letterSpacing: "1px",
                textShadow: "0 0 10px rgba(255,255,255,0.5)",
                animation: "glow 2s ease-in-out infinite alternate",
              }}
            >
              Reading Tracker
            </Typography>
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
                    margin: "0 4px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      fontWeight: 600,
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

          {/* Theme Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "white",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              />
            }
            label={
              <Box display="flex" alignItems="center" gap={0.5}>
                {isDarkMode ? (
                  <DarkModeIcon sx={{ color: "white", fontSize: 20 }} />
                ) : (
                  <LightModeIcon sx={{ color: "white", fontSize: 20 }} />
                )}
              </Box>
            }
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "white",
              },
            }}
          />
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
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
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
            "@keyframes pageFlip": {
              "0%": {
                transform: "rotateY(0deg) scale(1)",
                opacity: 1,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                animationTimingFunction: "ease-out",
              },
              "5%": {
                transform: "rotateY(0deg) scale(1)",
                opacity: 1,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                animationTimingFunction: "ease-in",
              },
              "20%": {
                transform: "rotateY(90deg) scale(1.03)",
                opacity: 0.7,
                filter: "drop-shadow(4px 4px 16px rgba(255,255,255,0.5))",
                animationTimingFunction: "linear",
              },
              "30%": {
                transform: "rotateY(180deg) scale(1)",
                opacity: 0.9,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
                animationTimingFunction: "ease-out",
              },
              "40%": {
                transform: "rotateY(180deg) scale(1)",
                opacity: 0.9,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
                animationTimingFunction: "ease-in",
              },
              "55%": {
                transform: "rotateY(270deg) scale(1.03)",
                opacity: 0.7,
                filter: "drop-shadow(-4px 4px 16px rgba(255,255,255,0.5))",
                animationTimingFunction: "linear",
              },
              "65%": {
                transform: "rotateY(360deg) scale(1)",
                opacity: 1,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                animationTimingFunction: "ease-out",
              },
              "100%": {
                transform: "rotateY(360deg) scale(1)",
                opacity: 1,
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
              },
            },
            "@keyframes pageFlipFast": {
              "0%": {
                transform: "rotateY(0deg) scale(1.1)",
                opacity: 1,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))",
                animationTimingFunction: "ease-out",
              },
              "15%": {
                transform: "rotateY(90deg) scale(1.15)",
                opacity: 0.6,
                filter: "drop-shadow(5px 5px 20px rgba(255,255,255,0.7))",
                animationTimingFunction: "linear",
              },
              "25%": {
                transform: "rotateY(180deg) scale(1.1)",
                opacity: 0.8,
                filter: "drop-shadow(0 0 16px rgba(255,255,255,0.6))",
                animationTimingFunction: "ease-out",
              },
              "40%": {
                transform: "rotateY(180deg) scale(1.1)",
                opacity: 0.8,
                filter: "drop-shadow(0 0 16px rgba(255,255,255,0.6))",
                animationTimingFunction: "ease-in",
              },
              "55%": {
                transform: "rotateY(270deg) scale(1.15)",
                opacity: 0.6,
                filter: "drop-shadow(-5px 5px 20px rgba(255,255,255,0.7))",
                animationTimingFunction: "linear",
              },
              "65%": {
                transform: "rotateY(360deg) scale(1.1)",
                opacity: 1,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))",
                animationTimingFunction: "ease-out",
              },
              "100%": {
                transform: "rotateY(360deg) scale(1.1)",
                opacity: 1,
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))",
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
    </Box>
  );
};

export default BookTrackerLayout;
