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
  LinearProgress
} from '@mui/material';
import {
  Add as AddIcon,
  BookmarkBorder as WishlistIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { useBooks } from '../contexts/BookContext';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';

const WishlistPage = () => {
  const { getBooksByStatus, BOOK_STATUS } = useBooks();
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookOpen, setEditBookOpen] = useState(false);

  const wishlistBooks = getBooksByStatus(BOOK_STATUS.WISHLIST);

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

  // Get some stats for the wishlist
  const totalPages = wishlistBooks.reduce((sum, book) => sum + (book.pageCount || 0), 0);
  const booksWithPages = wishlistBooks.filter(book => book.pageCount > 0).length;
  const avgPages = booksWithPages > 0 ? Math.round(totalPages / booksWithPages) : 0;

  // Group books by category if available
  const booksByCategory = wishlistBooks.reduce((acc, book) => {
    if (book.categories && book.categories.length > 0) {
      book.categories.forEach(category => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(book);
      });
    } else {
      if (!acc['Uncategorized']) {
        acc['Uncategorized'] = [];
      }
      acc['Uncategorized'].push(book);
    }
    return acc;
  }, {});

  const categories = Object.keys(booksByCategory);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            <WishlistIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            My Wishlist
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Books you want to read
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

      {/* Stats Cards */}
      {wishlistBooks.length > 0 && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {wishlistBooks.length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Books to Read
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {totalPages.toLocaleString()}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Total Pages
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  {avgPages}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Avg Pages/Book
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Empty State */}
      {wishlistBooks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <WishlistIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Start adding books you want to read to build your reading wishlist!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleAddBook}
            sx={{ mt: 2 }}
          >
            Add Your First Book
          </Button>
        </Paper>
      ) : (
        <>
          {/* Reading Challenge Motivation */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              📚 Reading Challenge
            </Typography>
            <Typography variant="body2">
              You have {wishlistBooks.length} books on your wishlist with an estimated {totalPages.toLocaleString()} pages.
              {totalPages > 0 && (
                <> At 1 page per day, you could finish all these books in {Math.ceil(totalPages / 365)} years!</>
              )}
            </Typography>
          </Alert>

          {/* Books organized by category */}
          {categories.length > 1 ? (
            categories.map(category => (
              <Box key={category} mb={4}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'semibold', mb: 2 }}>
                  {category} ({booksByCategory[category].length})
                </Typography>
                <Grid container spacing={3}>
                  {booksByCategory[category].map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                      <BookCard
                        book={book}
                        onEdit={handleEditBook}
                        onView={handleViewBook}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))
          ) : (
            <Grid container spacing={3}>
              {wishlistBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                  <BookCard
                    book={book}
                    onEdit={handleEditBook}
                    onView={handleViewBook}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Quick Tips */}
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              💡 Wishlist Tips
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Organize your wishlist by adding categories or genres to your books
              <br />
              • Rate books you're interested in to help prioritize your reading
              <br />
              • Add notes about why you want to read each book
              <br />
              • Use the search feature to find books by your favorite authors
            </Typography>
          </Paper>
        </>
      )}



      {/* Add Book Dialog */}
      <BookForm
        open={addBookOpen}
        onClose={() => setAddBookOpen(false)}
        mode="add"
        initialStatus={BOOK_STATUS.WISHLIST}
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

export default WishlistPage;
