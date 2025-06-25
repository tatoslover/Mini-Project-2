import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Paper,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  TrendingUp as TrendingIcon,
  Add as AddIcon,
  Info as InfoIcon,
  Visibility as OverviewIcon,
  GpsFixed as PurposeIcon,
  Storage as DataIcon,
  Star as FeaturesIcon,
  Code as TechnicalIcon,
  PlayArrow as UsageIcon,
  HelpOutline as QAIcon,
  Architecture as ArchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import BookForm from "../components/BookForm";
import ReadingGoal from "../components/ReadingGoal";

const BookTrackerHome = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    overview: false,
    purpose: false,
    data: false,
    features: false,
    technical: false,
    usage: false,
    qa: false,
  });

  const handleAddBook = () => {
    setAddBookOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Box className="fade-in">
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 5, px: 2 }}>
        <Typography
          variant="h2"
          component="h1"
          className="text-gradient"
          sx={{
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          BookTracker
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 300 }}
        >
          Track your personal reading journey through advanced book management
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Chip
            label="React"
            sx={{ backgroundColor: "#61dafb", color: "white" }}
          />
          <Chip
            label="Material-UI"
            sx={{ backgroundColor: "#0081cb", color: "white" }}
          />
          <Chip
            label="Local Storage"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
          />
          <Chip
            label="Responsive Design"
            sx={{ backgroundColor: "#28a745", color: "white" }}
          />
        </Box>
      </Box>

      {/* Reading Goal Section */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", mb: 4 }}>
        <ReadingGoal compact />
      </Box>

      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Overview Section */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("overview")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <OverviewIcon />
              Overview
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.overview ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.overview}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 300, color: "text.primary" }}>
                A comprehensive reading management application built with React,
                showcasing personal book collections with advanced tracking and
                progress monitoring tools.
              </Typography>
              <Typography sx={{ mb: 4, color: "text.primary", fontWeight: 500 }}>
                This project demonstrates modern front-end development skills
                including React hooks, context management, Material-UI
                components, and responsive design principles.
              </Typography>

              <Box
                sx={{
                  p: 3,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                  borderRadius: 2,
                  textAlign: "center",
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    color: "text.primary",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                >
                  "A reader lives a thousand lives before he dies... The man who
                  never reads lives only one."
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  - George R.R. Martin
                </Typography>
              </Box>
            </CardContent>
          </Collapse>
        </Card>

        {/* Purpose Section */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("purpose")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PurposeIcon />
              Purpose
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.purpose ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.purpose}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📖 Personal Goals
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Track reading progress and habits"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Organize personal book collections"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Set and monitor reading goals"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Discover patterns in reading preferences"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ab47bc 0%, #9c27b0 50%, #8e24aa 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(171, 71, 188, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(171, 71, 188, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      💻 Technical Goals
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Demonstrate React development skills"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Implement context-based state management"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Create responsive user interfaces"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Apply modern design principles"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* Data Section */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("data")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <DataIcon />
              Data
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.data ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.data}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, textAlign: "center", color: "text.primary", fontWeight: 600 }}>
                Data Storage & Structure
              </Typography>
              <Typography sx={{ mb: 4, textAlign: "center", color: "text.primary", fontWeight: 500 }}>
                The application uses browser localStorage for persistent data
                storage, ensuring your reading data is saved locally and remains
                private.
              </Typography>

              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ba68c8 0%, #ab47bc 50%, #9c27b0 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(186, 104, 200, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(186, 104, 200, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🗄️ Storage Details
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Storage Method"
                          secondary="Browser localStorage"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: { color: "rgba(255,255,255,0.8)", fontSize: "1rem" },
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Data Format"
                          secondary="JSON"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: { color: "rgba(255,255,255,0.8)", fontSize: "1rem" },
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 50%, #4a148c 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(106, 27, 154, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(106, 27, 154, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📋 Data Structure
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Book Fields"
                          secondary="Title, Author, Genre, Status, Progress, Dates"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: { color: "rgba(255,255,255,0.8)", fontSize: "1rem" },
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Status Types"
                          secondary="Wishlist, Currently Reading, Finished"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                          secondaryTypographyProps={{
                            sx: { color: "rgba(255,255,255,0.8)", fontSize: "1rem" },
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* Features Section */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("features")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FeaturesIcon />
              Features
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.features ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.features}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📚 Book Management
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Add, edit, and delete books"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Categorize by reading status"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Track reading progress"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ab47bc 0%, #9c27b0 50%, #8e24aa 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(171, 71, 188, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(171, 71, 188, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📊 Analytics
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Reading statistics overview"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Progress tracking"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Goal monitoring"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ba68c8 0%, #ab47bc 50%, #9c27b0 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(186, 104, 200, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(186, 104, 200, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🎨 User Experience
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Dark/Light theme toggle"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Responsive design"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Smooth animations"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 50%, #4a148c 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(106, 27, 154, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(106, 27, 154, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      💾 Data Persistence
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Local storage integration"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Automatic data saving"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Import/Export capabilities"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* Technical Details */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("technical")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <TechnicalIcon />
              Technical Details
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.technical ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.technical}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🏗️ Architecture
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Context API for State Management"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Component-Based Architecture"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Responsive Design Patterns"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ab47bc 0%, #9c27b0 50%, #8e24aa 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(171, 71, 188, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(171, 71, 188, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      ⚛️ Frontend Stack
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="React 19+"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Material-UI v5"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="React Router v7+"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="JavaScript ES6+"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ba68c8 0%, #ab47bc 50%, #9c27b0 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(186, 104, 200, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(186, 104, 200, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🔧 Tools & Build
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Vite"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="ESLint"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="LocalStorage API"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="CSS-in-JS"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* Usage Guide */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("usage")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <UsageIcon />
              How to Use
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.usage ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.usage}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, textAlign: "center", color: "text.primary", fontWeight: 600 }}>
                Getting Started
              </Typography>

              <Box sx={{ mb: 4, textAlign: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddBook}
                  sx={{ mb: 2 }}
                >
                  Add Your First Book
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Click the button above to start building your personal library
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📖 Basic Operations
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Add Books: Use the 'Add Book' button to create entries"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Set Status: Categorize as Wishlist, Reading, or Finished"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Track Progress: Update reading progress for current books"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ab47bc 0%, #9c27b0 50%, #8e24aa 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(171, 71, 188, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(171, 71, 188, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🧭 Navigation & Monitoring
                    </Typography>
                    <List sx={{ "& .MuiListItem-root": { py: 0.8 } }}>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Navigate: Use top navigation to view different categories"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Monitor: Check Library page for reading statistics"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ py: 0.8 }}>
                        <ListItemText
                          primary="Export: Download your data as JSON for backup"
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                            }
                          }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* Q&A Section */}
        <Card
          sx={{ mb: 4, borderRadius: "15px" }}
          className="card-hover-effect"
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": { backgroundColor: "primary.dark" },
              transition: "background-color 0.2s ease",
            }}
            onClick={() => toggleSection("qa")}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <QAIcon />
              Frequently Asked Questions
            </Typography>
            <IconButton sx={{ color: "white" }}>
              {expandedSections.qa ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expandedSections.qa}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/* Design & Features */}
                <Grid item lg={8} md={10} sm={12} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #9c27b0 0%, #8e24aa 50%, #7b1fa2 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(156, 39, 176, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🎨 Design & Features
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Requirements & Design Process:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontSize: "0.85rem" }}
                    >
                      User-centered approach identifying personal pain points in
                      reading habit tracking, with intuitive navigation and
                      real-time progress visualization.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Key Features:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      Comprehensive book management, status categorization,
                      progress tracking, search/filtering, statistics, and data
                      export.
                    </Typography>
                  </Card>
                </Grid>

                {/* Data & Processing */}
                <Grid item lg={8} md={10} sm={12} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ab47bc 0%, #9c27b0 50%, #8e24aa 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(171, 71, 188, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(171, 71, 188, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      📊 Data Processing
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Data Sources:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontSize: "0.85rem" }}
                    >
                      Manual user input + Google Books API for metadata. Stored
                      locally in localStorage for privacy and offline access.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Processing & Display:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      React Context for state management, JavaScript array
                      methods for filtering/sorting, Material-UI for responsive
                      layouts.
                    </Typography>
                  </Card>
                </Grid>

                {/* User Interaction & Code Structure */}
                <Grid item lg={8} md={10} sm={12} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #ba68c8 0%, #ab47bc 50%, #9c27b0 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(186, 104, 200, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(186, 104, 200, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      🔧 Interaction & Structure
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      User Interactions:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontSize: "0.85rem" }}
                    >
                      CRUD operations via forms, progress sliders, navigation,
                      search/filter, statistics viewing, JSON export, responsive
                      touch interfaces.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Code Organization:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      Modular component-based architecture, reusable components,
                      centralized state management, clean separation of
                      concerns.
                    </Typography>
                  </Card>
                </Grid>

                {/* Technology & Future */}
                <Grid item lg={8} md={10} sm={12} xs={12}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      background: "linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 50%, #4a148c 100%)",
                      color: "white",
                      borderRadius: "20px",
                      boxShadow: "0 8px 32px rgba(106, 27, 154, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(106, 27, 154, 0.4)",
                      },
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                      ⚛️ Technology & Future
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      React Hooks Used:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontSize: "0.85rem" }}
                    >
                      useState, useEffect, useContext, useNavigate, useMemo,
                      plus custom hooks (useBooks, useTheme).
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      External Libraries:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2, fontSize: "0.85rem" }}
                    >
                      Material-UI (UI components), React Router (navigation),
                      Vite (build tool), ESLint (code quality).
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Future Extensions:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                      Cloud sync, social features, enhanced analytics,
                      recommendations, reading challenges, e-book integration.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          mt: 8,
          py: 4,
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <TechnicalIcon />
          Built with React, Material-UI, and JavaScript ES6+
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <InfoIcon />
          Institute of Data - Mini Project 2 - 2025
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<OverviewIcon />}
          onClick={scrollToTop}
          className="back-to-top-button"
          sx={{
            borderRadius: "25px",
            px: 3,
            py: 1,
          }}
        >
          Back to Top
        </Button>
      </Box>

      {/* Book Form Modal */}
      <BookForm open={addBookOpen} onClose={() => setAddBookOpen(false)} />
    </Box>
  );
};

export default BookTrackerHome;
