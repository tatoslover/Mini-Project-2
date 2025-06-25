import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BookProvider } from "./contexts/BookContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CustomThemeProvider, useTheme } from "./contexts/ThemeContext";
import BookTrackerLayout from "./components/BookTrackerLayout";
import BookTrackerHome from "./pages/BookTrackerHome";
import AllBooks from "./pages/AllBooks";
import WishlistPage from "./pages/WishlistPage";
import CurrentlyReadingPage from "./pages/CurrentlyReadingPage";
import FinishedPage from "./pages/FinishedPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { setupDemoData } from "./utils/setupDemo";
import "./App.css";

function AppContent() {
  const { theme } = useTheme();

  // Setup demo data on app load
  useEffect(() => {
    setupDemoData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <BookProvider>
            <ProtectedRoute>
              <Router>
                <Box
                  className="App"
                  sx={{
                    minHeight: "100vh",
                    backgroundColor: "background.default",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Routes>
                    {/* Redirect root to book tracker demo */}
                    <Route
                      path="/"
                      element={<Navigate to="/booktracker-demo" replace />}
                    />

                    {/* Redirect old route to new route for backward compatibility */}
                    <Route
                      path="/book-tracker/*"
                      element={<Navigate to="/booktracker-demo" replace />}
                    />

                    {/* BookTracker Demo Routes */}
                    <Route path="/booktracker-demo" element={<BookTrackerLayout />}>
                      <Route
                        index
                        element={
                          <ErrorBoundary compact>
                            <BookTrackerHome />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="books"
                        element={
                          <ErrorBoundary compact>
                            <AllBooks />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="wishlist"
                        element={
                          <ErrorBoundary compact>
                            <WishlistPage />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="currently-reading"
                        element={
                          <ErrorBoundary compact>
                            <CurrentlyReadingPage />
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="finished"
                        element={
                          <ErrorBoundary compact>
                            <FinishedPage />
                          </ErrorBoundary>
                        }
                      />
                    </Route>
                  </Routes>
                </Box>
              </Router>
            </ProtectedRoute>
          </BookProvider>
        </AuthProvider>
      </ErrorBoundary>
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
