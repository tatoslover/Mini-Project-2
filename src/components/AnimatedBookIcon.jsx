import React from "react";
import { Box } from "@mui/material";
import { ImportContacts as BookIcon } from "@mui/icons-material";

const AnimatedBookIcon = ({
  size = 32,
  color = "white",
  speed = "normal",
  glowColor = "rgba(255,255,255,0.3)"
}) => {
  const getAnimationDuration = () => {
    switch (speed) {
      case "slow": return "6s";
      case "fast": return "2s";
      case "normal":
      default: return "4s";
    }
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        "& .animated-book-icon": {
          fontSize: size,
          color: color,
          filter: `drop-shadow(0 0 8px ${glowColor})`,
          animation: `pageFlip ${getAnimationDuration()} cubic-bezier(0.4, 0.0, 0.2, 1) infinite, glow 2s ease-in-out infinite alternate`,
          transformOrigin: "center",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            animation: `pageFlipFast 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite, glow 1s ease-in-out infinite alternate`,
          },
        },
        "@keyframes pageFlip": {
          "0%": {
            transform: "rotateY(0deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
            animationTimingFunction: "ease-out",
          },
          "5%": {
            transform: "rotateY(0deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
            animationTimingFunction: "ease-in",
          },
          "20%": {
            transform: "rotateY(90deg) scale(1.03)",
            opacity: 0.7,
            filter: `drop-shadow(4px 4px 16px ${glowColor})`,
            animationTimingFunction: "linear",
          },
          "30%": {
            transform: "rotateY(180deg) scale(1.05)",
            opacity: 0.8,
            filter: `drop-shadow(8px 8px 20px ${glowColor})`,
            animationTimingFunction: "ease-out",
          },
          "40%": {
            transform: "rotateY(270deg) scale(1.03)",
            opacity: 0.7,
            filter: `drop-shadow(4px 4px 16px ${glowColor})`,
            animationTimingFunction: "ease-in",
          },
          "50%": {
            transform: "rotateY(360deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
            animationTimingFunction: "ease-out",
          },
          "100%": {
            transform: "rotateY(360deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          },
        },
        "@keyframes pageFlipFast": {
          "0%": {
            transform: "rotateY(0deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          },
          "25%": {
            transform: "rotateY(90deg) scale(1.1)",
            opacity: 0.6,
            filter: `drop-shadow(6px 6px 18px ${glowColor})`,
          },
          "50%": {
            transform: "rotateY(180deg) scale(1.15)",
            opacity: 0.8,
            filter: `drop-shadow(10px 10px 24px ${glowColor})`,
          },
          "75%": {
            transform: "rotateY(270deg) scale(1.1)",
            opacity: 0.6,
            filter: `drop-shadow(6px 6px 18px ${glowColor})`,
          },
          "100%": {
            transform: "rotateY(360deg) scale(1)",
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          },
        },
        "@keyframes glow": {
          from: {
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          },
          to: {
            filter: `drop-shadow(0 0 16px ${glowColor}) drop-shadow(0 0 24px ${glowColor})`,
          },
        },
      }}
    >
      <BookIcon className="animated-book-icon" />
    </Box>
  );
};

export default AnimatedBookIcon;
