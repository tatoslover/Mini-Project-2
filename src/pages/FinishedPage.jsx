import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  CheckCircle as FinishedIcon,
  Star as StarIcon,
  RateReview as ReviewIcon,
  Timeline as StatsIcon,
  Today as CalendarIcon
} from '@mui/icons-material';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';

const FinishedPage = () => {
  const { getBooksByStatus, updateBook, BOOK_STATUS } = useBooks();
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [ratingBook, setRatingBook] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');

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
    console.log('View book:', book);
  };

  const handleRateBook = (book) => {
    setRatingBook(book);
    setNewRating(book.rating || 0);
    setNewReview(book.notes || '');
    setRatingDialogOpen(true);
  };

  const saveRating = () => {
    if (ratingBook) {
      updateBook(ratingBook.id, {
        rating: newRating,
        notes: newReview
      });
    }
    setRatingDialogOpen(false);
    setRatingBook(null);
    setNewRating(0);
    setNewReview('');
  };

  // Calculate reading statistics
  const totalBooks = finishedBooks.length;
  const totalPages = finishedBooks.reduce((sum, book) => sum + (book.pageCount || 0), 0);
  const ratedBooks = finishedBooks.filter(book => book.rating > 0);
  const avgRating = ratedBooks.length > 0
    ? ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length
    : 0;

  // Get books finished this year
  const currentYear = new Date().getFullYear();
  const booksThisYear = finishedBooks.filter(book => {
    if (!book.dateFinished) return false;
    return new Date(book.dateFinished).getFullYear() === currentYear;
  });

  // Group books by rating
  const ratingGroups = {
    '5 Stars': finishedBooks.filter(book => book.rating === 5),
    '4 Stars': finishedBooks.filter(book => book.rating === 4),
    '3 Stars': finishedBooks.filter(book => book.rating === 3),
    '2 Stars': finishedBooks.filter(book => book.rating === 2),
    '1 Star': finishedBooks.filter(book => book.rating === 1),
    'Unrated': finishedBooks.filter(book => !book.rating || book.rating === 0)
  };

  // Get recently finished books
  const recentlyFinished = finishedBooks
    .filter(book => book.dateFinished)
    .sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished))
    .slice(0, 5);

  // Get top rated books
  const topRated = finishedBooks
    .filter(book => book.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <FinishedIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Finished Books
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your reading accomplishments
          </Typography>
        </Box>
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
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {totalBooks}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Books Finished
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                    {avgRating.toFixed(1)}
                  </Typography>
                  <StarIcon color="warning" />
                </Box>
                <Typography variant="h6" color="text.secondary">
                  Average Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {totalPages.toLocaleString()}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Pages Read
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {booksThisYear.length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  This Year
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Empty State */}
      {finishedBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <FinishedIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No finished books yet
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Complete your first book to start building your reading achievements!
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
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              🏆 Reading Achievement Unlocked!
            </Typography>
            <Typography variant="body2">
              You've finished {totalBooks} books totaling {totalPages.toLocaleString()} pages!
              {booksThisYear.length > 0 && (
                <> You've completed {booksThisYear.length} books this year - keep up the great work!</>
              )}
            </Typography>
          </Alert>

          {/* Recently Finished */}
          {recentlyFinished.length > 0 && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'semibold', mb: 2 }}>
                Recently Finished
              </Typography>
              <List>
                {recentlyFinished.map((book, index) => (
                  <React.Fragment key={book.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        {book.thumbnail ? (
                          <Avatar
                            src={book.thumbnail}
                            alt={book.title}
                            variant="rounded"
                            sx={{ width: 56, height: 72 }}
                          />
                        ) : (
                          <Avatar variant="rounded" sx={{ width: 56, height: 72 }}>
                            <FinishedIcon />
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                              {book.title}
                            </Typography>
                            {book.rating > 0 && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Rating value={book.rating} size="small" readOnly />
                                <Typography variant="body2" color="text.secondary">
                                  ({book.rating})
                                </Typography>
                              </Box>
                            )}
                            {!book.rating && (
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<StarIcon />}
                                onClick={() => handleRateBook(book)}
                              >
                                Rate
                              </Button>
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              by {book.authors.join(', ')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Finished {new Date(book.dateFinished).toLocaleDateString()}
                            </Typography>
                            {book.notes && (
                              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                                "{book.notes.substring(0, 100)}..."
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentlyFinished.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}

          {/* Top Rated Books */}
          {topRated.length > 0 && (
            <Box mb={4}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'semibold', mb: 2 }}>
                Top Rated Books ({topRated.length})
              </Typography>
              <Grid container spacing={3}>
                {topRated.map((book) => (
                  <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <BookCard
                      book={book}
                      onEdit={handleEditBook}
                      onView={handleViewBook}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Books by Rating */}
          {Object.entries(ratingGroups).map(([rating, books]) => (
            books.length > 0 && (
              <Box key={rating} mb={4}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Typography variant="h5" sx={{ fontWeight: 'semibold' }}>
                    {rating} ({books.length})
                  </Typography>
                  {rating !== 'Unrated' && (
                    <Rating value={parseInt(rating.charAt(0))} size="small" readOnly />
                  )}
                </Box>
                <Grid container spacing={3}>
                  {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                      <Box>
                        <BookCard
                          book={book}
                          onEdit={handleEditBook}
                          onView={handleViewBook}
                        />
                        {rating === 'Unrated' && (
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            startIcon={<StarIcon />}
                            onClick={() => handleRateBook(book)}
                            sx={{ mt: 1 }}
                          >
                            Rate This Book
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          ))}

          {/* Reading Insights */}
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              📊 Reading Insights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • You've read an average of {Math.round(totalPages / totalBooks)} pages per book
              <br />
              • {Math.round((ratedBooks.length / totalBooks) * 100)}% of your finished books have ratings
              <br />
              • Your most common rating is {Object.entries(ratingGroups)
                .filter(([key]) => key !== 'Unrated')
                .sort(([,a], [,b]) => b.length - a.length)[0]?.[0] || 'N/A'}
              <br />
              • You've completed {booksThisYear.length} books this year
              <br />
              • Keep adding reviews to remember what you loved about each book!
            </Typography>
          </Paper>
        </>
      )}

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onClose={() => setRatingDialogOpen(false)} maxWidth="sm" fullWidth>
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
          <Button onClick={() => setRatingDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveRating} variant="contained" disabled={newRating === 0}>
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
