import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Typography,
  Slider,
  Grid,
  Card,
  CardMedia,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";
import { useBookSearch } from "../hooks/useBookSearch";

const BookForm = ({
  open,
  onClose,
  book = null,
  mode = "add",
  initialStatus = null,
}) => {
  const { addBook, updateBook, BOOK_STATUS } = useBooks();
  const { searchBooks, searchResults, searchLoading } = useBookSearch();

  const [formData, setFormData] = useState({
    title: "",
    authors: [""],
    description: "",
    publishedDate: "",
    pageCount: "",
    categories: [],
    thumbnail: "",
    isbn: "",
    publisher: "",
    status: BOOK_STATUS.WISHLIST,
    rating: 0,
    notes: "",
    review: "",
    monthRead: "",
    yearRead: "",
    progress: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [errors, setErrors] = useState({});

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
      '& textarea': {
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

  // Initialize form data when book prop changes
  useEffect(() => {
    if (book && mode === "edit") {
      setFormData({
        title: book.title || "",
        authors: book.authors || [""],
        description: book.description || "",
        publishedDate: book.publishedDate || "",
        pageCount: book.pageCount || "",
        categories: book.categories || [],
        thumbnail: book.thumbnail || "",
        isbn: book.isbn || "",
        publisher: book.publisher || "",
        status: book.status || BOOK_STATUS.WISHLIST,
        rating: book.rating || 0,
        notes: book.notes || "",
        review: book.review || "",
        monthRead: book.monthRead || "",
        yearRead: book.yearRead || "",
        progress: book.progress || 0,
      });
    } else {
      // Reset form for add mode
      setFormData({
        title: "",
        authors: [""],
        description: "",
        publishedDate: "",
        pageCount: "",
        categories: [],
        thumbnail: "",
        isbn: "",
        publisher: "",
        status: initialStatus || BOOK_STATUS.WISHLIST,
        rating: 0,
        notes: "",
        review: "",
        monthRead: "",
        yearRead: "",
        progress: 0,
      });
    }
    setErrors({});
    setShowSearch(false);
    setSearchQuery("");
  }, [book, mode, open, BOOK_STATUS.WISHLIST, initialStatus]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    setFormData((prev) => ({
      ...prev,
      authors: newAuthors,
    }));
  };

  const addAuthorField = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, ""],
    }));
  };

  const removeAuthorField = (index) => {
    if (formData.authors.length > 1) {
      const newAuthors = formData.authors.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        authors: newAuthors,
      }));
    }
  };

  const handleSearchBooks = async () => {
    if (searchQuery.trim()) {
      await searchBooks(searchQuery.trim(), 10);
      setShowSearch(true);
    }
  };

  const selectSearchResult = (selectedBook) => {
    setFormData({
      title: selectedBook.title,
      authors: selectedBook.authors,
      description: selectedBook.description,
      publishedDate: selectedBook.publishedDate,
      pageCount: selectedBook.pageCount,
      categories: selectedBook.categories,
      thumbnail: selectedBook.thumbnail,
      isbn: selectedBook.isbn,
      publisher: selectedBook.publisher,
      status: formData.status, // Keep current status
      rating: formData.rating, // Keep current rating
      notes: formData.notes, // Keep current notes
      review: formData.review, // Keep current review
      monthRead: formData.monthRead, // Keep current month read
      yearRead: formData.yearRead, // Keep current year read
      progress: formData.progress, // Keep current progress
    });
    setShowSearch(false);
    setSearchQuery("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.authors[0] || !formData.authors[0].trim()) {
      newErrors.authors = "At least one author is required";
    }

    if (
      formData.pageCount &&
      (isNaN(formData.pageCount) || formData.pageCount < 0)
    ) {
      newErrors.pageCount = "Page count must be a valid number";
    }

    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = "Progress must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const bookData = {
      ...formData,
      authors: formData.authors.filter((author) => author.trim() !== ""),
      pageCount: formData.pageCount ? parseInt(formData.pageCount) : 0,
      progress: parseInt(formData.progress),
    };

    // If book is being set as finished, add date fields
    if (bookData.status === BOOK_STATUS.FINISHED) {
      const currentDate = new Date().toISOString();
      bookData.dateFinished = currentDate;
      bookData.dateRead = currentDate; // For compatibility
      bookData.progress = 100; // Ensure progress is 100%

      // Set current year if yearRead is not already set
      if (!bookData.yearRead) {
        bookData.yearRead = new Date().getFullYear().toString();
      }
    }

    if (mode === "edit" && book) {
      updateBook(book.id, bookData);
    } else {
      addBook(bookData);
    }

    onClose();
  };

  const handleClose = () => {
    setErrors({});
    setShowSearch(false);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600 }}>
            {mode === "edit" ? "Edit Book" : "Add New Book"}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Search Section */}
        {mode === "add" && (
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: "text.primary", fontWeight: 600 }}>
              Search books
            </Typography>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearchBooks()}
                size="small"
                sx={textFieldSx}
              />
              <Button
                variant="contained"
                onClick={handleSearchBooks}
                disabled={searchLoading || !searchQuery.trim()}
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Box>

            {/* Search Results */}
            {showSearch && (
              <Box mt={2} maxHeight={200} sx={{ overflowY: "auto", overflowX: "hidden" }}>
                {searchResults &&
                Array.isArray(searchResults) &&
                searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Card
                      key={index}
                      sx={{
                        mb: 1,
                        cursor: "pointer",
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
                        "&:hover": { bgcolor: "action.hover" },
                        border: (theme) =>
                          theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.12)'
                            : '1px solid rgba(0, 0, 0, 0.12)',
                      }}
                      onClick={() => selectSearchResult(result)}
                    >
                      <Box display="flex" p={1}>
                        {result.thumbnail && (
                          <CardMedia
                            component="img"
                            sx={{ width: 60, height: 80, objectFit: "contain" }}
                            image={result.thumbnail}
                            alt={result.title}
                          />
                        )}
                        <Box ml={2} flex={1}>
                          <Typography variant="subtitle2" sx={{ color: "text.primary", fontWeight: 600 }}>
                            {result.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
                            by {result.authors.join(", ")}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>
                            {result.publishedDate &&
                              `Published: ${new Date(result.publishedDate).getFullYear()}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))
                ) : searchResults &&
                  Array.isArray(searchResults) &&
                  searchResults.length === 0 ? (
                  <Alert severity="info">
                    No books found. Try a different search term.
                  </Alert>
                ) : searchLoading ? (
                  <Alert severity="info">Searching for books...</Alert>
                ) : null}
              </Box>
            )}
          </Box>
        )}

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Title *"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
              sx={textFieldSx}
            />

            {/* Authors */}
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: "text.primary" }}>
              Authors *
            </Typography>
            {formData.authors.map((author, index) => (
              <Box key={index} display="flex" gap={1} mb={1}>
                <TextField
                  fullWidth
                  label={`Author ${index + 1}`}
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  error={index === 0 && !!errors.authors}
                  helperText={index === 0 ? errors.authors : ""}
                  size="small"
                  sx={textFieldSx}
                />
                {formData.authors.length > 1 && (
                  <Button
                    onClick={() => removeAuthorField(index)}
                    color="error"
                    size="small"
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
            <Button
              onClick={addAuthorField}
              size="small"
              color="primary"
              sx={{ mb: 2 }}
            >
              Add Author
            </Button>

            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              multiline
              rows={4}
              margin="normal"
              sx={textFieldSx}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Publisher"
                  value={formData.publisher}
                  onChange={(e) =>
                    handleInputChange("publisher", e.target.value)
                  }
                  margin="normal"
                  sx={textFieldSx}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Year Published"
                  type="number"
                  value={formData.publishedDate}
                  onChange={(e) => {
                    const year = e.target.value;
                    if (year === "" || (year.length <= 4 && parseInt(year) >= 1000 && parseInt(year) <= new Date().getFullYear() + 10)) {
                      handleInputChange("publishedDate", year);
                    }
                  }}
                  inputProps={{
                    min: 1000,
                    max: new Date().getFullYear() + 10,
                    placeholder: "e.g. 1937"
                  }}
                  helperText="Enter publication year (e.g. 1937)"
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Page Count"
                  type="number"
                  value={formData.pageCount}
                  onChange={(e) =>
                    handleInputChange("pageCount", e.target.value)
                  }
                  error={!!errors.pageCount}
                  helperText={errors.pageCount}
                  margin="normal"
                  sx={textFieldSx}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="ISBN"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange("isbn", e.target.value)}
                  margin="normal"
                  sx={textFieldSx}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Cover Image URL"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange("thumbnail", e.target.value)}
              margin="normal"
              placeholder="https://example.com/book-cover.jpg"
              sx={textFieldSx}
            />

            {/* Genre Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Genre</InputLabel>
              <Select
                value={formData.categories.length > 0 ? formData.categories[0] : ''}
                onChange={(e) => handleInputChange("categories", e.target.value ? [e.target.value] : [])}
                label="Genre"
                renderValue={(selected) => {
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

                  if (!selected) return <em>Select a genre</em>;

                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: genreColors[selected] || '#ccc',
                        }}
                      />
                      <Box sx={{ color: 'text.primary', opacity: 1 }}>
                        {selected}
                      </Box>
                    </Box>
                  );
                }}
              >
                <MenuItem value="">
                  <em>Select a genre</em>
                </MenuItem>
                {[
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
                ].map((genre) => {
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
                    <MenuItem key={genre} value={genre}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: genreColors[genre],
                          }}
                        />
                        <Box sx={{ color: 'text.primary', opacity: 1 }}>
                          {genre}
                        </Box>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Book Cover Preview */}
            {formData.thumbnail && (
              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Cover Preview:
                </Typography>
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    maxWidth: 150,
                    height: 200,
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                  image={formData.thumbnail}
                  alt="Book cover"
                />
              </Box>
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                label="Status"
              >
                <MenuItem value={BOOK_STATUS.WISHLIST}>Want to Read</MenuItem>
                <MenuItem value={BOOK_STATUS.CURRENTLY_READING}>
                  Currently Reading
                </MenuItem>
                <MenuItem value={BOOK_STATUS.FINISHED}>Finished</MenuItem>
              </Select>
            </FormControl>

            {/* Progress Slider */}
            {formData.status === BOOK_STATUS.CURRENTLY_READING && (
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Reading Progress: {formData.progress}%
                </Typography>
                <Slider
                  value={formData.progress}
                  onChange={(e, value) => handleInputChange("progress", value)}
                  min={0}
                  max={100}
                  marks={[
                    { value: 0, label: "0%" },
                    { value: 50, label: "50%" },
                    { value: 100, label: "100%" },
                  ]}
                />
              </Box>
            )}

            {/* Rating */}
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Rating:
              </Typography>
              <Rating
                value={formData.rating}
                onChange={(e, value) => handleInputChange("rating", value || 0)}
                size="large"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ffd700",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#ffb400",
                  },
                }}
              />
            </Box>

            {/* Month and Year Read */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" sx={{ minWidth: 200, width: 'auto' }}>
                  <InputLabel>Month Read</InputLabel>
                  <Select
                    value={formData.monthRead}
                    label="Month Read"
                    onChange={(e) =>
                      handleInputChange("monthRead", e.target.value)
                    }
                    sx={{ minWidth: 200 }}
                    autoWidth
                  >
                    <MenuItem value="">
                      <em>Select Month</em>
                    </MenuItem>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                    <MenuItem value="April">April</MenuItem>
                    <MenuItem value="May">May</MenuItem>
                    <MenuItem value="June">June</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                    <MenuItem value="November">November</MenuItem>
                    <MenuItem value="December">December</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl margin="normal" sx={{ minWidth: 150, width: 'auto' }}>
                  <InputLabel>Year Read</InputLabel>
                  <Select
                    value={formData.yearRead}
                    label="Year Read"
                    onChange={(e) =>
                      handleInputChange("yearRead", e.target.value)
                    }
                    sx={{ minWidth: 150 }}
                    autoWidth
                  >
                    <MenuItem value="">
                      <em>Select Year</em>
                    </MenuItem>
                    {Array.from({ length: 11 }, (_, i) => 2020 + i).map(
                      (year) => (
                        <MenuItem key={year} value={year.toString()}>
                          {year}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Review"
              value={formData.review}
              onChange={(e) => handleInputChange("review", e.target.value)}
              multiline
              rows={4}
              margin="normal"
              placeholder="Write your detailed review of this book..."
              sx={textFieldSx}
            />

            <TextField
              fullWidth
              label="Personal Notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              multiline
              rows={2}
              margin="normal"
              placeholder="Quick notes, quotes, or reminders..."
              sx={textFieldSx}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === "edit" ? "Update Book" : "Add Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookForm;
