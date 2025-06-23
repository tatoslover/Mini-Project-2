## 📚 Reading Tracker - Book Management App
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/tatoslover/Mini-Project-2)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-brightgreen?logo=netlify)](https://reading-tracker-app.netlify.app)

Track your reading journey with progress monitoring, book discovery, and personalized statistics.

- 📖 Powered by [Google Books API](https://developers.google.com/books) (~40M books)
- 🎨 Built with React 19, Material-UI, React Router
- ⚡ Fast, responsive, animated interface with theme switching

## Project File Structure Overview

### Root Files
- `index.html` - Main entry point with React root container
- `README.md` - Project documentation
- `package.json` - Dependencies and build scripts
- `vite.config.js` - Vite build configuration

<details>
<summary>📁 Src Directory</summary>

- `src/main.jsx` - Application entry point with React 19 rendering
- `src/App.jsx` - Root component with routing and context providers
- `src/App.css` - Global styles and CSS custom properties
</details>

<details>
<summary>📁 Components Directory</summary>

`components/BookCard.jsx` - Individual Book Display
- Comprehensive book information with cover images
- Interactive rating system with 5-star reviews
- Status management (Wishlist → Currently Reading → Finished)
- Progress tracking with visual indicators
- Context menu with edit/delete/status change options

`components/BookForm.jsx` - Add/Edit Book Interface
- Integrated Google Books API search with real-time results
- Auto-fill functionality from search results
- Comprehensive form validation
- Dynamic fields based on book status
- Image preview and URL validation

`components/BookTrackerLayout.jsx` - Navigation Layout
- Responsive sidebar navigation with book counts
- Animated book logo with page-turning effects
- Theme toggle (Light/Dark mode)
- Mobile-optimized drawer navigation
- Reading statistics in sidebar
</details>

<details>
<summary>📁 Pages Directory</summary>

`pages/BookTrackerHome.jsx` - Dashboard Overview
- Reading statistics and progress analytics
- Recently finished books showcase
- Currently reading books with progress bars
- Quick action buttons and navigation shortcuts
- Motivational reading insights

`pages/AllBooks.jsx` - Complete Library Management
- Advanced filtering system (status, author, rating, year)
- Multi-criteria search and sorting options
- Grid/List view toggle
- Bulk operations and batch status changes
- Real-time filtering with 400+ books support

`pages/WishlistPage.jsx` - Want to Read Collection
- Books organized by categories and genres
- Reading challenge calculations
- Estimated reading time analysis
- Quick add workflow from search
- Progress tracking towards reading goals

`pages/CurrentlyReadingPage.jsx` - Active Reading Tracker
- Visual progress bars with percentage completion
- Quick progress updates with interactive sliders
- Reading statistics (pages read/remaining)
- Books grouped by progress ranges
- Motivational tips and reading insights

`pages/FinishedPage.jsx` - Completed Books Archive
- Achievement display with reading milestones
- Interactive rating and review system
- Reading pattern analysis and insights
- Top-rated books showcase
- Year-over-year reading statistics
</details>

<details>
<summary>📁 Contexts Directory</summary>

`contexts/BookContext.jsx` - Global Book State Management
- `useReducer` for complex state transitions
- CRUD operations (Create, Read, Update, Delete)
- Automatic status transitions based on progress
- Local storage persistence with cross-tab sync
- Book statistics and analytics calculation

`contexts/ThemeContext.jsx` - Theme Management System
- Light/Dark mode switching with system preference detection
- Custom Material-UI theme configurations
- localStorage persistence for theme preferences
- Dynamic theme transitions and animations
</details>

<details>
<summary>📁 Hooks Directory</summary>

`hooks/useBookSearch.js` - Google Books API Integration
- Real-time book search with debouncing
- Error handling and retry mechanisms
- Loading states and progress tracking
- Data transformation from API format
- Search result caching for performance

`hooks/useLocalStorage.js` - Storage Utilities
- Cross-tab synchronization with storage events
- Data validation and migration support
- Automatic cleanup and garbage collection
- Conflict resolution for concurrent updates
</details>

---

## 🎯 Key Features & Functionality

<details>
<summary>⚙️ Performance Optimizations</summary>

- React.memo for expensive component re-renders
- useCallback optimization for event handlers
- Bundle optimization with Vite code splitting
- Lazy loading of book images and metadata
- Efficient re-rendering with proper dependency arrays
</details>

<details>
<summary>📊 Data Management</summary>

- Google Books API integration for book discovery
- Local storage persistence across browser sessions
- Cross-tab synchronization for multi-window support
- Automatic data migration and schema evolution
- Real-time search with instant results
</details>

<details>
<summary>📱 User Experience</summary>

- Mobile-first responsive design with Material-UI
- Smooth page transitions and loading animations
- Interactive progress tracking with sliders
- Theme switching (Light/Dark) with persistence
- Advanced filtering and sorting capabilities
- Accessibility features (keyboard navigation, ARIA labels)
</details>

<details>
<summary>🧱 Technical Architecture</summary>

- Modern React 19 with functional components and hooks
- Context API for global state management
- React Router for client-side navigation
- Material-UI component library with custom theming
- Vite for fast development and optimized builds
- ESLint for code quality and consistency
</details>

<details>
<summary>🎨 Advanced React Patterns</summary>

- useReducer for complex state management
- Custom hooks for reusable logic
- Context providers for global state
- Component composition patterns
- Performance optimization techniques
- Error boundaries and graceful error handling
</details>

---

## 🚀 React Concepts Demonstrated

<details>
<summary>🪝 React Hooks Mastery</summary>

- `useState` - Local component state management
- `useEffect` - Side effects and lifecycle management  
- `useReducer` - Complex state transitions in BookContext
- `useContext` - Global state consumption
- `useCallback` - Performance optimization for API calls
- `useMemo` - Expensive calculations (filtering, sorting)
- Custom hooks (`useBookSearch`, `useLocalStorage`)
</details>

<details>
<summary>🌐 Context API Implementation</summary>

- Multiple context providers (BookContext, ThemeContext)
- Provider pattern for clean state separation
- Cross-component communication
- State persistence and synchronization
</details>

<details>
<summary>🛣️ React Router Integration</summary>

- Nested routing with layout components
- Programmatic navigation
- Route parameters and query strings
- Protected routes and redirects
</details>

---

The application demonstrates production-ready React development with modern patterns, showcasing a comprehensive book management system that combines external API integration, advanced state management, and professional UI/UX design through an engaging reading tracker platform.