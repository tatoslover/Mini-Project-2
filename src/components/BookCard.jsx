import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  BookmarkBorder as BookmarkIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon
} from '@mui/icons-material';
import { useBooks } from '../contexts/BookContext';

const BookCard = ({ book, onEdit, onView }) => {
  const { updateBook, deleteBook, BOOK_STATUS } = useBooks();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    const updates = { status: newStatus };

    // If moving to finished, set progress to 100%
    if (newStatus === BOOK_STATUS.FINISHED && book.progress < 100) {
      updates.progress = 100;
      updates.dateFinished = new Date().toISOString();
    }
    // If moving to currently reading and progress is 0, set to 1%
    else if (newStatus === BOOK_STATUS.CURRENTLY_READING && book.progress === 0) {
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
        return <BookmarkIcon color="primary" />;
      case BOOK_STATUS.CURRENTLY_READING:
        return <ReadingIcon color="secondary" />;
      case BOOK_STATUS.FINISHED:
        return <FinishedIcon color="success" />;
      default:
        return <BookmarkIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BOOK_STATUS.WISHLIST:
        return 'primary';
      case BOOK_STATUS.CURRENTLY_READING:
        return 'secondary';
      case BOOK_STATUS.FINISHED:
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case BOOK_STATUS.WISHLIST:
        return 'Want to Read';
      case BOOK_STATUS.CURRENTLY_READING:
        return 'Currently Reading';
      case BOOK_STATUS.FINISHED:
        return 'Finished';
      default:
        return 'Unknown';
    }
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' & ');
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {book.thumbnail && (
          <CardMedia
            component="img"
            height="200"
            image={book.thumbnail}
            alt={book.title}
            sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
          />
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {book.title}
            </Typography>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            by {formatAuthors(book.authors)}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {getStatusIcon(book.status)}
            <Chip
              label={getStatusText(book.status)}
              color={getStatusColor(book.status)}
              size="small"
              variant="outlined"
            />
          </Box>

          {book.status === BOOK_STATUS.CURRENTLY_READING && (
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Progress: {book.progress || 0}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={book.progress || 0}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}

          {book.rating > 0 && (
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Rating
                value={book.rating}
                onChange={(event, newValue) => handleRatingChange(newValue)}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                ({book.rating}/5)
              </Typography>
            </Box>
          )}

          {book.pageCount && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {book.pageCount} pages
            </Typography>
          )}

          {book.publishedDate && (
            <Typography variant="body2" color="text.secondary">
              Published: {new Date(book.publishedDate).getFullYear()}
            </Typography>
          )}

          {book.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {book.description}
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Button size="small" onClick={() => onView && onView(book)} startIcon={<ViewIcon />}>
            View Details
          </Button>

          {book.status === BOOK_STATUS.FINISHED && book.rating === 0 && (
            <Tooltip title="Rate this book">
              <Box>
                <Rating
                  value={0}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                  size="small"
                />
              </Box>
            </Tooltip>
          )}
        </CardActions>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => { onEdit && onEdit(book); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        {book.status !== BOOK_STATUS.WISHLIST && (
          <MenuItem onClick={() => handleStatusChange(BOOK_STATUS.WISHLIST)}>
            <BookmarkIcon sx={{ mr: 1 }} />
            Move to Wishlist
          </MenuItem>
        )}

        {book.status !== BOOK_STATUS.CURRENTLY_READING && (
          <MenuItem onClick={() => handleStatusChange(BOOK_STATUS.CURRENTLY_READING)}>
            <ReadingIcon sx={{ mr: 1 }} />
            Mark as Currently Reading
          </MenuItem>
        )}

        {book.status !== BOOK_STATUS.FINISHED && (
          <MenuItem onClick={() => handleStatusChange(BOOK_STATUS.FINISHED)}>
            <FinishedIcon sx={{ mr: 1 }} />
            Mark as Finished
          </MenuItem>
        )}

        <MenuItem onClick={() => { setDeleteDialogOpen(true); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{book.title}" from your library? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
