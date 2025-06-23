import { useState, useCallback } from "react";
import { useBooks } from "../contexts/BookContext";

const GOOGLE_BOOKS_API_BASE = "https://www.googleapis.com/books/v1/volumes";

// Custom hook for searching books using Google Books API
export const useBookSearch = () => {
  const { searchResults, searchLoading, setSearchResults, setSearchLoading, setError, clearError } =
    useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  // Transform Google Books API response to our book format
  const transformGoogleBook = (googleBook) => {
    const volumeInfo = googleBook.volumeInfo || {};
    const imageLinks = volumeInfo.imageLinks || {};

    return {
      googleId: googleBook.id,
      title: volumeInfo.title || "Unknown Title",
      authors: volumeInfo.authors || ["Unknown Author"],
      description: volumeInfo.description || "No description available",
      publishedDate: volumeInfo.publishedDate || "Unknown",
      pageCount: volumeInfo.pageCount || 0,
      categories: volumeInfo.categories || [],
      thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || null,
      isbn:
        volumeInfo.industryIdentifiers?.find((id) => id.type === "ISBN_13")
          ?.identifier ||
        volumeInfo.industryIdentifiers?.find((id) => id.type === "ISBN_10")
          ?.identifier ||
        null,
      language: volumeInfo.language || "en",
      publisher: volumeInfo.publisher || "Unknown Publisher",
      averageRating: volumeInfo.averageRating || 0,
      ratingsCount: volumeInfo.ratingsCount || 0,
      previewLink: volumeInfo.previewLink || null,
      infoLink: volumeInfo.infoLink || null,
    };
  };

  // Search books function
  const searchBooks = useCallback(
    async (query, maxResults = 20) => {
      if (!query || query.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      clearError();

      try {
        // Encode the search query
        const encodedQuery = encodeURIComponent(query.trim());
        const url = `${GOOGLE_BOOKS_API_BASE}?q=${encodedQuery}&maxResults=${maxResults}&printType=books&orderBy=relevance`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const transformedBooks = data.items.map(transformGoogleBook);
          setSearchResults(transformedBooks);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching books:", error);
        setError(`Failed to search books: ${error.message}`);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    },
    [setSearchResults, setSearchLoading, setError, clearError],
  );

  // Search by specific criteria
  const searchByTitle = useCallback(
    async (title, maxResults = 10) => {
      const query = `intitle:${title}`;
      await searchBooks(query, maxResults);
    },
    [searchBooks],
  );

  const searchByAuthor = useCallback(
    async (author, maxResults = 10) => {
      const query = `inauthor:${author}`;
      await searchBooks(query, maxResults);
    },
    [searchBooks],
  );

  const searchByISBN = useCallback(
    async (isbn) => {
      const query = `isbn:${isbn}`;
      await searchBooks(query, 1);
    },
    [searchBooks],
  );

  const searchByCategory = useCallback(
    async (category, maxResults = 20) => {
      const query = `subject:${category}`;
      await searchBooks(query, maxResults);
    },
    [searchBooks],
  );

  // Advanced search with multiple criteria
  const advancedSearch = useCallback(
    async (criteria, maxResults = 20) => {
      const queryParts = [];

      if (criteria.title) {
        queryParts.push(`intitle:${criteria.title}`);
      }

      if (criteria.author) {
        queryParts.push(`inauthor:${criteria.author}`);
      }

      if (criteria.subject) {
        queryParts.push(`subject:${criteria.subject}`);
      }

      if (criteria.publisher) {
        queryParts.push(`inpublisher:${criteria.publisher}`);
      }

      if (criteria.isbn) {
        queryParts.push(`isbn:${criteria.isbn}`);
      }

      if (queryParts.length === 0) {
        setSearchResults([]);
        return;
      }

      const query = queryParts.join("+");
      await searchBooks(query, maxResults);
    },
    [searchBooks, setSearchResults],
  );

  // Get book details by Google Books ID
  const getBookDetails = useCallback(
    async (googleId) => {
      setSearchLoading(true);
      clearError();

      try {
        const url = `${GOOGLE_BOOKS_API_BASE}/${googleId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return transformGoogleBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError(`Failed to fetch book details: ${error.message}`);
        return null;
      } finally {
        setSearchLoading(false);
      }
    },
    [setSearchLoading, setError, clearError],
  );

  // Clear search results
  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
    setSearchTerm("");
  }, [setSearchResults]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults: searchResults || [],
    searchLoading: searchLoading || false,
    searchBooks,
    searchByTitle,
    searchByAuthor,
    searchByISBN,
    searchByCategory,
    advancedSearch,
    getBookDetails,
    clearSearchResults,
  };
};

export default useBookSearch;
