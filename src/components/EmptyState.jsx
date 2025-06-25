import React from "react";
import { Box, Typography, Button, Paper, Stack, useTheme } from "@mui/material";
import {
  LibraryBooks as LibraryIcon,
  BookmarkBorder as WishlistIcon,
  MenuBook as ReadingIcon,
  CheckCircle as FinishedIcon,
  Add as AddIcon,
  Search as SearchIcon,
  ImportContacts as BookIcon,
  AutoStories as StoryIcon,
} from "@mui/icons-material";

const EmptyState = ({
  type = "default",
  title,
  description,
  action,
  onAction,
  illustration,
  compact = false,
}) => {
  const theme = useTheme();

  const getTypeConfig = (type) => {
    switch (type) {
      case "library":
        return {
          icon: <LibraryIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "Your Library is Empty",
          description:
            "Start building your personal book collection by adding your first book!",
          actionText: "Add Your First Book",
          color: theme.palette.primary.main,
        };
      case "wishlist":
        return {
          icon: <WishlistIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "No Books in Your Wishlist",
          description:
            "Discover new books and add them to your wishlist to read later.",
          actionText: "Explore Books",
          color: theme.palette.primary.main,
        };
      case "currently-reading":
        return {
          icon: <ReadingIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "Not Reading Anything Yet",
          description:
            "Pick a book from your wishlist or add a new one to start reading!",
          actionText: "Start Reading",
          color: theme.palette.primary.main,
        };
      case "finished":
        return {
          icon: <FinishedIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "No Finished Books Yet",
          description:
            "Complete your first book to see your reading achievements here.",
          actionText: "View Reading List",
          color: theme.palette.success.main,
        };
      case "search":
        return {
          icon: <SearchIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "No Books Found",
          description:
            "Try adjusting your search criteria or browse all books instead.",
          actionText: "Clear Filters",
          color: theme.palette.info.main,
        };
      case "error":
        return {
          icon: <BookIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: "Something Went Wrong",
          description:
            "We couldn't load your books right now. Please try again.",
          actionText: "Retry",
          color: theme.palette.error.main,
        };
      default:
        return {
          icon: <StoryIcon sx={{ fontSize: 80, opacity: 0.3 }} />,
          title: title || "Nothing Here Yet",
          description: description || "Get started by adding some content.",
          actionText: "Get Started",
          color: theme.palette.primary.main,
        };
    }
  };

  const config = getTypeConfig(type);
  const finalIcon = illustration || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalActionText = action || config.actionText;

  if (compact) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ color: config.color, mb: 2 }}>{finalIcon}</Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, mb: 1, color: "text.primary" }}
        >
          {finalTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, maxWidth: 400, mx: "auto", color: "text.primary", opacity: 0.8 }}
        >
          {finalDescription}
        </Typography>
        {onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            startIcon={<AddIcon />}
            sx={{ textTransform: "none" }}
          >
            {finalActionText}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: "center",
        py: 8,
        px: 4,
        backgroundColor: "transparent",
        border: `2px dashed ${theme.palette.divider}`,
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: config.color,
          backgroundColor: `${config.color}08`,
        },
      }}
    >
      <Stack spacing={3} alignItems="center">
        {/* Illustration */}
        <Box
          sx={{
            color: config.color,
            opacity: 0.7,
            transition: "all 0.3s ease",
          }}
        >
          {finalIcon}
        </Box>

        {/* Content */}
        <Box sx={{ maxWidth: 500 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            {finalTitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              mb: 4,
              color: "text.primary",
              opacity: 0.8,
            }}
          >
            {finalDescription}
          </Typography>

          {/* Action Button */}
          {onAction && (
            <Button
              variant="contained"
              size="large"
              onClick={onAction}
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: config.color,
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: `0 4px 12px ${config.color}40`,
                "&:hover": {
                  backgroundColor: config.color,
                  filter: "brightness(0.9)",
                  transform: "translateY(-2px)",
                  boxShadow: `0 6px 16px ${config.color}50`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {finalActionText}
            </Button>
          )}
        </Box>

        {/* Tips or Secondary Actions */}
        {type === "library" && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: `${config.color}10`,
              borderRadius: 2,
              border: `1px solid ${config.color}30`,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, mb: 1, color: "text.primary", opacity: 0.9 }}
            >
              💡 Getting Started Tips:
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
              • Search for books using the Google Books API
              <br />
              • Track your reading progress and goals
              <br />• Rate books and write personal notes
            </Typography>
          </Box>
        )}

        {type === "search" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
              Try searching for: "fiction", "programming", or your favorite
              author
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

// Pre-configured empty states for common use cases
export const LibraryEmptyState = ({ onAddBook }) => (
  <EmptyState type="library" onAction={onAddBook} />
);

export const WishlistEmptyState = () => <EmptyState type="wishlist" />;

export const CurrentlyReadingEmptyState = ({ onAddBook }) => (
  <EmptyState type="currently-reading" onAction={onAddBook} />
);

export const FinishedEmptyState = ({ onViewLibrary }) => (
  <EmptyState type="finished" onAction={onViewLibrary} />
);

export const SearchEmptyState = ({ onClearFilters }) => (
  <EmptyState type="search" onAction={onClearFilters} />
);

export const ErrorEmptyState = ({ onRetry }) => (
  <EmptyState type="error" onAction={onRetry} />
);

export default EmptyState;
