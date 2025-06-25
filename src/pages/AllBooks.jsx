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
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  Alert,
  LinearProgress,
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
  Book as BookIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import ReadingGoal from "../components/ReadingGoal";
import { BookGridSkeleton } from "../components/BookCardSkeleton";
import { LibraryEmptyState, SearchEmptyState } from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const navigate = useNavigate();
  const { books, BOOK_STATUS, getBookStats, loading } = useBooks();
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
        // Handle both year-only format (e.g., "1937") and full date format
        const bookYear = book.publishedDate.length === 4
          ? book.publishedDate
          : new Date(book.publishedDate).getFullYear().toString();
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
        // Handle both year-only and full date formats
        const aDate = a.publishedDate?.length === 4
          ? `${a.publishedDate}-01-01`
          : (a.publishedDate || "1900-01-01");
        const bDate = b.publishedDate?.length === 4
          ? `${b.publishedDate}-01-01`
          : (b.publishedDate || "1900-01-01");
        aValue = new Date(aDate).getTime();
        bValue = new Date(bDate).getTime();
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

  const handleExportData = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `reading-tracker-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // Get stats and reading progress
  const stats = getBookStats();

  // Dark mode TextField styling
  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#424242 !important' : '#ffffff !important',
      color: (theme) =>
        theme.palette.mode === 'dark' ? '#ffffff !important' : '#000000 !important',
      '& fieldset': {
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23) !important' : 'rgba(0, 0, 0, 0.23) !important',
      },
      '&:hover fieldset': {
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4) !important' : 'rgba(0, 0, 0, 0.4) !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2 !important',
      },
      '&.Mui-focused': {
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#424242 !important' : '#ffffff !important',
      },
      '& input': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#ffffff !important' : '#000000 !important',
        backgroundColor: 'transparent !important',
      },
      '& input::placeholder': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#b0b0b0 !important' : '#666666 !important',
        opacity: '1 !important',
      },
    },
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
        <Typography variant="h3" component="div" className="stat-value" sx={{ color: "black" }}>
          {value}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "black" }}>
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
          Library
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: 300, color: "text.primary" }}
        >
          Manage your entire book collection
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleAddBook}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Add Book
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={handleExportData}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Overview Section */}
      <Card sx={{ mb: 4, borderRadius: "15px" }} className="card-hover-effect">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
            📊 Overview
          </Typography>

          {/* Quick Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
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
                color="primary.main"
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
        </CardContent>
      </Card>

      {/* Genre Visualization */}
      <Card sx={{ mb: 4, borderRadius: "15px" }} className="card-hover-effect">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
            📚 Genre Breakdown
          </Typography>

          {(() => {
            // Define 12 mainstream book genres
            const allGenres = [
              'Fantasy',
              'Science Fiction',
              'Romance',
              'Mystery',
              'Thriller / Suspense',
              'Horror',
              'Historical Fiction',
              'Literary Fiction',
              'Contemporary / General Fiction',
              'Nonfiction',
              'Comedy / Satire',
              'Young Adult (YA)'
            ];

            // Map book categories to mainstream genres
            const categoryToGenre = {
              'Fantasy': 'Fantasy',
              'Science Fiction': 'Science Fiction',
              'Romance': 'Romance',
              'Mystery': 'Mystery',
              'Thriller': 'Thriller / Suspense',
              'Suspense': 'Thriller / Suspense',
              'Horror': 'Horror',
              'Historical Fiction': 'Historical Fiction',
              'Historical': 'Historical Fiction',
              'Literature': 'Literary Fiction',
              'Literary': 'Literary Fiction',
              'Classic': 'Literary Fiction',
              'Contemporary': 'Contemporary / General Fiction',
              'General Fiction': 'Contemporary / General Fiction',
              'Fiction': 'Contemporary / General Fiction',
              'Biography': 'Nonfiction',
              'Memoir': 'Nonfiction',
              'Essays': 'Nonfiction',
              'Self-Help': 'Nonfiction',
              'Military': 'Nonfiction',
              'Political': 'Nonfiction',
              'Comedy': 'Comedy / Satire',
              'Satire': 'Comedy / Satire',
              'Young Adult': 'Young Adult (YA)',
              'YA': 'Young Adult (YA)',
              'Coming of Age': 'Young Adult (YA)',
              // Additional mappings for our collection
              'Adventure': 'Fantasy',
              'Epic': 'Fantasy',
              'Dystopian': 'Science Fiction',
              'War': 'Historical Fiction',
              'Gothic': 'Horror',
              'Drama': 'Literary Fiction',
              'Southern': 'Literary Fiction',
              'Time Travel': 'Science Fiction',
              'Regency': 'Historical Fiction',
              'Chick Lit': 'Romance',
              'LGBTQ+': 'Contemporary / General Fiction',
              'Supernatural': 'Fantasy',
              'Discworld': 'Fantasy'
            };

            // Calculate actual genre statistics from our book collection (one genre per book)
            const actualGenreCount = {};
            books.forEach(book => {
              let primaryGenre;
              if (book.categories && book.categories.length > 0) {
                // Use only the first category
                const firstCategory = book.categories[0];
                primaryGenre = categoryToGenre[firstCategory] || 'Contemporary / General Fiction';
              } else {
                primaryGenre = 'Contemporary / General Fiction';
              }
              actualGenreCount[primaryGenre] = (actualGenreCount[primaryGenre] || 0) + 1;
            });

            // Create comprehensive genre count including all genres (with 0 for missing ones)
            const genreCount = {};
            allGenres.forEach(genre => {
              genreCount[genre] = actualGenreCount[genre] || 0;
            });

            // Sort genres alphabetically
            const sortedGenres = Object.entries(genreCount)
              .sort((a, b) => a[0].localeCompare(b[0]));

            const totalBooks = books.length;
            const maxCount = Math.max(...Object.values(genreCount));

            // Color palette for 12 genres (mapped by original order)
            const genreColors = {
              'Fantasy': '#667eea',
              'Science Fiction': '#4facfe',
              'Romance': '#f093fb',
              'Mystery': '#764ba2',
              'Thriller / Suspense': '#f5576c',
              'Horror': '#6b46c1',
              'Historical Fiction': '#8d6e63',
              'Literary Fiction': '#43e97b',
              'Contemporary / General Fiction': '#00f2fe',
              'Nonfiction': '#ffecd2',
              'Comedy / Satire': '#ffcc02',
              'Young Adult (YA)': '#ff7043'
            };

            return (
              <Box>
                {/* Bar Chart */}
                <Grid container spacing={1} sx={{ justifyContent: 'center', mb: 4 }}>
                  {sortedGenres.map(([genre, count]) => {
                    const barHeight = maxCount > 0 ? (count / maxCount) * 200 : 0; // Max height 200px

                    return (
                      <Grid item xs={1} key={genre}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          height: 240,
                          justifyContent: 'flex-end',
                          minWidth: 0
                        }}>
                          {/* Count label above bar */}
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 1,
                              fontWeight: 600,
                              color: count > 0 ? 'text.primary' : 'text.disabled',
                              opacity: 1
                            }}
                          >
                            {count}
                          </Typography>

                          {/* Vertical bar */}
                          <Box
                            sx={{
                              width: 30,
                              height: barHeight || 4, // Minimum height for 0 values
                              backgroundColor: genreColors[genre] || '#00f2fe',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.3s ease',
                              opacity: count > 0 ? 1 : 0.3
                            }}
                          />
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Genre Key */}
                <Box sx={{ mt: 3 }}>
                  {/* First row - 6 genres */}
                  <Grid container spacing={1} sx={{ justifyContent: 'center', mb: 1 }}>
                    {sortedGenres.slice(0, 6).map(([genre, count]) => {
                      return (
                        <Grid item xs={2} key={genre}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: genreColors[genre] || '#00f2fe',
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              textAlign: 'center',
                              opacity: 1
                            }}
                          >
                            {genre}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Second row - 6 genres */}
                  <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    {sortedGenres.slice(6, 12).map(([genre, count]) => {
                      return (
                        <Grid item xs={2} key={genre}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: genreColors[genre] || '#00f2fe',
                              fontWeight: 500,
                              fontSize: '0.875rem',
                              textAlign: 'center',
                              opacity: 1
                            }}
                          >
                            {genre}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            );
          })()}
        </CardContent>
      </Card>

      {/* Reading Goal */}
      <ReadingGoal />

      {/* Index */}
      <Card sx={{ mb: 4, borderRadius: "15px" }} className="card-hover-effect">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
            🔍 Index
          </Typography>

          {/* Search */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
              🔎 Search
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                sx={{ width: "100%", maxWidth: 400, ...textFieldSx }}
                placeholder="Search"
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
            </Box>
          </Box>

          {/* Filtering */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
              🔧 Filtering
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
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

              <Grid item xs={12} sm={6} md={3}>
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

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Filter by Author"
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  placeholder="Enter author name..."
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Filter by Year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  placeholder="Enter publication year..."
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Sorting */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: "text.primary", textAlign: "center" }}>
              ⚡ Sorting
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
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

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Sort Order</InputLabel>
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Sort Order"
                  >
                    <MenuItem value="asc">A-Z (Ascending)</MenuItem>
                    <MenuItem value="desc">Z-A (Descending)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
              {filteredAndSortedBooks.length} of {books.length} books
            </Typography>
            <Button
              onClick={clearFilters}
              startIcon={<ClearIcon />}
              variant="contained"
              color="primary"
            >
              Clear All Filters
            </Button>
          </Box>
        </CardContent>
      </Card>



      {/* Loading State */}
      {loading && <BookGridSkeleton count={12} />}

      {/* Books Grid/List */}
      {!loading && filteredAndSortedBooks.length > 0 && (
        <Grid container spacing={2} justifyContent="center">
          {filteredAndSortedBooks.map((book) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={book.id}>
              <BookCard
                book={book}
                onEdit={handleEditBook}
                onView={handleViewBook}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty States */}
      {!loading && filteredAndSortedBooks.length === 0 && (
        <>
          {books.length === 0 ? (
            <LibraryEmptyState onAddBook={handleAddBook} />
          ) : (
            <SearchEmptyState
              onClearFilters={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setRatingFilter("all");
                setAuthorFilter("");
                setYearFilter("");
              }}
            />
          )}
        </>
      )}

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

export default AllBooks;
