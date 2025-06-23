import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BookProvider } from "./contexts/BookContext";
import { CustomThemeProvider, useTheme } from "./contexts/ThemeContext";
import BookTrackerLayout from "./components/BookTrackerLayout";
import BookTrackerHome from "./pages/BookTrackerHome";
import AllBooks from "./pages/AllBooks";
import WishlistPage from "./pages/WishlistPage";
import CurrentlyReadingPage from "./pages/CurrentlyReadingPage";
import FinishedPage from "./pages/FinishedPage";
import "./App.css";

function AppContent() {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Redirect root to book tracker */}
              <Route path="/" element={<Navigate to="/book-tracker" replace />} />

              {/* Book Tracker Routes */}
              <Route path="/book-tracker" element={<BookTrackerLayout />}>
                <Route index element={<BookTrackerHome />} />
                <Route path="books" element={<AllBooks />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="currently-reading" element={<CurrentlyReadingPage />} />
                <Route path="finished" element={<FinishedPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
