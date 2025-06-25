import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

// Book statuses
export const BOOK_STATUS = {
  WISHLIST: "wishlist",
  CURRENTLY_READING: "currentlyReading",
  FINISHED: "finished",
};

// Initial state
const initialState = {
  books: [],
  searchResults: [],
  searchLoading: false,
  filters: {
    status: "all",
    sortBy: "title",
    sortOrder: "asc",
  },
  readingGoals: {
    // Default goal for current year
    [new Date().getFullYear()]: {
      target: 12,
      isActive: true,
    },
  },
};

// Action types
const BOOK_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  ADD_BOOK: "ADD_BOOK",
  UPDATE_BOOK: "UPDATE_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
  SET_BOOKS: "SET_BOOKS",
  SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
  SET_SEARCH_LOADING: "SET_SEARCH_LOADING",
  CLEAR_SEARCH: "CLEAR_SEARCH",
  SET_FILTERS: "SET_FILTERS",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_READING_GOAL: "SET_READING_GOAL",
  UPDATE_READING_GOAL: "UPDATE_READING_GOAL",
};

// Reducer function
function bookReducer(state, action) {
  switch (action.type) {
    case BOOK_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case BOOK_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case BOOK_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };

    case BOOK_ACTIONS.SET_BOOKS:
      return { ...state, books: action.payload, loading: false };

    case BOOK_ACTIONS.ADD_BOOK:
      return {
        ...state,
        books: [
          ...state.books,
          { ...action.payload, id: Date.now().toString() },
        ],
        loading: false,
      };

    case BOOK_ACTIONS.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book,
        ),
        loading: false,
      };

    case BOOK_ACTIONS.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        loading: false,
      };

    case BOOK_ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload, searchLoading: false };

    case BOOK_ACTIONS.SET_SEARCH_LOADING:
      return { ...state, searchLoading: action.payload };

    case BOOK_ACTIONS.CLEAR_SEARCH:
      return { ...state, searchResults: [], searchLoading: false };

    case BOOK_ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case BOOK_ACTIONS.SET_READING_GOAL:
      return { ...state, readingGoals: action.payload };

    case BOOK_ACTIONS.UPDATE_READING_GOAL:
      return {
        ...state,
        readingGoals: { ...state.readingGoals, ...action.payload },
      };

    default:
      return state;
  }
}

// Create context
const BookContext = createContext();

// Custom hook to use book context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

