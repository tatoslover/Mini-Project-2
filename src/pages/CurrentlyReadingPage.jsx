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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Slider
} from '@mui/material';
import {
  Add as AddIcon,
  MenuBook as ReadingIcon,
  Update as UpdateIcon,
  TrendingUp as ProgressIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';

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
    console.log('View book:', book);
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
      }

      updateBook(progressBook.id, updates);
    }
    setProgressDialogOpen(false);
    setProgressBook(null);
  };

  // Calculate reading statistics
  const totalPages = currentlyReadingBooks.reduce((sum, book) => sum + (book.pageCount || 0), 0);
  const totalProgress = currentlyReadingBooks.reduce((sum, book) => sum + (book.progress || 0), 0);
  const avgProgress = currentlyReadingBooks.length > 0 ? totalProgress / currentlyReadingBooks.length : 0;
  const pagesRead = currentlyReadingBooks.reduce((sum, book) => {
    const pages = book.pageCount || 0;
    const progress = book.progress || 0;
    return sum + Math.round((pages * progress) / 100);
  }, 0);
  const pagesRemaining = totalPages - pagesRead;

  // Group books by progress ranges
  const progressGroups = {
    'Just Started (0-25%)': currentlyReadingBooks.filter(book => (book.progress || 0) <= 25),
    'Making Progress (26-50%)': currentlyReadingBooks.filter(book => (book.progress || 0) > 25 && (book.progress || 0) <= 50),
    'Halfway There (51-75%)': currentlyReadingBooks.filter(book => (book.progress || 0) > 50 && (book.progress || 0) <= 75),
    'Almost Done (76-99%)': currentlyReadingBooks.filter(book => (book.progress || 0) > 75 && (book.progress || 0) < 100)
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <ReadingIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Currently Reading
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track your reading progress
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
      {currentlyReadingBooks.length > 0 && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {currentlyReadingBooks.length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Books in Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {Math.round(avgProgress)}%
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Average Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {pagesRead.toLocaleString()}
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
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {pagesRemaining.toLocaleString()}
                </Typography>
                <Typography variant="h6" color="text.secondary">
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
            <Typography variant="h5" sx={{ fontWeight: 'semibold' }}>
              Overall Reading Progress
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            You've read {pagesRead.toLocaleString()} out of {totalPages.toLocaleString()} total pages ({Math.round((pagesRead / totalPages) * 100)}% complete)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pagesRead / totalPages) * 100}
            sx={{ height: 12, borderRadius: 6, mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Average progress: {Math.round(avgProgress)}% across {currentlyReadingBooks.length} books
          </Typography>
        </Paper>
      )}

      {/* Empty State */}
      {currentlyReadingBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ReadingIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No books currently being read
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Start reading a book from your wishlist or add a new book to begin tracking your progress!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleAddBook}
            sx={{ mt: 2 }}
          >
            Start Reading a Book
          </Button>
        </Paper>
      ) : (
        <>
          {/* Reading Motivation */}
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              🎯 Keep up the great work!
            </Typography>
            <Typography variant="body2">
              You're actively reading {currentlyReadingBooks.length} books.
              {pagesRemaining > 0 && (
                <> At just 10 pages per day, you could finish all your current books in {Math.ceil(pagesRemaining / 10)} days!</>
              )}
            </Typography>
          </Alert>

          {/* Books grouped by progress */}
          {Object.entries(progressGroups).map(([groupName, books]) => (
            books.length > 0 && (
              <Box key={groupName} mb={4}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'semibold', mb: 2 }}>
                  {groupName} ({books.length})
                </Typography>
                <Grid container spacing={3}>
                  {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                      <Box>
                        <BookCard
                          book={book}
                          onEdit={handleEditBook}
                          onView={handleViewBook}
                        />
                        <Button
                          variant="outlined"
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
              </Box>
            )
          ))}

          {/* Reading Tips */}
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              📖 Reading Tips
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Set small daily reading goals (even 10-15 pages makes a difference!)
              <br />
              • Update your progress regularly to stay motivated
              <br />
              • Don't be afraid to pause a book if you're not enjoying it
              <br />
              • Consider alternating between different genres to stay engaged
              <br />
              • Use bookmarks or notes to remember important parts
            </Typography>
          </Paper>
        </>
      )}

      {/* Progress Update Dialog */}
      <Dialog open={progressDialogOpen} onClose={() => setProgressDialogOpen(false)} maxWidth="sm" fullWidth>
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
                { value: 0, label: '0%' },
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
                { value: 100, label: '100%' }
              ]}
              sx={{ mt: 2, mb: 2 }}
            />
            {progressBook && progressBook.pageCount && (
              <Typography variant="body2" color="text.secondary">
                Pages read: {Math.round((progressBook.pageCount * newProgress) / 100)} of {progressBook.pageCount}
              </Typography>
            )}
            {newProgress >= 100 && (
              <Alert severity="success" sx={{ mt: 2 }}>
                🎉 Congratulations! This book will be moved to your "Finished" collection.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgressDialogOpen(false)}>Cancel</Button>
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
