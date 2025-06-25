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
} from "@mui/material";
import {
  Add as AddIcon,
  BookmarkBorder as WishlistIcon,
  TrendingUp as TrendingIcon,
  Description as PagesIcon,
  BarChart as StatsIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { BookGridSkeleton } from "../components/BookCardSkeleton";
import { WishlistEmptyState } from "../components/EmptyState";

const WishlistPage = () => {
  const { getBooksByStatus, BOOK_STATUS, loading } = useBooks();
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
    console.log("View book:", book);
  };

  // Get some stats for the wishlist
  const totalPages = wishlistBooks.reduce(
    (sum, book) => sum + (book.pageCount || 0),
    0,
  );
  const booksWithPages = wishlistBooks.filter(
    (book) => book.pageCount > 0,
  ).length;
  const avgPages =
    booksWithPages > 0 ? Math.round(totalPages / booksWithPages) : 0;

  // Group books by category if available
  const booksByCategory = wishlistBooks.reduce((acc, book) => {
    if (book.categories && book.categories.length > 0) {
      book.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(book);
      });
    } else {
      if (!acc["Uncategorized"]) {
        acc["Uncategorized"] = [];
      }
      acc["Uncategorized"].push(book);
    }
    return acc;
  }, {});

  const categories = Object.keys(booksByCategory);

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
          Wishlist
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 300 }}
        >
          Books you want to read
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

      {/* Stats Cards */}
      {wishlistBooks.length > 0 && (
        <Grid container spacing={3} mb={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
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
                  <WishlistIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {wishlistBooks.length}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Books to Read
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
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
                  Total Pages
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
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
                  <StatsIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
                  {avgPages}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
                  Avg Pages/Book
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Loading State */}
      {loading && <BookGridSkeleton count={8} />}

      {/* Empty State */}
      {!loading && wishlistBooks.length === 0 ? (
        <WishlistEmptyState />
      ) : (
        !loading && (
          <Grid container spacing={2} justifyContent="center">
            {wishlistBooks.map((book) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
                <BookCard
                  book={book}
                  onEdit={handleEditBook}
                  onView={handleViewBook}
                />
              </Grid>
            ))}
          </Grid>
        )
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
