import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Book statuses
export const BOOK_STATUS = {
  WISHLIST: 'wishlist',
  CURRENTLY_READING: 'currentlyReading',
  FINISHED: 'finished'
};

// Initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  filters: {
    status: 'all',
    sortBy: 'title',
    sortOrder: 'asc'
  }
};

// Action types
const BOOK_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_BOOK: 'ADD_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SET_BOOKS: 'SET_BOOKS',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_SEARCH_LOADING: 'SET_SEARCH_LOADING',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_ERROR: 'CLEAR_ERROR'
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
        books: [...state.books, { ...action.payload, id: Date.now().toString() }],
        loading: false
      };

    case BOOK_ACTIONS.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        ),
        loading: false
      };

    case BOOK_ACTIONS.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        loading: false
      };

    case BOOK_ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload, searchLoading: false };

    case BOOK_ACTIONS.SET_SEARCH_LOADING:
      return { ...state, searchLoading: action.payload };

    case BOOK_ACTIONS.CLEAR_SEARCH:
      return { ...state, searchResults: [], searchLoading: false };

    case BOOK_ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

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
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

// Book provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Load books from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('reading-tracker-books');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        dispatch({ type: BOOK_ACTIONS.SET_BOOKS, payload: parsedBooks });
      } catch (error) {
        console.error('Error loading books from localStorage:', error);
        dispatch({ type: BOOK_ACTIONS.SET_ERROR, payload: 'Failed to load saved books' });
      }
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    if (state.books.length > 0) {
      localStorage.setItem('reading-tracker-books', JSON.stringify(state.books));
    }
  }, [state.books]);

  // Action creators
  const addBook = (book) => {
    const newBook = {
      ...book,
      dateAdded: new Date().toISOString(),
      status: book.status || BOOK_STATUS.WISHLIST,
      rating: book.rating || 0,
      notes: book.notes || '',
      progress: book.progress || 0
    };
    dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: newBook });
  };

  const updateBook = (bookId, updates) => {
    dispatch({
      type: BOOK_ACTIONS.UPDATE_BOOK,
      payload: { id: bookId, ...updates, dateModified: new Date().toISOString() }
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
    if (state.filters.status !== 'all') {
      filtered = filtered.filter(book => book.status === state.filters.status);
    }

    // Sort books
    filtered.sort((a, b) => {
      const { sortBy, sortOrder } = state.filters;
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  };

  const getBooksByStatus = (status) => {
    return state.books.filter(book => book.status === status);
  };

  const getBookStats = () => {
    const total = state.books.length;
    const finished = getBooksByStatus(BOOK_STATUS.FINISHED).length;
    const currentlyReading = getBooksByStatus(BOOK_STATUS.CURRENTLY_READING).length;
    const wishlist = getBooksByStatus(BOOK_STATUS.WISHLIST).length;

    return { total, finished, currentlyReading, wishlist };
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

    // Computed values
    getFilteredBooks,
    getBooksByStatus,
    getBookStats,

    // Constants
    BOOK_STATUS
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
