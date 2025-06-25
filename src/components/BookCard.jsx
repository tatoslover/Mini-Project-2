import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  LinearProgress,
  Fade,
  Backdrop,
  Slide,
  ButtonGroup,
  Zoom,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  BookmarkBorder as BookmarkIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
  Close as CloseIcon,
  Pause as PauseIcon,
  FastForward as ProgressIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";

// Genre-based color mapping for 12 mainstream genres
const getGenreColor = (categories = []) => {
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

  // Get first matching genre color, fallback to default
  for (const category of categories) {
    if (genreColors[category]) {
      return genreColors[category];
    }
  }
  return "#00f2fe"; // Default to Contemporary/General Fiction color
};

// Custom Book Cover Component
const BookCover = ({ book, width = 160, height = 240, className = "", fullSize = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Determine if we should use full container size or fixed dimensions
  const isFullSize = fullSize || className.includes("book-cover-image");
  const containerSx = isFullSize ? {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: 1,
  } : {
    width: width,
    height: height,
    position: "relative",
    overflow: "hidden",
    borderRadius: 1,
  };

  // If we have a thumbnail and no error, show the image
  if (book.thumbnail && !imageError) {
    return (
      <Box
        sx={containerSx}
        className={className}
      >
        <img
          src={book.thumbnail}
          alt={book.title}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
        />
        {!imageLoaded && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: getGenreColor(book.categories),
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: (theme) => theme.palette.mode === 'dark' ? "white" : "black",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: isFullSize ? "1rem" : "0.9rem",
                lineHeight: 1.2,
                textShadow: (theme) => theme.palette.mode === 'dark' ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(255,255,255,0.8)",
              }}
            >
              {book.title}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  // Fallback: Generate custom cover
  const backgroundColor = getGenreColor(book.categories);
  const primaryGenre = book.categories?.[0] || "Book";

  return (
    <Box
      sx={{
        ...containerSx,
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
          zIndex: 1,
        },
      }}
      className={className}
    >
      <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.mode === 'dark' ? "white" : "black",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isFullSize ? "1rem" : (width > 120 ? "1rem" : "0.85rem"),
            lineHeight: 1.2,
            mb: 1,
            textShadow: (theme) => theme.palette.mode === 'dark' ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(255,255,255,0.8)",
            wordBreak: "break-word",
          }}
        >
          {book.title}
        </Typography>
        {book.authors?.[0] && (
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
              textAlign: "center",
              fontSize: isFullSize ? "0.75rem" : (width > 120 ? "0.75rem" : "0.65rem"),
              fontStyle: "italic",
              textShadow: (theme) => theme.palette.mode === 'dark' ? "0 1px 2px rgba(0,0,0,0.3)" : "0 1px 2px rgba(255,255,255,0.8)",
            }}
          >
            {book.authors[0]}
          </Typography>
        )}
      </Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Chip
          label={primaryGenre}
          size="small"
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            color: (theme) => theme.palette.mode === 'dark' ? "white" : "black",
            fontSize: "0.65rem",
            height: "auto",
            "& .MuiChip-label": {
              padding: "2px 6px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

const BookCard = ({ book, onEdit }) => {
  const { updateBook, deleteBook, BOOK_STATUS } = useBooks();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [quickRatingValue, setQuickRatingValue] = useState(book.rating || 0);

  const handleInfoClick = (event) => {
    event.stopPropagation();
    setInfoDialogOpen(true);
  };

  const handleCardClick = () => {
    if (!showQuickActions) {
      setInfoDialogOpen(true);
    }
  };

  const handleQuickStatusChange = (newStatus, event) => {
    event.stopPropagation();
    handleStatusChange(newStatus);
  };

  const handleQuickRating = (newRating, event) => {
    event.stopPropagation();
    setQuickRatingValue(newRating);
    updateBook(book.id, { rating: newRating });
  };

  const handleStatusChange = (newStatus) => {
    const updates = { status: newStatus };

    // If moving to finished, set progress to 100% and dateFinished
    if (newStatus === BOOK_STATUS.FINISHED) {
      updates.progress = 100;
      updates.dateFinished = new Date().toISOString();
      updates.dateRead = new Date().toISOString(); // For compatibility
      // Set current year if yearRead is not already set
      if (!book.yearRead) {
        updates.yearRead = new Date().getFullYear().toString();
      }
    }
    // If moving to currently reading and progress is 0, set to 1%
    else if (
      newStatus === BOOK_STATUS.CURRENTLY_READING &&
      book.progress === 0
    ) {
      updates.progress = 1;
      updates.dateStarted = new Date().toISOString();
    }

    updateBook(book.id, updates);
    handleMenuClose();
  };

  const handleDelete = () => {
    deleteBook(book.id);
    setDeleteDialogOpen(false);
  };

  const handleRatingChange = (newRating) => {
    updateBook(book.id, { rating: newRating });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case BOOK_STATUS.WISHLIST:
        return <BookmarkIcon sx={{ fontSize: 16 }} />;
      case BOOK_STATUS.CURRENTLY_READING:
        return <ReadingIcon sx={{ fontSize: 16 }} />;
      case BOOK_STATUS.FINISHED:
        return <FinishedIcon sx={{ fontSize: 16 }} />;
      default:
        return <BookmarkIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BOOK_STATUS.WISHLIST:
        return "#1565c0";
      case BOOK_STATUS.CURRENTLY_READING:
        return "#00897b";
      case BOOK_STATUS.FINISHED:
        return "#2e7d32";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case BOOK_STATUS.WISHLIST:
        return "Want to Read";
      case BOOK_STATUS.CURRENTLY_READING:
        return "Currently Reading";
      case BOOK_STATUS.FINISHED:
        return "Finished";
      default:
        return "Unknown";
    }
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "Unknown Author";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" & ");
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          aspectRatio: "2/3",
          height: 280,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          },
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          setTimeout(() => setShowQuickActions(true), 200);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowQuickActions(false);
        }}
        onClick={handleCardClick}
      >
        {/* Book Cover */}
        <BookCover
          book={book}
          width={160}
          height={240}
          className="book-cover-image"
          fullSize={true}
        />



        {/* Centered Info Button on Hover */}
        <Fade in={isHovered} timeout={300}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(2px)",
              pointerEvents: isHovered ? "auto" : "none",
              zIndex: 10,
            }}
          >
            <Tooltip title="View Details & More Actions" placement="top" arrow>
              <IconButton
                sx={{
                  backgroundColor: "#FF4444",
                  color: "white",
                  width: 36,
                  height: 36,
                  border: "2px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 3px 10px rgba(255, 68, 68, 0.3), 0 0 0 2px rgba(255, 68, 68, 0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor: "#FF2222",
                    transform: "scale(1.15)",
                    boxShadow: "0 6px 15px rgba(255, 68, 68, 0.5), 0 0 0 3px rgba(255, 68, 68, 0.2)",
                    border: "2px solid white",
                  },
                }}
                onClick={handleInfoClick}
              >
                <InfoIcon sx={{ fontSize: 36, fontWeight: "bold" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>

        {/* Progress Bar for Currently Reading */}
        {book.status === BOOK_STATUS.CURRENTLY_READING && book.progress > 0 && (
          <Tooltip
            title={`Reading Progress: ${book.progress}%`}
            placement="bottom"
            arrow
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: "rgba(0,0,0,0.1)",
                cursor: "help",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={book.progress || 0}
                sx={{
                  height: "100%",
                  backgroundColor: "transparent",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getStatusColor(book.status),
                    animation:
                      book.progress > 80 ? "pulse 2s infinite" : "none",
                  },
                }}
              />
            </Box>
          </Tooltip>
        )}




      </Card>

      {/* Detailed Info Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: "text.primary" }}>
              Book Details
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              {/* Edit Button */}
              <Tooltip title="Edit Book" arrow>
                <IconButton
                  size="small"
                  onClick={() => {
                    onEdit && onEdit(book);
                    setInfoDialogOpen(false);
                  }}
                  sx={{
                    backgroundColor: "action.hover",
                    "&:hover": { backgroundColor: "primary.main", color: "white" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Status Change Buttons */}
              {book.status !== BOOK_STATUS.CURRENTLY_READING && (
                <Tooltip title="Mark as Currently Reading" arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleStatusChange(BOOK_STATUS.CURRENTLY_READING)}
                    sx={{
                      backgroundColor: "action.hover",
                      "&:hover": { backgroundColor: "info.main", color: "white" },
                    }}
                  >
                    <ReadingIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {book.status !== BOOK_STATUS.FINISHED && (
                <Tooltip title="Mark as Finished" arrow>
                  <IconButton
                    size="small"
                    onClick={() => handleStatusChange(BOOK_STATUS.FINISHED)}
                    sx={{
                      backgroundColor: "action.hover",
                      "&:hover": { backgroundColor: "success.main", color: "white" },
                    }}
                  >
                    <FinishedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {/* Delete Button */}
              <Tooltip title="Delete Book" arrow>
                <IconButton
                  size="small"
                  onClick={() => {
                    setDeleteDialogOpen(true);
                    setInfoDialogOpen(false);
                  }}
                  sx={{
                    backgroundColor: "action.hover",
                    "&:hover": { backgroundColor: "error.main", color: "white" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Close Button */}
              <IconButton size="small" onClick={() => setInfoDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" gap={3} mb={3}>
            {/* Book Cover */}
            <Box sx={{ flexShrink: 0 }}>
              <BookCover
                book={book}
                width={120}
                height={180}
              />
            </Box>

            {/* Book Info */}
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                {book.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                by {formatAuthors(book.authors)}
              </Typography>

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                {getStatusIcon(book.status)}
                <Chip
                  label={getStatusText(book.status)}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(book.status),
                    color: "white",
                    fontWeight: 500,
                  }}
                />
              </Box>

              {book.status === BOOK_STATUS.CURRENTLY_READING && (
                <Box mb={2}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Progress: {book.progress || 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={book.progress || 0}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              )}

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Rating:
                </Typography>
                <Rating
                  value={book.rating}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#ffd700",
                    },
                    "& .MuiRating-iconHover": {
                      color: "#ffb400",
                    },
                  }}
                />
                {book.rating > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    ({book.rating}/5)
                  </Typography>
                )}
              </Box>

              {book.pageCount && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  📖 {book.pageCount} pages
                </Typography>
              )}

              {book.publishedDate && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  📅 Published: {new Date(book.publishedDate).getFullYear()}
                </Typography>
              )}

              {book.publisher && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  🏢 {book.publisher}
                </Typography>
              )}

              {(book.monthRead || book.yearRead) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  📅 Read in:{" "}
                  {book.monthRead && book.yearRead
                    ? `${book.monthRead} ${book.yearRead}`
                    : book.monthRead || book.yearRead}
                </Typography>
              )}
            </Box>
          </Box>

          {book.description && (
            <Box mb={book.review ? 2 : 0}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                Description
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {book.description}
              </Typography>
            </Box>
          )}

          {book.review && (
            <Box mb={book.notes ? 2 : 0}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                My Review
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  p: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                  borderRadius: 1,
                  borderLeft: "4px solid #ffd700",
                  color: "text.primary",
                  fontWeight: 500,
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                {book.review}
              </Typography>
            </Box>
          )}

          {book.notes && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                Notes
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  p: 1.5,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                  borderRadius: 1,
                  color: "text.primary",
                  fontWeight: 500,
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                {book.notes}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>



      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{book.title}" from your library?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
