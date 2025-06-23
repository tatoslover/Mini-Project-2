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
  LinearProgress,
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
  Book as BookIcon,
  BookmarkBorder as WishlistIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
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
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import BookForm from "../components/BookForm";

const BookTrackerHome = () => {
  const navigate = useNavigate();
  const { books, getBookStats, getBooksByStatus, BOOK_STATUS } = useBooks();
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

  const stats = getBookStats();
  const currentlyReading = getBooksByStatus(BOOK_STATUS.CURRENTLY_READING);

  // Calculate reading progress for currently reading books
  const avgProgress =
    currentlyReading.length > 0
      ? currentlyReading.reduce((sum, book) => sum + (book.progress || 0), 0) /
        currentlyReading.length
      : 0;

  // Calculate reading goal progress (assuming 12 books per year)
  const yearlyGoal = 12;
  const finishedThisYear = books.filter((book) => {
    if (!book.dateFinished) return false;
    const finishedDate = new Date(book.dateFinished);
    const currentYear = new Date().getFullYear();
    return finishedDate.getFullYear() === currentYear;
  }).length;

  const goalProgress = (finishedThisYear / yearlyGoal) * 100;

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

  const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
    <Card
      sx={{
        height: "100%",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { boxShadow: 3 } : {},
        transition: "all 0.3s ease",
        borderRadius: "15px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClick}
      className="card-hover-effect"
    >
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Box sx={{ color: color, mb: 2 }}>{icon}</Box>
        <Typography variant="h3" component="div" className="stat-value">
          {value}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

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
          }}
        >
          Personal Reading Tracker
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
            sx={{ backgroundColor: "#ffc107", color: "black" }}
          />
          <Chip
            label="Responsive Design"
            sx={{ backgroundColor: "#28a745", color: "white" }}
          />
        </Box>
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 300 }}>
                A comprehensive reading management application built with React,
                showcasing personal book collections with advanced tracking and
                progress monitoring tools.
              </Typography>
              <Typography sx={{ mb: 4 }}>
                This project demonstrates modern front-end development skills
                including React hooks, context management, Material-UI
                components, and responsive design principles.
              </Typography>

              {/* Quick Stats Grid */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <StatCard
                    title="Total Books"
                    value={stats.total}
                    icon={<BookIcon sx={{ fontSize: 40 }} />}
                    color="primary.main"
                    onClick={() => navigate("/book-tracker/books")}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard
                    title="Wishlist"
                    value={stats.wishlist}
                    icon={<WishlistIcon sx={{ fontSize: 40 }} />}
                    color="secondary.main"
                    onClick={() => navigate("/book-tracker/wishlist")}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard
                    title="Reading"
                    value={stats.currentlyReading}
                    icon={<ReadingIcon sx={{ fontSize: 40 }} />}
                    color="warning.main"
                    onClick={() => navigate("/book-tracker/currently-reading")}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatCard
                    title="Finished"
                    value={stats.finished}
                    icon={<FinishedIcon sx={{ fontSize: 40 }} />}
                    color="success.main"
                    onClick={() => navigate("/book-tracker/finished")}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  p: 3,
                  backgroundColor: "grey.50",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                  "A reader lives a thousand lives before he dies... The man who
                  never reads lives only one."
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ArchIcon />
                    Personal Goals
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Track reading progress and habits" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Organize personal book collections" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Set and monitor reading goals" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Discover patterns in reading preferences" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TrendingIcon />
                    Technical Goals
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Demonstrate React development skills" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Implement context-based state management" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Create responsive user interfaces" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Apply modern design principles" />
                    </ListItem>
                  </List>
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
              <Typography variant="h6" sx={{ mb: 3 }}>
                Data Storage & Structure
              </Typography>
              <Typography sx={{ mb: 3 }}>
                The application uses browser localStorage for persistent data
                storage, ensuring your reading data is saved locally and remains
                private.
              </Typography>

              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Storage Method</strong>
                      </TableCell>
                      <TableCell>Browser localStorage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Data Format</strong>
                      </TableCell>
                      <TableCell>JSON</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Book Fields</strong>
                      </TableCell>
                      <TableCell>
                        Title, Author, Genre, Status, Progress, Dates
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Status Types</strong>
                      </TableCell>
                      <TableCell>
                        Wishlist, Currently Reading, Finished
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Reading Progress */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Current Reading Progress
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Average Progress: {Math.round(avgProgress)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={avgProgress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Yearly Goal: {finishedThisYear}/{yearlyGoal} books
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(goalProgress, 100)}
                    sx={{ height: 8, borderRadius: 4 }}
                    color={goalProgress >= 100 ? "success" : "primary"}
                  />
                </Box>
              </Box>
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
                      p: 3,
                      height: "100%",
                      backgroundColor: "primary.light",
                      color: "white",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      📚 Book Management
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Add, edit, and delete books" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Categorize by reading status" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Track reading progress" />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 3,
                      height: "100%",
                      backgroundColor: "secondary.light",
                      color: "white",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      📊 Analytics
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Reading statistics overview" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Progress tracking" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Goal monitoring" />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 3,
                      height: "100%",
                      backgroundColor: "success.light",
                      color: "white",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      🎨 User Experience
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Dark/Light theme toggle" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Responsive design" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Smooth animations" />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card
                    sx={{
                      p: 3,
                      height: "100%",
                      backgroundColor: "warning.light",
                      color: "white",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      💾 Data Persistence
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Local storage integration" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Automatic data saving" />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Import/Export capabilities" />
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
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Architecture & Design Patterns
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Context API for State Management"
                      secondary="Centralized book data management using React Context"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Component-Based Architecture"
                      secondary="Modular, reusable components following React best practices"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Responsive Design"
                      secondary="Mobile-first approach with Material-UI breakpoints"
                    />
                  </ListItem>
                </List>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Technology Stack
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Frontend
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="React 18+" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Material-UI v5" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="React Router v6" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="JavaScript ES6+" />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      Tools & Build
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Vite" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="ESLint" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="LocalStorage API" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="CSS-in-JS" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
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
              <Typography variant="h6" sx={{ mb: 3 }}>
                Getting Started
              </Typography>

              <Box sx={{ mb: 3 }}>
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

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  Step-by-Step Guide
                </Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  <Typography component="li" sx={{ mb: 1 }}>
                    <strong>Add Books:</strong> Use the "Add Book" button to
                    create entries for books you want to track
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    <strong>Set Status:</strong> Categorize books as Wishlist,
                    Currently Reading, or Finished
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    <strong>Track Progress:</strong> Update reading progress for
                    current books
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    <strong>Navigate:</strong> Use the top navigation to view
                    different book categories
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    <strong>Monitor:</strong> Check your about page for reading
                    statistics and progress
                  </Typography>
                </Box>
              </Box>
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
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  How is my data stored?
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  All your book data is stored locally in your browser's
                  localStorage. This means your data stays private and is
                  available offline, but only on the device you're using.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Can I export my book data?
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Yes! The application includes export functionality to download
                  your book collection as a JSON file, which you can then import
                  on another device or keep as a backup.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Is this application mobile-friendly?
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Absolutely! The application is built with a mobile-first
                  approach and uses responsive design principles to ensure a
                  great experience on all device sizes.
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Can I set reading goals?
                </Typography>
                <Typography>
                  The application tracks your yearly reading progress with a
                  default goal of 12 books per year. You can monitor your
                  progress toward this goal on the about page.
                </Typography>
              </Box>
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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
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
