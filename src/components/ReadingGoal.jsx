import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Divider,
  Badge,
  Avatar,
} from "@mui/material";
import {
  TrendingUp as GoalIcon,
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
  CalendarToday as CalendarIcon,
  TrendingDown as BehindIcon,
  CheckCircle as OnTrackIcon,
  CheckCircle,
  Close as CloseIcon,
  Add as AddIcon,
  AutoAwesome as StarIcon,
  LocalFireDepartment as StreakIcon,
  Timeline as StatsIcon,
  Speed as PaceIcon,
  BookmarkBorder as BookIcon,
  WorkspacePremium as BadgeIcon,
  ShowChart as ChartIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useBooks } from "../contexts/BookContext";

const ReadingGoal = ({ compact = false }) => {
  const {
    readingGoals,
    setReadingGoal,
    updateReadingGoal,
    getReadingGoalProgress,
    getReadingGoalForYear,
    ensureReadingGoalForYear,
    books,
  } = useBooks();

  const currentYear = new Date().getFullYear();
  const [goalYear, setGoalYear] = useState(currentYear);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goalTarget, setGoalTarget] = useState(12);
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
      '& input::placeholder': {
        color: (theme) =>
          theme.palette.mode === 'dark' ? '#b0b0b0 !important' : '#666666 !important',
        opacity: '1 !important',
      },
    },
  };

  const readingGoal = getReadingGoalForYear(goalYear);
  const progress = getReadingGoalProgress(goalYear);

  // Ensure goal exists for current year and sync goalTarget
  useEffect(() => {
    ensureReadingGoalForYear(currentYear);
  }, [ensureReadingGoalForYear, currentYear]);

  // Sync goalTarget with readingGoal when it changes (but not when dialog is open)
  useEffect(() => {
    if (readingGoal && readingGoal.target && !dialogOpen) {
      setGoalTarget(readingGoal.target);
    }
  }, [readingGoal, dialogOpen]);

  // Enhanced statistics calculations
  const detailedStats = useMemo(() => {
    if (!progress || !books) return null;

    const currentYearBooks = books.filter((book) => {
      if (book.status !== "finished") return false;

      if (book.yearRead) {
        return parseInt(book.yearRead) === goalYear;
      }

      const dateToCheck = book.dateFinished || book.dateRead;
      if (!dateToCheck) return false;

      return new Date(dateToCheck).getFullYear() === goalYear;
    });

    const now = new Date();
    const startOfYear = new Date(goalYear, 0, 1);
    const endOfYear = new Date(goalYear, 11, 31);

    const daysIntoYear = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24));
    const totalDaysInYear = Math.ceil(
      (endOfYear - startOfYear) / (1000 * 60 * 60 * 24),
    );

    let yearProgress, expectedBooks;

    if (goalYear === currentYear) {
      yearProgress = (daysIntoYear / totalDaysInYear) * 100;
      expectedBooks = Math.floor((yearProgress / 100) * readingGoal.target);
    } else if (goalYear < currentYear) {
      // Past year - should be 100% complete
      yearProgress = 100;
      expectedBooks = readingGoal.target;
    } else {
      // Future year - 0% complete
      yearProgress = 0;
      expectedBooks = 0;
    }

    const currentMonth = now.getMonth();
    let avgBooksPerMonth;
    if (goalYear === currentYear) {
      avgBooksPerMonth = currentYearBooks.length / (currentMonth + 1 || 1);
    } else if (goalYear < currentYear) {
      // Past year - average across all 12 months
      avgBooksPerMonth = currentYearBooks.length / 12;
    } else {
      // Future year - no average yet
      avgBooksPerMonth = 0;
    }
    const projectedYearEnd = Math.round(avgBooksPerMonth * 12);

    // Reading pace calculation
    const daysPerBook =
      currentYearBooks.length > 0 ? daysIntoYear / currentYearBooks.length : 0;
    const booksPerWeek =
      currentYearBooks.length > 0
        ? (currentYearBooks.length / daysIntoYear) * 7
        : 0;

    // Monthly breakdown
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const monthBooks = currentYearBooks.filter((book) => {
        // First check if we have monthRead field
        if (book.monthRead) {
          return book.monthRead === monthNames[i];
        }

        // Fall back to date fields if no monthRead
        const dateToCheck = book.dateFinished || book.dateRead;
        if (!dateToCheck) return false;
        return new Date(dateToCheck).getMonth() === i;
      });
      return {
        month: new Date(2025, i, 1).toLocaleString("default", {
          month: "short",
        }),
        count: monthBooks.length,
        isPastMonth: i <= currentMonth,
      };
    });

    // Reading streak calculation (simplified)
    const sortedBooks = currentYearBooks.sort(
      (a, b) =>
        new Date(a.dateFinished || a.dateRead) -
        new Date(b.dateFinished || b.dateRead),
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < sortedBooks.length; i++) {
      const prevDate = new Date(
        sortedBooks[i - 1].dateFinished || sortedBooks[i - 1].dateRead,
      );
      const currDate = new Date(
        sortedBooks[i].dateFinished || sortedBooks[i].dateRead,
      );
      const daysDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (daysDiff <= 7) {
        // Within a week
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Current streak (books read in last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    currentStreak = currentYearBooks.filter(
      (book) => new Date(book.dateFinished || book.dateRead) >= thirtyDaysAgo,
    ).length;

    return {
      yearProgress,
      expectedBooks,
      avgBooksPerMonth,
      projectedYearEnd,
      daysPerBook,
      booksPerWeek,
      monthlyData,
      currentStreak,
      longestStreak,
      isAheadOfSchedule: currentYearBooks.length > expectedBooks,
      totalPages: currentYearBooks.reduce(
        (sum, book) => sum + (book.pages || 0),
        0,
      ),
      avgPagesPerBook:
        currentYearBooks.length > 0
          ? Math.round(
              currentYearBooks.reduce(
                (sum, book) => sum + (book.pages || 0),
                0,
              ) / currentYearBooks.length,
            )
          : 0,
      daysIntoYear,
      totalDaysInYear,
    };
  }, [progress, books, goalYear, readingGoal.target, currentYear]);

  // Achievement badges
  const getAchievements = () => {
    if (!progress || !detailedStats) return [];

    const achievements = [];

    if (progress.current >= 1)
      achievements.push({ icon: "📚", name: "First Book", color: "success" });
    if (progress.current >= 5)
      achievements.push({ icon: "🌟", name: "Bookworm", color: "primary" });
    if (progress.current >= 10)
      achievements.push({ icon: "🚀", name: "Reader", color: "secondary" });
    if (progress.current >= 25)
      achievements.push({ icon: "🏆", name: "Book Master", color: "primary" });
    if (progress.current >= 50)
      achievements.push({
        icon: "👑",
        name: "Literary Legend",
        color: "error",
      });

    if (detailedStats.currentStreak >= 3)
      achievements.push({ icon: "🔥", name: "On Fire", color: "error" });
    if (detailedStats.isAheadOfSchedule)
      achievements.push({
        icon: "⚡",
        name: "Ahead of Schedule",
        color: "info",
      });
    if (progress.isComplete)
      achievements.push({
        icon: "🎯",
        name: "Goal Achieved",
        color: "success",
      });

    return achievements;
  };

  // All achievements with descriptions and status
  const getAllAchievements = () => {
    if (!progress || !detailedStats) return [];

    const allAchievements = [
      {
        icon: "📚",
        name: "First Book",
        description: "Read your first book of the year",
        color: "success",
        achieved: progress.current >= 1,
      },
      {
        icon: "🌟",
        name: "Bookworm",
        description: "Read 5 books in a year",
        color: "primary",
        achieved: progress.current >= 5,
      },
      {
        icon: "🚀",
        name: "Reader",
        description: "Read 10 books in a year",
        color: "secondary",
        achieved: progress.current >= 10,
      },
      {
        icon: "🏆",
        name: "Book Master",
        description: "Read 25 books in a year",
        color: "warning",
        achieved: progress.current >= 25,
      },
      {
        icon: "👑",
        name: "Literary Legend",
        description: "Read 50 books in a year",
        color: "error",
        achieved: progress.current >= 50,
      },
      {
        icon: "🔥",
        name: "On Fire",
        description: "Read 3+ books in the last 30 days",
        color: "error",
        achieved: detailedStats.currentStreak >= 3,
      },
      {
        icon: "⚡",
        name: "Ahead of Schedule",
        description: "Reading faster than your yearly pace",
        color: "info",
        achieved: detailedStats.isAheadOfSchedule,
      },
      {
        icon: "🎯",
        name: "Goal Achieved",
        description: "Complete your yearly reading goal",
        color: "success",
        achieved: progress.isComplete,
      },
    ];

    return allAchievements;
  };

  const handleSetGoal = () => {
    const newErrors = {};

    if (goalTarget === "" || goalTarget === null || goalTarget === undefined) {
      newErrors.target = "Please enter a number of books";
    } else if (goalTarget < 1) {
      newErrors.target = "Please enter at least 1 book";
    }

    if (goalTarget > 365) {
      newErrors.target = "That's ambitious! Try a number under 365";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setReadingGoal(goalYear, goalTarget);
    setDialogOpen(false);
    setErrors({});
  };

  const handleEditGoal = () => {
    setGoalTarget(readingGoal?.target || 12);
    setErrors({});
    setDialogOpen(true);
  };

  const handleDeactivateGoal = () => {
    updateReadingGoal(goalYear, { isActive: false });
  };

  const handleYearChange = (direction) => {
    const newYear = goalYear + direction;
    if (newYear >= 2020 && newYear <= 2030) {
      setGoalYear(newYear);
    }
  };

  const getMotivationalMessage = () => {
    if (!progress || !detailedStats) return "";

    if (progress.isComplete) {
      const overachievement = progress.current - progress.target;
      if (overachievement > 0) {
        return `🎉 Outstanding! You've exceeded your goal by ${overachievement} book${overachievement !== 1 ? "s" : ""}! Keep the momentum going!`;
      }
      return "";
    }

    if (detailedStats.isAheadOfSchedule) {
      const booksAhead = progress.current - detailedStats.expectedBooks;
      return `🚀 Fantastic! You're ${booksAhead} book${booksAhead !== 1 ? "s" : ""} ahead of schedule. You're crushing it!`;
    }

    if (progress.current === 0) {
      return "📖 Your reading journey awaits! Pick your first book and start building your literary adventure.";
    }

    if (detailedStats.currentStreak >= 3) {
      return `🔥 You're on fire! ${detailedStats.currentStreak} books in the last 30 days. Keep the streak alive!`;
    }

    const booksNeeded = progress.remaining;
    const monthsLeft = Math.max(1, 12 - new Date().getMonth());
    const booksPerMonth = Math.ceil(booksNeeded / monthsLeft);

    return `📈 You're making progress! Aim for ${booksPerMonth} book${booksPerMonth !== 1 ? "s" : ""} per month to reach your goal.`;
  };

  const getProgressColor = () => {
    if (!progress) return "primary";
    if (progress.isComplete) return "success";
    if (detailedStats?.isAheadOfSchedule) return "info";
    if (progress.percentage >= 50) return "primary";
    return "primary";
  };

  const getYearOptions = () => {
    const years = [];
    for (let i = currentYear - 1; i <= currentYear + 2; i++) {
      years.push(i);
    }
    return years;
  };

  // Compact version for mobile or small spaces
  if (compact) {
    if (!readingGoal.isActive) {
      return (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <GoalIcon color="primary" />
                <Typography variant="body2" fontWeight={500}>
                  Set Reading Goal
                </Typography>
              </Box>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
                startIcon={<AddIcon />}
              >
                Set Goal
              </Button>
            </Box>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="body2" fontWeight={500} sx={{ color: "text.primary" }}>
              {goalYear} Reading Goal
            </Typography>
          </Box>

          {progress && (
            <>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6" color="primary">
                  {progress.current}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
                  of {progress.target} books
                </Typography>
                <Chip
                  size="small"
                  label={`${progress.percentage}%`}
                  color={getProgressColor()}
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={Math.min(progress.percentage, 100)}
                color={getProgressColor()}
                sx={{ height: 6, borderRadius: 3 }}
              />

              {detailedStats && detailedStats.currentStreak > 0 && (
                <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                  <StreakIcon sx={{ fontSize: 16, color: "error.main" }} />
                  <Typography variant="caption" color="error.main">
                    {detailedStats.currentStreak} book streak
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  // Reading goal is now active by default, but keep this as fallback
  if (!readingGoal.isActive) {
    // Auto-activate with default settings
    updateReadingGoal(goalYear, { isActive: true });
    return null;
  }

  // Active goal display with enhanced statistics
  return (
    <>
      {/* Main Goal Card */}
      <Card sx={{ mb: 4, borderRadius: "15px" }} className="card-hover-effect">
        <CardContent sx={{ p: 4 }}>
          <Box mb={2}>
            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: 500, color: "text.primary", textAlign: "center" }}
            >
              📅 Reading Goal
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  size="small"
                  onClick={() => handleYearChange(-1)}
                  disabled={goalYear <= 2020}
                  sx={{ color: "primary.main" }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ minWidth: 140, textAlign: "center", color: "text.primary" }}
                >
                  {goalYear}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleYearChange(1)}
                  disabled={goalYear >= 2030}
                  sx={{ color: "primary.main" }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" gap={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleEditGoal}
                startIcon={<EditIcon />}
              >
                Edit Goal
              </Button>
            </Box>
          </Box>

          {progress && detailedStats && (
            <>
              {/* Main Progress Display */}
              <Grid container spacing={2} mb={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{ p: 2, textAlign: "center", bgcolor: "primary.50" }}
                  >
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {progress.current}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
                      Books Read
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h3" sx={{ color: "text.primary" }}>
                      {progress.target}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
                      Target
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor:
                        progress.remaining > 0 ? "primary.50" : "success.50",
                    }}
                  >
                    <Typography
                      variant="h3"
                      color={
                        progress.remaining > 0 ? "primary.main" : "success.main"
                      }
                      fontWeight="bold"
                    >
                      {progress.remaining}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.8 }}>
                      Remaining
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Progress Bar */}
              <Box mb={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body2" fontWeight={500} sx={{ color: "text.primary" }}>
                    Progress ({progress.percentage}%)
                  </Typography>
                  <Chip
                    label={
                      progress.isComplete
                        ? "Complete!"
                        : detailedStats.isAheadOfSchedule
                          ? "Ahead of Schedule"
                          : progress.isOnTrack
                            ? "On Track"
                            : "Behind Schedule"
                    }
                    color={getProgressColor()}
                    size="small"
                    icon={
                      progress.isComplete ? (
                        <TrophyIcon />
                      ) : detailedStats.isAheadOfSchedule ? (
                        <GoalIcon />
                      ) : progress.isOnTrack ? (
                        <OnTrackIcon />
                      ) : (
                        <BehindIcon />
                      )
                    }
                  />
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={Math.min(progress.percentage, 100)}
                  color={getProgressColor()}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 6,
                    },
                  }}
                />

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                    0 books
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                    Expected: {detailedStats.expectedBooks}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                    {progress.target} books
                  </Typography>
                </Box>
              </Box>



              {/* Detailed Statistics */}
              <Box mb={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  sx={{ color: "text.primary" }}
                >
                  <StatsIcon color="primary" />
                  Reading Statistics
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 1.5, textAlign: "center" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={0.5}
                      >
                        <PaceIcon fontSize="small" color="action" />
                        <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                          Avg/Month
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary" }}>
                        {detailedStats.avgBooksPerMonth.toFixed(1)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 1.5, textAlign: "center" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={0.5}
                      >
                        <ChartIcon fontSize="small" color="action" />
                        <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                          Projected
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary" }}>
                        {detailedStats.projectedYearEnd}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 1.5, textAlign: "center" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={0.5}
                      >
                        <StreakIcon fontSize="small" color="error" />
                        <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                          30-Day Streak
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="error.main"
                      >
                        {detailedStats.currentStreak}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 1.5, textAlign: "center" }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={0.5}
                      >
                        <BookIcon fontSize="small" color="action" />
                        <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.7 }}>
                          Pages Read
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: "text.primary" }}>
                        {detailedStats.totalPages.toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Monthly Progress Chart */}
              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Monthly Progress
                </Typography>
                <Box display="flex" gap={0.5} alignItems="end" height={60}>
                  {detailedStats.monthlyData.map((month) => (
                    <Box
                      key={month.month}
                      flex={1}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {month.count > 0 && (
                        <Tooltip title={`${month.count} book${month.count !== 1 ? 's' : ''}`}>
                          <Box
                            sx={{
                              width: "100%",
                              bgcolor: "primary.main",
                              height: `${Math.max(month.count * 10, 4)}px`,
                              borderRadius: 0.5,
                              mb: 0.5,
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ color: "text.primary", opacity: 0.7 }}
                        fontSize="0.7rem"
                      >
                        {month.month}
                      </Typography>

                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Achievements */}
              <Box mb={3}>
                <Typography
                  variant="h6"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                  sx={{ color: "text.primary", mb: 2 }}
                >
                  🏆 Achievements
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {getAllAchievements().map((achievement, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: achievement.achieved
                          ? `${achievement.color}.50`
                          : (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                        border: achievement.achieved
                          ? `2px solid`
                          : "2px solid transparent",
                        borderColor: achievement.achieved
                          ? `${achievement.color}.main`
                          : "transparent",
                        opacity: achievement.achieved ? 1 : (theme) => theme.palette.mode === 'dark' ? 0.8 : 0.6,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: achievement.achieved
                            ? `${achievement.color}.main`
                            : (theme) => theme.palette.mode === 'dark' ? 'grey.600' : 'grey.400',
                          color: "white",
                          fontSize: "1.2rem"
                        }}
                      >
                        {achievement.icon}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          sx={{
                            color: achievement.achieved
                              ? `${achievement.color}.main`
                              : "text.disabled"
                          }}
                        >
                          {achievement.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: achievement.achieved
                              ? "text.primary"
                              : "text.disabled"
                          }}
                        >
                          {achievement.description}
                        </Typography>
                      </Box>
                      {achievement.achieved && (
                        <CheckCircle
                          sx={{
                            color: `${achievement.color}.main`,
                            fontSize: 20
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Goal Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ color: "text.primary" }}>Edit Reading Goal</Typography>
            <IconButton onClick={() => setDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 3, ...textFieldSx }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={goalYear}
                label="Year"
                onChange={(e) => setGoalYear(e.target.value)}
                sx={textFieldSx}
              >
                {getYearOptions().map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Number of books to read"
              type="number"
              value={goalTarget || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setGoalTarget("");
                  setErrors({});
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue)) {
                    setGoalTarget(numValue);
                    setErrors({});
                  }
                }
              }}
              error={!!errors.target}
              helperText={errors.target || "Adjust your reading goal"}
              inputProps={{ min: 1, max: 365 }}
              sx={textFieldSx}
            />

            {progress && detailedStats && (
              <Box mt={2}>
                {progress.current > goalTarget && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      Great job exceeding your original goal!
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSetGoal}>
            Update Goal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReadingGoal;
