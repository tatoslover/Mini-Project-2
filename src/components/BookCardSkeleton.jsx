import React from "react";
import { Card, Box, Skeleton } from "@mui/material";

const BookCardSkeleton = () => {
  return (
    <Card
      sx={{
        position: "relative",
        aspectRatio: "2/3",
        height: 280,
        overflow: "hidden",
      }}
    >
      {/* Book Cover Skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.06)",
        }}
      />

      {/* Status Dot Skeleton */}
      <Skeleton
        variant="circular"
        width={12}
        height={12}
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
        }}
      />

      {/* Info Button Skeleton */}
      <Skeleton
        variant="circular"
        width={32}
        height={32}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      />

      {/* Rating Badge Skeleton */}
      <Skeleton
        variant="rounded"
        width={80}
        height={24}
        sx={{
          position: "absolute",
          top: 40,
          left: 8,
          borderRadius: 1,
        }}
      />

      {/* Status Badge Skeleton */}
      <Skeleton
        variant="rounded"
        width={60}
        height={20}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          borderRadius: 1,
        }}
      />

      {/* Progress Bar Skeleton (randomly show for some cards) */}
      {Math.random() > 0.7 && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={4}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
    </Card>
  );
};

// Grid of skeleton cards
export const BookGridSkeleton = ({ count = 12 }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        },
        gap: 2,
        mt: 2,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </Box>
  );
};

export default BookCardSkeleton;
