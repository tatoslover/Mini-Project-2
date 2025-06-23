import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  BookmarkBorder as WishlistIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

const AllBooks = () => {
  const { books, BOOK_STATUS } = useBooks();
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editBookOpen, setEditBookOpen] = useState(false);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters
  const [ratingFilter, setRatingFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = [...books];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.authors.some((author) =>
            author.toLowerCase().includes(searchLower),
          ) ||
          book.description?.toLowerCase().includes(searchLower) ||
          book.publisher?.toLowerCase().includes(searchLower),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((book) => book.status === statusFilter);
    }

    // Rating filter
    if (ratingFilter !== "all") {
      if (ratingFilter === "unrated") {
        filtered = filtered.filter((book) => book.rating === 0);
      } else if (ratingFilter === "rated") {
        filtered = filtered.filter((book) => book.rating > 0);
      } else {
        const minRating = parseInt(ratingFilter);
        filtered = filtered.filter((book) => book.rating >= minRating);
      }
    }

    // Author filter
    if (authorFilter) {
      const authorLower = authorFilter.toLowerCase();
      filtered = filtered.filter((book) =>
        book.authors.some((author) =>
          author.toLowerCase().includes(authorLower),
        ),
      );
    }

    // Year filter
    if (yearFilter) {
      filtered = filtered.filter((book) => {
        if (!book.publishedDate) return false;
        const bookYear = new Date(book.publishedDate).getFullYear().toString();
        return bookYear.includes(yearFilter);
      });
    }

    // Sort books
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle special sort cases
      if (sortBy === "authors") {
        aValue = a.authors.join(", ").toLowerCase();
        bValue = b.authors.join(", ").toLowerCase();
      } else if (sortBy === "publishedDate") {
        aValue = new Date(a.publishedDate || "1900-01-01").getTime();
        bValue = new Date(b.publishedDate || "1900-01-01").getTime();
      } else if (sortBy === "dateAdded") {
        aValue = new Date(a.dateAdded || "1900-01-01").getTime();
        bValue = new Date(b.dateAdded || "1900-01-01").getTime();
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    books,
    searchTerm,
    statusFilter,
    sortBy,
    sortOrder,
    ratingFilter,
    authorFilter,
    yearFilter,
  ]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRatingFilter("all");
    setAuthorFilter("");
    setYearFilter("");
    setSortBy("title");
    setSortOrder("asc");
  };

  const getStatusStats = () => {
    const stats = {
      all: books.length,
      [BOOK_STATUS.WISHLIST]: books.filter(
        (b) => b.status === BOOK_STATUS.WISHLIST,
      ).length,
      [BOOK_STATUS.CURRENTLY_READING]: books.filter(
        (b) => b.status === BOOK_STATUS.CURRENTLY_READING,
      ).length,
      [BOOK_STATUS.FINISHED]: books.filter(
        (b) => b.status === BOOK_STATUS.FINISHED,
      ).length,
    };
    return stats;
  };

  const statusStats = getStatusStats();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Library
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your entire book collection
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

      {/* Search and Filter Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search books, authors, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={() => setSearchTerm("")}
                      sx={{ minWidth: "auto", p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All ({statusStats.all})</MenuItem>
                <MenuItem value={BOOK_STATUS.WISHLIST}>
                  Want to Read ({statusStats[BOOK_STATUS.WISHLIST]})
                </MenuItem>
                <MenuItem value={BOOK_STATUS.CURRENTLY_READING}>
                  Currently Reading (
                  {statusStats[BOOK_STATUS.CURRENTLY_READING]})
                </MenuItem>
                <MenuItem value={BOOK_STATUS.FINISHED}>
                  Finished ({statusStats[BOOK_STATUS.FINISHED]})
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort By */}
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
                startAdornment={<SortIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="authors">Author</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="publishedDate">Published Date</MenuItem>
                <MenuItem value="dateAdded">Date Added</MenuItem>
                <MenuItem value="pageCount">Page Count</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Order */}
          <Grid item xs={12} md={2}>
            <ToggleButtonGroup
              value={sortOrder}
              exclusive
              onChange={(e, value) => value && setSortOrder(value)}
              size="small"
              fullWidth
            >
              <ToggleButton value="asc">A-Z</ToggleButton>
              <ToggleButton value="desc">Z-A</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* View Mode */}
          <Grid item xs={12} md={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, value) => value && setViewMode(value)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Button
                size="small"
                onClick={() => setShowFilters(!showFilters)}
                startIcon={<FilterIcon />}
              >
                Filters
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Rating</InputLabel>
                  <Select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    label="Rating"
                  >
                    <MenuItem value="all">All Ratings</MenuItem>
                    <MenuItem value="unrated">Unrated</MenuItem>
                    <MenuItem value="rated">Rated</MenuItem>
                    <MenuItem value="5">5 Stars</MenuItem>
                    <MenuItem value="4">4+ Stars</MenuItem>
                    <MenuItem value="3">3+ Stars</MenuItem>
                    <MenuItem value="2">2+ Stars</MenuItem>
                    <MenuItem value="1">1+ Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Filter by Author"
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  placeholder="Enter author name..."
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Filter by Year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  placeholder="Enter publication year..."
                />
              </Grid>
            </Grid>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={clearFilters} startIcon={<ClearIcon />}>
                Clear All Filters
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* Active Filters */}
      {(searchTerm ||
        statusFilter !== "all" ||
        ratingFilter !== "all" ||
        authorFilter ||
        yearFilter) && (
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                onDelete={() => setSearchTerm("")}
                size="small"
              />
            )}
            {statusFilter !== "all" && (
              <Chip
                label={`Status: ${
                  statusFilter === BOOK_STATUS.WISHLIST
                    ? "Want to Read"
                    : statusFilter === BOOK_STATUS.CURRENTLY_READING
                      ? "Currently Reading"
                      : "Finished"
                }`}
                onDelete={() => setStatusFilter("all")}
                size="small"
              />
            )}
            {ratingFilter !== "all" && (
              <Chip
                label={`Rating: ${ratingFilter}`}
                onDelete={() => setRatingFilter("all")}
                size="small"
              />
            )}
            {authorFilter && (
              <Chip
                label={`Author: "${authorFilter}"`}
                onDelete={() => setAuthorFilter("")}
                size="small"
              />
            )}
            {yearFilter && (
              <Chip
                label={`Year: "${yearFilter}"`}
                onDelete={() => setYearFilter("")}
                size="small"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Results Summary */}
      <Box mb={3}>
        <Typography variant="h6">
          {filteredAndSortedBooks.length} of {books.length} books
        </Typography>
      </Box>

      {/* Books Grid/List */}
      {filteredAndSortedBooks.length > 0 ? (
        <Grid container spacing={3}>
          {filteredAndSortedBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard
                book={book}
                onEdit={handleEditBook}
                onView={handleViewBook}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          {books.length === 0 ? (
            <Box>
              <Typography variant="h5" gutterBottom>
                No books in your library yet
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Start building your reading collection by adding your first
                book!
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
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" gutterBottom>
                No books match your filters
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Try adjusting your search terms or filters to find what you're
                looking for.
              </Typography>
              <Button variant="outlined" onClick={clearFilters} sx={{ mt: 2 }}>
                Clear All Filters
              </Button>
            </Box>
          )}
        </Paper>
      )}

      {/* Add Book Dialog */}
      <BookForm
        open={addBookOpen}
        onClose={() => setAddBookOpen(false)}
        mode="add"
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

export default AllBooks;