// Book provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const { user } = useAuth();

  // Load books and reading goal from localStorage when user changes
  useEffect(() => {
    // Clear user data when user logs out
    if (!user) {
      dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: [] });
      dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: initialState.readingGoals });
      return;
    }

    const savedBooks = localStorage.getItem("reading-tracker-books");
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: parsedBooks });
      } catch (error) {
        console.error("Error loading books from localStorage:", error);
      }
    } else {
      // No saved books, start with empty array
      dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: [] });
    }

    // Load reading goals from localStorage (try both old and new keys for backward compatibility)
    const savedGoals = localStorage.getItem("bookTracker_readingGoals") || localStorage.getItem("reading-tracker-goal");
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);

        // Handle backward compatibility - convert old single goal format to new multi-year format
        if (parsedGoals.year && parsedGoals.target) {
          // Old format - convert to new format
          const convertedGoals = {
            [parsedGoals.year]: {
              target: parsedGoals.target,
              isActive: parsedGoals.isActive || true,
            },
          };
          dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: convertedGoals });
        } else {
          // New format - use as is
          dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: parsedGoals });
        }
      } catch (error) {
        console.error("Error loading reading goals from localStorage:", error);
        dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: initialState.readingGoals });
      }
    } else {
      // No saved goals, use initial state
      dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: initialState.readingGoals });
    }
  }, [user]);

  // Save books to localStorage whenever books change
  useEffect(() => {
    if (state.books.length > 0) {
      localStorage.setItem(
        "reading-tracker-books",
        JSON.stringify(state.books),
      );
    }
  }, [state.books]);

  // Save reading goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "bookTracker_readingGoals",
      JSON.stringify(state.readingGoals),
    );
  }, [state.readingGoals]);

  // Action creators
  const addBook = (book) => {
    const newBook = {
      ...book,
      dateAdded: new Date().toISOString(),
      status: book.status || BOOK_STATUS.WISHLIST,
      rating: book.rating || 0,
      notes: book.notes || "",
      progress: book.progress || 0,
    };
    dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: newBook });
  };

  const updateBook = (bookId, updates) => {
    dispatch({
      type: BOOK_ACTIONS.UPDATE_BOOK,
      payload: {
        id: bookId,
        ...updates,
        dateModified: new Date().toISOString(),
      },
    });
  };

  const deleteBook = (bookId) => {
    dispatch({ type: BOOK_ACTIONS.DELETE_BOOK, payload: bookId });
  };

  const setSearchResults = (results) => {
    dispatch({ type: BOOK_ACTIONS.SET_SEARCH_RESULTS, payload: results });
  };

  const setSearchLoading = (loading) => {
    dispatch({ type: BOOK_ACTIONS.SET_SEARCH_LOADING, payload: loading });
  };

  const clearSearch = () => {
    dispatch({ type: BOOK_ACTIONS.CLEAR_SEARCH });
  };

  const setFilters = (filters) => {
    dispatch({ type: BOOK_ACTIONS.SET_FILTERS, payload: filters });
  };

  const setError = (error) => {
    dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: BOOK_ACTIONS.CLEAR_ERROR });
  };

  // Computed values
  const getFilteredBooks = () => {
    let filtered = [...state.books];

    // Filter by status
    if (state.filters.status !== "all") {
      filtered = filtered.filter(
        (book) => book.status === state.filters.status,
      );
    }

    // Sort books
    filtered.sort((a, b) => {
      const { sortBy, sortOrder } = state.filters;
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === "string") {
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
  };

  const getBooksByStatus = (status) => {
    return state.books.filter((book) => book.status === status);
  };

  const getBookStats = () => {
    const total = state.books.length;
    const finished = getBooksByStatus(BOOK_STATUS.FINISHED).length;
    const currentlyReading = getBooksByStatus(
      BOOK_STATUS.CURRENTLY_READING,
    ).length;
    const wishlist = getBooksByStatus(BOOK_STATUS.WISHLIST).length;

    return { total, finished, currentlyReading, wishlist };
  };

  const setReadingGoal = useCallback((year, target) => {
    const updatedGoals = {
      ...state.readingGoals,
      [year]: {
        target,
        isActive: true,
      },
    };
    dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: updatedGoals });
  }, [state.readingGoals]);

  const updateReadingGoal = useCallback((year, updates) => {
    const updatedGoals = {
      ...state.readingGoals,
      [year]: {
        ...state.readingGoals[year],
        ...updates,
      },
    };
    dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: updatedGoals });
  }, [state.readingGoals]);

  // Helper function to get a reading goal for a specific year (read-only)
  const getReadingGoalForYear = (year) => {
    // If goal exists, return it
    if (state.readingGoals[year]) {
      return { ...state.readingGoals[year], year };
    }

    // Return default goal without saving (to prevent infinite loops)
    return {
      target: 12,
      isActive: true,
      year,
    };
  };

  // Helper function to ensure a reading goal exists for a specific year
  const ensureReadingGoalForYear = useCallback((year) => {
    // Only create if it doesn't exist AND we haven't just updated it
    if (!state.readingGoals[year]) {
      const updatedGoals = {
        ...state.readingGoals,
        [year]: { target: 12, isActive: true },
      };
      dispatch({ type: BOOK_ACTIONS.SET_READING_GOAL, payload: updatedGoals });
    }
  }, [state.readingGoals]);

  const getReadingGoalProgress = (year = null) => {
    const targetYear = year || new Date().getFullYear();
    const goalForYear = getReadingGoalForYear(targetYear);

    if (!goalForYear.isActive) {
      return null;
    }

    const finishedThisYear = state.books.filter((book) => {
      if (book.status !== BOOK_STATUS.FINISHED) {
        return false;
      }
      // Check both dateFinished and dateRead for compatibility
      const dateToCheck = book.dateFinished || book.dateRead;
      if (!dateToCheck) {
        return false;
      }
      const finishedYear = new Date(dateToCheck).getFullYear();
      return finishedYear === targetYear;
    }).length;

    const target = goalForYear.target;
    const percentage =
      target > 0 ? Math.round((finishedThisYear / target) * 100) : 0;
    const remaining = Math.max(0, target - finishedThisYear);
    const isComplete = finishedThisYear >= target;

    // Calculate monthly pace
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const expectedByNow = Math.round((target / 12) * currentMonth);
    const isOnTrack = finishedThisYear >= expectedByNow;

    return {
      current: finishedThisYear,
      target,
      percentage,
      remaining,
      isComplete,
      isOnTrack,
      expectedByNow,
      year: targetYear,
    };
  };

  const contextValue = {
    // State
    ...state,

    // Actions
    addBook,
    updateBook,
    deleteBook,
    setSearchResults,
    setSearchLoading,
    clearSearch,
    setFilters,
    setError,
    clearError,

    // Reading Goal Actions
    setReadingGoal,
    updateReadingGoal,
    getReadingGoalForYear,
    ensureReadingGoalForYear,

    // Computed values
    getFilteredBooks,
    getBooksByStatus,
    getBookStats,
    getReadingGoalProgress,

    // Constants
    BOOK_STATUS,
  };

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};

export default BookContext;
