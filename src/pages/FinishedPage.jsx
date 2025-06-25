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
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  CheckCircle as FinishedIcon,
  Star as StarIcon,
  RateReview as ReviewIcon,
  Timeline as StatsIcon,
  Today as CalendarIcon,
  Description as PagesIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

const FinishedPage = () => {
  const { getBooksByStatus, updateBook, BOOK_STATUS } = useBooks();
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingBook, setRatingBook] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  const finishedBooks = getBooksByStatus(BOOK_STATUS.FINISHED);

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

  const handleRateBook = (book) => {
    setRatingBook(book);
    setNewRating(book.rating || 0);
    setNewReview(book.notes || "");
    setRatingDialogOpen(true);
  };

  const saveRating = () => {
    if (ratingBook) {
      updateBook(ratingBook.id, {
        rating: newRating,
        notes: newReview,
      });
    }
    setRatingDialogOpen(false);
    setRatingBook(null);
    setNewRating(0);
    setNewReview("");
  };

  // Calculate reading statistics
  const totalBooks = finishedBooks.length;
  const totalPages = finishedBooks.reduce(
    (sum, book) => sum + (book.pageCount || 0),
    0,
  );
  const ratedBooks = finishedBooks.filter((book) => book.rating > 0);
  const avgRating =
    ratedBooks.length > 0
      ? ratedBooks.reduce((sum, book) => sum + book.rating, 0) /
        ratedBooks.length
      : 0;

  // Get books finished this year
  const currentYear = new Date().getFullYear();
  const booksThisYear = finishedBooks.filter((book) => {
    if (!book.dateFinished) return false;
    return new Date(book.dateFinished).getFullYear() === currentYear;
  });

  // Group books by rating
  const ratingGroups = {
    "5 Stars": finishedBooks.filter((book) => book.rating === 5),
    "4 Stars": finishedBooks.filter((book) => book.rating === 4),
    "3 Stars": finishedBooks.filter((book) => book.rating === 3),
    "2 Stars": finishedBooks.filter((book) => book.rating === 2),
    "1 Star": finishedBooks.filter((book) => book.rating === 1),
    Unrated: finishedBooks.filter((book) => !book.rating || book.rating === 0),
  };

  // Get recently finished books
  const recentlyFinished = finishedBooks
    .filter((book) => book.dateFinished)
    .sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished))
    .slice(0, 5);

  // Get top rated books
  const topRated = finishedBooks
    .filter((book) => book.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

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
          Finished Books
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 300 }}
        >
          Your reading accomplishments
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
      {finishedBooks.length > 0 && (
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
                <Box sx={{ color: "success.main", mb: 2 }}>
                  <FinishedIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {totalBooks}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Books Finished
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
                  <StarIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {avgRating.toFixed(1)}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Average Rating
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
                  {totalPages.toLocaleString()}
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
                <Box sx={{ color: "secondary.main", mb: 2 }}>
                  <CalendarIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {booksThisYear.length}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  This Year
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Empty State */}
      {finishedBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <FinishedIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No finished books yet
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Complete your first book to start building your reading
            achievements!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleAddBook}
            sx={{ mt: 2 }}
          >
            Add a Finished Book
          </Button>
        </Paper>
      ) : (
        <>
          {/* Achievement Banner */}
          <Grid container spacing={2} justifyContent="center">
            {finishedBooks.map((book) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
                <BookCard
                  book={book}
                  onEdit={handleEditBook}
                  onView={handleViewBook}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Rating Dialog */}
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Rate & Review Book
          {ratingBook && (
            <Typography variant="subtitle1" color="text.secondary">
              {ratingBook.title}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Your Rating:
            </Typography>
            <Rating
              value={newRating}
              onChange={(event, newValue) => setNewRating(newValue || 0)}
              size="large"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Your Review (Optional)"
              multiline
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="What did you think of this book? Share your thoughts..."
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRatingDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={saveRating}
            variant="contained"
            disabled={newRating === 0}
          >
            Save Rating
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Book Dialog */}
      <BookForm
        open={addBookOpen}
        onClose={() => setAddBookOpen(false)}
        mode="add"
        initialStatus={BOOK_STATUS.FINISHED}
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

export default FinishedPage;
