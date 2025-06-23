import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Enhanced theme configurations with gradients and visual effects
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
      light: '#1976d2',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#c51162',
      light: '#dc004e',
      dark: '#ad1457',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#f57c00',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#f44336',
      dark: '#c62828',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      gradient: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
      gradientSecondary: 'linear-gradient(135deg, #c51162 0%, #ad1457 100%)',
      gradientSuccess: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#616161',
      gradient: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    brandFont: '"Orbitron", monospace',
    h1: {
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h2: {
      fontWeight: 600,
      color: '#1a1a1a',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Roboto", sans-serif',
          background: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(135deg, #c51162 0%, #ad1457 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          borderRadius: 15,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          border: 'none',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(13,110,253,0.3)',
          },
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
            transform: 'none',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
            border: 'none',
            color: '#ffffff',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(135deg, #c51162 0%, #ad1457 100%)',
            border: 'none',
            color: '#ffffff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&.Mui-focused': {
              transform: 'scale(1.02)',
              boxShadow: '0 0 0 0.2rem rgba(13,110,253,0.25)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.05)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
        colorSuccess: {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
        },
        colorError: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '0.75rem',
          fontWeight: 600,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#bbdefb',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',
      light: '#f8bbd9',
      dark: '#f06292',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      gradientSecondary: 'linear-gradient(135deg, #c51162 0%, #ad1457 100%)',
      gradientSuccess: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      gradient: 'linear-gradient(135deg, #90caf9 0%, #f48fb1 100%)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    brandFont: '"Orbitron", monospace',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(135deg, #90caf9 0%, #f48fb1 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      background: 'linear-gradient(135deg, #90caf9 0%, #f48fb1 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Roboto", sans-serif',
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#333',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #90caf9 0%, #f48fb1 100%)',
          borderRadius: '10px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(135deg, #c51162 0%, #ad1457 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          borderRadius: 15,
          backgroundColor: '#1e1e1e',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          border: 'none',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(144,202,249,0.3)',
          },
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
            transform: 'none',
          },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #90caf9 0%, #f48fb1 100%)',
            border: 'none',
          },
          '&.MuiButton-containedSecondary': {
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
            '&.Mui-focused': {
              transform: 'scale(1.02)',
              boxShadow: '0 0 0 0.2rem rgba(144,202,249,0.25)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.05)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
        colorSuccess: {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
        },
        colorError: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          backgroundColor: '#1e1e1e',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '0.75rem',
          fontWeight: 600,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
      },
    },
  },
});

// Create context
const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
export const CustomThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('reading-tracker-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reading-tracker-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const contextValue = {
    isDarkMode,
    toggleTheme,
    theme: currentTheme,
    themeName: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
