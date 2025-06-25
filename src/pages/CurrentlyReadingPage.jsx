import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Slider,
} from "@mui/material";
import {
  Add as AddIcon,
  MenuBook as ReadingIcon,
  Update as UpdateIcon,
  TrendingUp as ProgressIcon,
  Timer as TimerIcon,
  Description as PagesIcon,
  Schedule as RemainingIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

const CurrentlyReadingPage = () => {
  const { getBooksByStatus, updateBook, BOOK_STATUS } = useBooks();
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [progressBook, setProgressBook] = useState(null);
  const [newProgress, setNewProgress] = useState(0);

  const currentlyReadingBooks = getBooksByStatus(BOOK_STATUS.CURRENTLY_READING);

  const handleAddBook = () => {
    setAddBookOpen(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditBookOpen(true);
  };

  const handleViewBook = (book) => {
    // TODO: Implement book detail view
    console.log("View book:", book);
  };

  const handleUpdateProgress = (book) => {
    setProgressBook(book);
    setNewProgress(book.progress || 0);
    setProgressDialogOpen(true);
  };

  const saveProgress = () => {
    if (progressBook) {
      const updates = { progress: newProgress };

      // If progress reaches 100%, move to finished
      if (newProgress >= 100) {
        updates.status = BOOK_STATUS.FINISHED;
        updates.dateFinished = new Date().toISOString();
        updates.dateRead = new Date().toISOString(); // For compatibility
        // Set current year if yearRead is not already set
        if (!progressBook.yearRead) {
          updates.yearRead = new Date().getFullYear().toString();
        }
      }

      updateBook(progressBook.id, updates);
    }
    setProgressDialogOpen(false);
    setProgressBook(null);
  };

  // Calculate reading statistics
  const totalPages = currentlyReadingBooks.reduce(
    (sum, book) => sum + (book.pageCount || 0),
    0,
  );
  const totalProgress = currentlyReadingBooks.reduce(
    (sum, book) => sum + (book.progress || 0),
    0,
  );
  const avgProgress =
    currentlyReadingBooks.length > 0
      ? totalProgress / currentlyReadingBooks.length
      : 0;
  const pagesRead = currentlyReadingBooks.reduce((sum, book) => {
    const pages = book.pageCount || 0;
    const progress = book.progress || 0;
    return sum + Math.round((pages * progress) / 100);
  }, 0);
  const pagesRemaining = totalPages - pagesRead;

  // Group books by progress ranges
  const progressGroups = {
    "Just Started (0-25%)": currentlyReadingBooks.filter(
      (book) => (book.progress || 0) <= 25,
    ),
    "Making Progress (26-50%)": currentlyReadingBooks.filter(
      (book) => (book.progress || 0) > 25 && (book.progress || 0) <= 50,
    ),
    "Halfway There (51-75%)": currentlyReadingBooks.filter(
      (book) => (book.progress || 0) > 50 && (book.progress || 0) <= 75,
    ),
    "Almost Done (76-99%)": currentlyReadingBooks.filter(
      (book) => (book.progress || 0) > 75 && (book.progress || 0) < 100,
    ),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5, px: 2 }}>
        <Typography
          variant="h2"
          component="h1"
          className="text-gradient"
          sx={{
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Currently Reading
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 300 }}
        >
          Track your reading progress
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleAddBook}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Add Book
        </Button>
      </Box>

      {/* Reading Stats */}
      {currentlyReadingBooks.length > 0 && (
        <Grid container spacing={3} mb={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              className="card-hover-effect"
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>
                  <ReadingIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {currentlyReadingBooks.length}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Books in Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              className="card-hover-effect"
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: "success.main", mb: 2 }}>
                  <ProgressIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {Math.round(avgProgress)}%
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Average Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              className="card-hover-effect"
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: "info.main", mb: 2 }}>
                  <PagesIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {pagesRead.toLocaleString()}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Pages Read
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              className="card-hover-effect"
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box sx={{ color: "warning.main", mb: 2 }}>
                  <RemainingIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {pagesRemaining.toLocaleString()}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Pages Remaining
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Overall Progress */}
      {currentlyReadingBooks.length > 0 && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <ProgressIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: "semibold" }}>
              Overall Reading Progress
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            You've read {pagesRead.toLocaleString()} out of{" "}
            {totalPages.toLocaleString()} total pages (
            {Math.round((pagesRead / totalPages) * 100)}% complete)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pagesRead / totalPages) * 100}
            sx={{ height: 12, borderRadius: 6, mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Average progress: {Math.round(avgProgress)}% across{" "}
            {currentlyReadingBooks.length} books
          </Typography>
        </Paper>
      )}

      {/* Empty State */}
      {currentlyReadingBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <ReadingIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No books currently being read
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Start reading a book from your wishlist or add a new book to begin
            tracking your progress!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {currentlyReadingBooks.map((book) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
              <Box>
                <BookCard
                  book={book}
                  onEdit={handleEditBook}
                  onView={handleViewBook}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  startIcon={<UpdateIcon />}
                  onClick={() => handleUpdateProgress(book)}
                  sx={{ mt: 1 }}
                >
                  Update Progress
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Progress Update Dialog */}
      <Dialog
        open={progressDialogOpen}
        onClose={() => setProgressDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Update Reading Progress
          {progressBook && (
            <Typography variant="subtitle1" color="text.secondary">
              {progressBook.title}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Progress: {newProgress}%
            </Typography>
            <Slider
              value={newProgress}
              onChange={(e, value) => setNewProgress(value)}
              min={0}
              max={100}
              marks={[
                { value: 0, label: "0%" },
                { value: 25, label: "25%" },
                { value: 50, label: "50%" },
                { value: 75, label: "75%" },
                { value: 100, label: "100%" },
              ]}
              sx={{ mt: 2, mb: 2 }}
            />
            {progressBook && progressBook.pageCount && (
              <Typography variant="body2" color="text.secondary">
                Pages read:{" "}
                {Math.round((progressBook.pageCount * newProgress) / 100)} of{" "}
                {progressBook.pageCount}
              </Typography>
            )}
            {newProgress >= 100 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                🎉 Congratulations! This book will be moved to your "Finished"
                collection.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgressDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={saveProgress} variant="contained">
            Update Progress
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Book Dialog */}
      <BookForm
        open={addBookOpen}
        onClose={() => setAddBookOpen(false)}
        mode="add"
        initialStatus={BOOK_STATUS.CURRENTLY_READING}
      />

      {/* Edit Book Dialog */}
      <BookForm
        open={editBookOpen}
        onClose={() => {
          setEditBookOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        mode="edit"
      />
    </Container>
  );
};

export default CurrentlyReadingPage;
