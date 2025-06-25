## 📚 BookTrackerDemo - Book Management App
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/tatoslover/Mini-Project-2)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-brightgreen?logo=netlify)](https://booktrackerdemo.netlify.app)

Track your reading journey with progress monitoring, book discovery, and personalized statistics. This is a demo version showcasing the full functionality of the BookTracker application.

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

`contexts/AuthContext.jsx` - Authentication & User Management
- User authentication with demo login system
- Forgot password functionality with reset codes
- Session persistence and state management
- User profile data and reading statistics
- Demo book collection initialization
- Cross-component authentication state

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

---

## 📚 Demo Book Collection

The application includes a curated collection of 30 demo books across different categories, featuring a mix of classic literature, contemporary fiction, non-fiction, and popular titles to showcase the full functionality of the reading tracker.

### Collection Overview
- **Total Books**: 30
- **Wishlist**: 6 books
- **Currently Reading**: 3 books
- **Finished (2025)**: 11 books
- **Finished (2024)**: 6 books
- **Finished (2023)**: 3 books
- **Current Year Finished**: 1 book

### Featured Books with Cover Images
The collection includes several books with embedded cover images from reliable CDN sources:

**Classic Literature:**
- *Moby Dick* by Herman Melville (1851)
- *The Great Gatsby* by F. Scott Fitzgerald
- *1984* by George Orwell
- *The Catcher in the Rye* by J.D. Salinger

**Fantasy & Science Fiction:**
- *The Lord of the Rings* trilogy (The Fellowship, The Two Towers, The Return of the King)
- *Dune* by Frank Herbert
- *The Hitchhiker's Guide to the Galaxy* by Douglas Adams
- *Good Omens* by Terry Pratchett & Neil Gaiman

**Contemporary Fiction:**
- *Red, White & Royal Blue* by Casey McQuiston
- *Call Me By Your Name* by André Aciman
- *Beach Read* by Emily Henry

**Romance & Historical Fiction:**
- *The Duke and I* by Julia Quinn
- *Pride and Prejudice* by Jane Austen
- *Outlander* by Diana Gabaldon

**Non-Fiction & Memoir:**
- *Me Talk Pretty One Day* by David Sedaris
- *The Fear Bubble* by Ant Middleton
- *The Liar* by Stephen Fry

### Book Organization Features

**Lord of the Rings Reading Journey:**
The collection showcases a complete LOTR reading progression:
- *The Hobbit* (2023 - Foundation)
- *The Fellowship of the Ring* (2024 - Beginning the quest)
- *The Two Towers* (2025 - Continuing the journey)
- *The Return of the King* (Current - Epic conclusion)

**Reading Status Distribution:**
- **Wishlist**: Includes classics like *Moby Dick*, *Catch-22*, and contemporary hits
- **Currently Reading**: Active progress tracking on *Good Omens* (45%), *Beach Read* (40%), and *The Importance of Being Earnest* (60%)
- **Finished Books**: Organized by year with ratings and reviews, showcasing reading habits over time

**Cover Image Implementation:**
- High-quality cover images from reliable CDN sources
- Fallback to default placeholder for books without covers
- Optimized loading and responsive display across devices

This diverse collection demonstrates the app's capability to handle various genres, track reading progress over multiple years, and provide rich visual representation of your personal library.
