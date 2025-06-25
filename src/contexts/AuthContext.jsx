import React, { createContext, useContext, useReducer, useEffect } from "react";

// Auth states
export const AUTH_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

// Initial state
const initialState = {
  user: null,
  status: AUTH_STATUS.LOADING,
  error: null,
  resetToken: null,
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  LOGOUT: "LOGOUT",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_RESET_TOKEN: "SET_RESET_TOKEN",
  CLEAR_RESET_TOKEN: "CLEAR_RESET_TOKEN",
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        status: AUTH_STATUS.LOADING,
        error: null,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        status: AUTH_STATUS.AUTHENTICATED,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        status: AUTH_STATUS.UNAUTHENTICATED,
        user: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        status: AUTH_STATUS.UNAUTHENTICATED,
        error: null,
        resetToken: null,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.SET_RESET_TOKEN:
      return {
        ...state,
        resetToken: action.payload,
        error: null,
      };

    case AUTH_ACTIONS.CLEAR_RESET_TOKEN:
      return {
        ...state,
        resetToken: null,
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("bookTracker_user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
        } else {
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    // Clean up users and keep only demo user
    const cleanupUsers = () => {
      try {
        // Reset to only demo user
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          username: "demo",
          password: "demo123",
          createdAt: "2023-01-01T00:00:00.000Z",
          avatar: "https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff",
        };

        localStorage.setItem("bookTracker_users", JSON.stringify([demoUser]));
        console.log("Users cleaned up, only demo user remains");
      } catch (error) {
        console.error("Error cleaning up users:", error);
      }
    };

    cleanupUsers();
    loadUser();
  }, []);

  // Demo books data - Classics and Fun Books
  const createDemoBooks = () => [
    // Wishlist Books (classics to read)
    {
      id: "demo-1",
      title: "Moby Dick",
      authors: ["Herman Melville"],
      publishedDate: "1851",
      description: "The epic tale of Captain Ahab's obsessive quest to kill the white whale.",
      pageCount: 635,
      categories: ["Literary Fiction"],
      status: "wishlist",
      dateAdded: "2024-11-15T14:30:00.000Z",
      rating: 0,
      notes: "The ultimate maritime adventure classic!",
      isbn: "9780142437247",
      thumbnail: "https://cdn.shopify.com/s/files/1/0625/6679/3413/files/Moby-Dick_489102ac-b2ae-4f9f-abad-c9581d6c0a43.jpg?v=1716724503"
    },
    {
      id: "demo-2",
      title: "The Princess Bride",
      authors: ["William Goldman"],
      publishedDate: "1973",
      description: "A tale of true love, high adventure, pirates, and revenge.",
      pageCount: 456,
      categories: ["Fantasy"],
      status: "wishlist",
      dateAdded: "2024-12-01T09:45:00.000Z",
      rating: 0,
      notes: "Inconceivable that I haven't read this yet!",
      isbn: "9780156035217"
    },
    {
      id: "demo-3",
      title: "Catch-22",
      authors: ["Joseph Heller"],
      publishedDate: "1961",
      description: "A satirical novel about World War II bomber crews.",
      pageCount: 453,
      categories: ["Historical Fiction"],
      status: "wishlist",
      dateAdded: "2024-10-20T16:15:00.000Z",
      rating: 0,
      notes: "Classic dark comedy about the absurdity of war",
      isbn: "9781451626650"
    },

    // Currently Reading Books
    {
      id: "demo-5",
      title: "Good Omens",
      authors: ["Terry Pratchett", "Neil Gaiman"],
      publishedDate: "1990",
      description: "The apocalypse is coming, but an angel and demon team up to prevent it.",
      pageCount: 400,
      categories: ["Fantasy"],
      status: "currentlyReading",
      dateAdded: "2024-11-01T11:30:00.000Z",
      dateStarted: "2025-01-15T19:45:00.000Z",
      progress: 45,
      rating: 0,
      notes: "Pratchett + Gaiman = comedy gold!",
      isbn: "9780060853976",
      thumbnail: "https://lamplightbooks.co.nz/cdn/shop/files/9780552171892.jpg?v=1744078605"
    },

    // 2025 Finished Books (first half of year)
    {
      id: "demo-14",
      title: "The Lord of the Rings: The Two Towers",
      authors: ["J.R.R. Tolkien"],
      publishedDate: "1954",
      description: "The second volume continues the epic quest to destroy the Ring.",
      pageCount: 447,
      categories: ["Fantasy"],
      status: "finished",
      dateAdded: "2025-01-01T13:20:00.000Z",
      dateStarted: "2025-02-01T10:00:00.000Z",
      dateFinished: "2025-03-15T22:30:00.000Z",
      dateRead: "2025-03-15T22:30:00.000Z",
      yearRead: "2025",
      monthRead: "March",
      progress: 100,
      rating: 5,
      notes: "The battle of Helm's Deep! Tolkien's action sequences are incredible.",
      isbn: "9780547928203",
      thumbnail: "https://i.harperapps.com/hcanz/covers/9780008376130/x480.jpg"
    },
    {
      id: "demo-7",
      title: "The Hitchhiker's Guide to the Galaxy",
      authors: ["Douglas Adams"],
      publishedDate: "1979",
      description: "Don't panic! A comedic journey through space with improbable adventures.",
      pageCount: 216,
      categories: ["Science Fiction"],
      status: "finished",
      dateAdded: "2024-11-10T15:45:00.000Z",
      dateStarted: "2025-02-01T14:30:00.000Z",
      dateFinished: "2025-02-12T20:15:00.000Z",
      dateRead: "2025-02-12T20:15:00.000Z",
      yearRead: "2025",
      monthRead: "February",
      progress: 100,
      rating: 5,
      notes: "Absolutely hilarious! The answer really is 42.",
      isbn: "9780345391803",
      thumbnail: "https://images.thenile.io/r1000/9780345391803.jpg"
    },
    {
      id: "demo-8",
      title: "Pride and Prejudice",
      authors: ["Jane Austen"],
      publishedDate: "1813",
      description: "Elizabeth Bennet navigates love and social expectations in Regency England.",
      pageCount: 432,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2024-10-05T09:30:00.000Z",
      dateStarted: "2025-02-15T16:45:00.000Z",
      dateFinished: "2025-03-10T18:45:00.000Z",
      dateRead: "2025-03-10T18:45:00.000Z",
      yearRead: "2025",
      monthRead: "March",
      progress: 100,
      rating: 4,
      notes: "Austen's wit and social commentary are timeless.",
      isbn: "9780141439518"
    },
    {
      id: "demo-9",
      title: "Dune",
      authors: ["Frank Herbert"],
      publishedDate: "1965",
      description: "Political intrigue and mysticism on the desert planet Arrakis.",
      pageCount: 688,
      categories: ["Science Fiction"],
      status: "finished",
      dateAdded: "2024-09-20T11:15:00.000Z",
      dateStarted: "2025-03-15T12:30:00.000Z",
      dateFinished: "2025-04-20T21:00:00.000Z",
      dateRead: "2025-04-20T21:00:00.000Z",
      yearRead: "2025",
      monthRead: "April",
      progress: 100,
      rating: 5,
      notes: "Complex and brilliant. The spice must flow!",
      isbn: "9780441172719",
      thumbnail: "https://images.thenile.io/r1000/9781473233959.jpg"
    },
    {
      id: "demo-10",
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      publishedDate: "1925",
      description: "The decline of the American Dream in the Jazz Age.",
      pageCount: 180,
      categories: ["Literary Fiction"],
      status: "finished",
      dateAdded: "2024-08-10T13:40:00.000Z",
      dateStarted: "2025-05-01T10:15:00.000Z",
      dateFinished: "2025-05-15T14:30:00.000Z",
      dateRead: "2025-05-15T14:30:00.000Z",
      yearRead: "2025",
      monthRead: "May",
      progress: 100,
      rating: 4,
      notes: "Beautifully written critique of wealth and excess.",
      isbn: "9780743273565",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg"
    },
    {
      id: "demo-11",
      title: "The Colour of Magic",
      authors: ["Terry Pratchett"],
      publishedDate: "1983",
      description: "The first Discworld novel featuring the inept wizard Rincewind.",
      pageCount: 285,
      categories: ["Fantasy"],
      status: "finished",
      dateAdded: "2024-07-15T12:20:00.000Z",
      dateStarted: "2025-05-20T09:30:00.000Z",
      dateFinished: "2025-06-08T20:45:00.000Z",
      dateRead: "2025-06-08T20:45:00.000Z",
      yearRead: "2025",
      monthRead: "June",
      progress: 100,
      rating: 5,
      notes: "Pratchett's humour is genius. Death speaks in ALL CAPS!",
      isbn: "9780060855925"
    },
    {
      id: "demo-12",
      title: "To Kill a Mockingbird",
      authors: ["Harper Lee"],
      publishedDate: "1960",
      description: "A young girl's perspective on racial injustice in the American South.",
      pageCount: 376,
      categories: ["Literary Fiction"],
      status: "finished",
      dateAdded: "2024-06-10T11:30:00.000Z",
      dateStarted: "2025-06-10T14:15:00.000Z",
      dateFinished: "2025-06-28T19:30:00.000Z",
      dateRead: "2025-06-28T19:30:00.000Z",
      yearRead: "2025",
      monthRead: "June",
      progress: 100,
      rating: 5,
      notes: "Powerful and moving. Scout's innocence contrasts beautifully with harsh realities.",
      isbn: "9780060935467"
    },

    // Earlier years (2023-2024)
    {
      id: "demo-13",
      title: "1984",
      authors: ["George Orwell"],
      publishedDate: "1949",
      description: "A dystopian vision of totalitarian control and surveillance.",
      pageCount: 328,
      categories: ["Science Fiction"],
      status: "finished",
      dateAdded: "2023-01-10T11:30:00.000Z",
      dateStarted: "2023-02-01T14:15:00.000Z",
      dateFinished: "2023-02-20T19:30:00.000Z",
      dateRead: "2023-02-20T19:30:00.000Z",
      yearRead: "2023",
      monthRead: "February",
      progress: 100,
      rating: 5,
      notes: "Chillingly prophetic. Big Brother is always watching.",
      isbn: "9780451524935",
      thumbnail: "https://cdn.kobo.com/book-images/c9472126-7f96-402d-ba57-5ba4c0f4b238/1200/1200/False/nineteen-eighty-four-1984-george.jpg"
    },
    {
      id: "demo-4",
      title: "The Hobbit",
      authors: ["J.R.R. Tolkien"],
      publishedDate: "1937",
      description: "Bilbo Baggins goes on an unexpected journey to help reclaim the dwarves' homeland.",
      pageCount: 310,
      categories: ["Fantasy"],
      thumbnail: "https://i.harperapps.com/hcanz/covers/9780007270613/y648.jpg",
      status: "finished",
      dateAdded: "2023-01-15T16:20:00.000Z",
      dateStarted: "2023-02-01T08:00:00.000Z",
      dateFinished: "2023-03-15T22:30:00.000Z",
      dateRead: "2023-03-15T22:30:00.000Z",
      yearRead: "2023",
      monthRead: "March",
      progress: 100,
      rating: 5,
      notes: "Perfect gateway to Middle-earth!",
      isbn: "9780547928227"
    },
    {
      id: "demo-15",
      title: "Jane Eyre",
      authors: ["Charlotte Brontë"],
      publishedDate: "1847",
      description: "An orphaned governess finds love and independence despite hardship.",
      pageCount: 532,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2023-08-05T09:30:00.000Z",
      dateStarted: "2023-09-01T16:45:00.000Z",
      dateFinished: "2023-10-10T18:45:00.000Z",
      dateRead: "2023-10-10T18:45:00.000Z",
      yearRead: "2023",
      monthRead: "October",
      progress: 100,
      rating: 4,
      notes: "Jane's strength and independence were ahead of their time.",
      isbn: "9780141441146"
    },
    {
      id: "demo-6",
      title: "The Lord of the Rings: The Fellowship of the Ring",
      authors: ["J.R.R. Tolkien"],
      publishedDate: "1954",
      description: "The first volume of the epic fantasy trilogy.",
      pageCount: 481,
      categories: ["Fantasy"],
      status: "finished",
      dateAdded: "2024-01-01T13:20:00.000Z",
      dateStarted: "2024-02-01T10:00:00.000Z",
      dateFinished: "2024-03-28T22:30:00.000Z",
      dateRead: "2024-03-28T22:30:00.000Z",
      yearRead: "2024",
      monthRead: "March",
      progress: 100,
      rating: 5,
      notes: "The ultimate fantasy epic. Tolkien's world-building is unmatched.",
      isbn: "9780547928210",
      thumbnail: "https://i.harperapps.com/hcanz/covers/9780008376123/y648.jpg"
    },
    {
      id: "demo-17",
      title: "Slaughterhouse-Five",
      authors: ["Kurt Vonnegut"],
      publishedDate: "1969",
      description: "Billy Pilgrim becomes unstuck in time during WWII.",
      pageCount: 275,
      categories: ["Historical Fiction"],
      status: "finished",
      dateAdded: "2024-05-10T15:45:00.000Z",
      dateStarted: "2024-06-01T14:30:00.000Z",
      dateFinished: "2024-06-20T20:15:00.000Z",
      dateRead: "2024-06-20T20:15:00.000Z",
      yearRead: "2024",
      monthRead: "June",
      progress: 100,
      rating: 4,
      notes: "Vonnegut's dark humour makes tragedy bearable.",
      isbn: "9780385333849"
    },
    {
      id: "demo-18",
      title: "The Catcher in the Rye",
      authors: ["J.D. Salinger"],
      publishedDate: "1951",
      description: "Holden Caulfield's weekend in New York after being expelled from prep school.",
      pageCount: 277,
      categories: ["Young Adult (YA)"],
      status: "finished",
      dateAdded: "2024-07-05T11:15:00.000Z",
      dateStarted: "2024-08-01T12:30:00.000Z",
      dateFinished: "2024-08-15T21:00:00.000Z",
      dateRead: "2024-08-15T21:00:00.000Z",
      yearRead: "2024",
      monthRead: "August",
      progress: 100,
      rating: 3,
      notes: "Holden's voice is authentic, but man is he whiny!",
      isbn: "9780316769174",
      thumbnail: "https://cdn.shopify.com/s/files/1/0625/6679/3413/files/The_20Catcher_20in_20the_20Rye_e54aedd6-ee05-41f2-b884-8fddf0fe56c6.jpg?v=1716575141"
    },

    // Additional wishlist and currently reading
    {
      id: "demo-19",
      title: "Brave New World",
      authors: ["Aldous Huxley"],
      publishedDate: "1932",
      description: "A dystopian society where happiness is manufactured and individuality is suppressed.",
      pageCount: 311,
      categories: ["Science Fiction"],
      status: "wishlist",
      dateAdded: "2024-12-05T16:10:00.000Z",
      rating: 0,
      notes: "Another dystopian classic to complement 1984",
      isbn: "9780060850524"
    },
    {
      id: "demo-20",
      title: "The Importance of Being Earnest",
      authors: ["Oscar Wilde"],
      publishedDate: "1895",
      description: "A witty comedy of manners about mistaken identities and social expectations.",
      pageCount: 76,
      categories: ["Comedy / Satire"],
      status: "currentlyReading",
      dateAdded: "2024-12-10T14:15:00.000Z",
      dateStarted: "2025-01-20T18:00:00.000Z",
      progress: 60,
      rating: 0,
      notes: "Wilde's wit is unmatched. 'I can resist everything except temptation.'",
      isbn: "9780486264783"
    },
    {
      id: "demo-21",
      title: "A Confederacy of Dunces",
      authors: ["John Kennedy Toole"],
      publishedDate: "1980",
      description: "The misadventures of Ignatius J. Reilly in New Orleans.",
      pageCount: 394,
      categories: ["Comedy / Satire"],
      status: "wishlist",
      dateAdded: "2024-11-25T12:45:00.000Z",
      rating: 0,
      notes: "Pulitzer Prize winner - supposed to be hilarious!",
      isbn: "9780802130204"
    },
    // Romance Books
    {
      id: "demo-22",
      title: "Outlander",
      authors: ["Diana Gabaldon"],
      publishedDate: "1991",
      description: "A WWII nurse is transported back to 18th century Scotland.",
      pageCount: 627,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2024-09-10T10:20:00.000Z",
      dateStarted: "2024-10-15T14:30:00.000Z",
      dateFinished: "2024-11-20T21:45:00.000Z",
      dateRead: "2024-11-20T21:45:00.000Z",
      yearRead: "2024",
      monthRead: "November",
      progress: 100,
      rating: 5,
      notes: "Epic time-traveling romance! Jamie Fraser is swoon-worthy.",
      isbn: "9780440212560"
    },
    {
      id: "demo-23",
      title: "The Duke and I",
      authors: ["Julia Quinn"],
      publishedDate: "2000",
      description: "A fake engagement leads to real love in Regency England.",
      pageCount: 384,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2025-01-05T11:15:00.000Z",
      dateStarted: "2025-03-01T16:30:00.000Z",
      dateFinished: "2025-03-08T20:00:00.000Z",
      dateRead: "2025-03-08T20:00:00.000Z",
      yearRead: "2025",
      monthRead: "March",
      progress: 100,
      rating: 4,
      notes: "Steamy historical romance! Perfect escapist reading.",
      isbn: "9780380804481",
      thumbnail: "https://juliaquinn.com/WP/wp-content/uploads/2016/09/duke_x2.jpg"
    },
    {
      id: "demo-24",
      title: "Beach Read",
      authors: ["Emily Henry"],
      publishedDate: "2020",
      description: "Two rival writers challenge each other to write outside their comfort zones.",
      pageCount: 352,
      categories: ["Romance"],
      status: "currentlyReading",
      dateAdded: "2024-12-15T13:45:00.000Z",
      dateStarted: "2025-01-25T10:15:00.000Z",
      progress: 40,
      rating: 0,
      notes: "Enemies to lovers trope done perfectly!",
      isbn: "9781984806734"
    },
    {
      id: "demo-25",
      title: "Red, White & Royal Blue",
      authors: ["Casey McQuiston"],
      publishedDate: "2019",
      description: "The First Son of the United States falls for the Prince of Wales.",
      pageCount: 421,
      categories: ["Romance"],
      status: "wishlist",
      dateAdded: "2024-12-20T15:30:00.000Z",
      rating: 0,
      notes: "LGBTQ+ romance with political intrigue!",
      isbn: "9781250316776",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566742512i/41150487.jpg"
    },
    // More Comedy Books
    {
      id: "demo-26",
      title: "Bridget Jones's Diary",
      authors: ["Helen Fielding"],
      publishedDate: "1996",
      description: "A thirty-something single woman chronicles her romantic disasters.",
      pageCount: 310,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2024-08-05T12:20:00.000Z",
      dateStarted: "2024-09-10T18:00:00.000Z",
      dateFinished: "2024-09-25T22:15:00.000Z",
      dateRead: "2024-09-25T22:15:00.000Z",
      yearRead: "2024",
      monthRead: "September",
      progress: 100,
      rating: 4,
      notes: "Hilarious and relatable! V.g. indeed!",
      isbn: "9780140298468"
    },
    {
      id: "demo-30",
      title: "The Fear Bubble",
      authors: ["Ant Middleton"],
      publishedDate: "2019",
      description: "Former SAS soldier reveals how to overcome fear and achieve your potential.",
      pageCount: 256,
      categories: ["Nonfiction"],
      status: "finished",
      dateAdded: "2025-02-01T09:45:00.000Z",
      dateStarted: "2025-04-05T14:20:00.000Z",
      dateFinished: "2025-04-18T19:30:00.000Z",
      dateRead: "2025-04-18T19:30:00.000Z",
      yearRead: "2025",
      monthRead: "April",
      progress: 100,
      rating: 4,
      notes: "Inspiring and tough. Ant's no-nonsense approach to conquering fear.",
      isbn: "9780008194673"
    },
    {
      id: "demo-28",
      title: "Me Talk Pretty One Day",
      authors: ["David Sedaris"],
      publishedDate: "2000",
      description: "Hilarious essays about the author's life and cultural observations.",
      pageCount: 272,
      categories: ["Nonfiction"],
      status: "finished",
      dateAdded: "2025-03-10T11:30:00.000Z",
      dateStarted: "2025-05-20T16:45:00.000Z",
      dateFinished: "2025-06-15T20:30:00.000Z",
      dateRead: "2025-06-15T20:30:00.000Z",
      yearRead: "2025",
      monthRead: "June",
      progress: 100,
      rating: 5,
      notes: "Sedaris is a comedy genius! Laughed out loud constantly.",
      isbn: "9780316776967",
      thumbnail: "https://cdn.shopify.com/s/files/1/0625/6679/3413/files/Me_20Talk_20Pretty_20One_20Day.jpg?v=1716575923"
    },
    {
      id: "demo-29",
      title: "Call Me By Your Name",
      authors: ["André Aciman"],
      publishedDate: "2007",
      description: "A beautiful coming-of-age love story set in 1980s Italy.",
      pageCount: 248,
      categories: ["Romance"],
      status: "finished",
      dateAdded: "2024-04-15T12:30:00.000Z",
      dateStarted: "2024-05-10T14:20:00.000Z",
      dateFinished: "2024-05-20T19:45:00.000Z",
      dateRead: "2024-05-20T19:45:00.000Z",
      yearRead: "2024",
      monthRead: "May",
      progress: 100,
      rating: 5,
      notes: "Achingly beautiful prose. Aciman captures first love perfectly.",
      isbn: "9780374299217",
      thumbnail: "https://s3-ap-southeast-2.amazonaws.com/assets.allenandunwin.com/images/original/9781843546535.jpg"
    },
    {
      id: "demo-31",
      title: "The Liar",
      authors: ["Stephen Fry"],
      publishedDate: "2005",
      description: "Stephen Fry's hilarious and moving memoir about his early years.",
      pageCount: 430,
      categories: ["Nonfiction"],
      status: "finished",
      dateAdded: "2025-01-10T11:30:00.000Z",
      dateStarted: "2025-04-25T16:45:00.000Z",
      dateFinished: "2025-05-18T20:30:00.000Z",
      dateRead: "2025-05-18T20:30:00.000Z",
      yearRead: "2025",
      monthRead: "May",
      progress: 100,
      rating: 5,
      notes: "Fry's wit and self-deprecation make this autobiography brilliant.",
      isbn: "9780099457046"
    },
    // Current Year (Return of the King moved here)
    {
      id: "demo-16",
      title: "The Lord of the Rings: The Return of the King",
      authors: ["J.R.R. Tolkien"],
      publishedDate: "1955",
      description: "The epic conclusion to the greatest fantasy trilogy ever written.",
      pageCount: 555,
      categories: ["Fantasy"],
      status: "finished",
      dateAdded: "2024-11-01T13:20:00.000Z",
      dateStarted: "2024-12-01T10:00:00.000Z",
      dateFinished: "2025-01-20T22:30:00.000Z",
      dateRead: "2025-01-20T22:30:00.000Z",
      yearRead: "2025",
      monthRead: "January",
      progress: 100,
      rating: 5,
      notes: "The perfect ending. 'I will not say: do not weep; for not all tears are an evil.'",
      isbn: "9780547928197",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGOsDwZpm0BYgGt1Tvxdngk6wixFzKz40VQ&s"
    }
  ];

  // Login function
  const login = async (username, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle demo account specially
      if (username.toLowerCase() === "demo" && password === "demo123") {
        const demoUser = {
          id: "demo-user",
          name: "Demo User",
          username: "demo",
          createdAt: "2023-01-01T00:00:00.000Z",
          avatar: "https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff",
        };

        // Create demo books only if none exist
        const existingBooks = localStorage.getItem("reading-tracker-books");
        if (!existingBooks) {
          const demoBooks = createDemoBooks();
          // Save demo books to localStorage
          localStorage.setItem("reading-tracker-books", JSON.stringify(demoBooks));
        }

        // Create demo reading goals only if none exist
        const existingGoals = localStorage.getItem("bookTracker_readingGoals");
        if (!existingGoals) {
          const currentYear = new Date().getFullYear();
          const demoGoals = {
            [currentYear]: {
              target: 12,
              isActive: true,
            },
            [currentYear - 1]: {
              target: 10,
              isActive: true,
            },
          };
          localStorage.setItem("bookTracker_readingGoals", JSON.stringify(demoGoals));
        }

        // Save demo user to localStorage
        localStorage.setItem("bookTracker_user", JSON.stringify(demoUser));

        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: demoUser });
        return { success: true };
      }

      // Get users from localStorage
      const users = JSON.parse(
        localStorage.getItem("bookTracker_users") || "[]",
      );

      // Check if username exists first - filter out invalid users
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const userByUsername = validUsers.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );

      if (!userByUsername) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "No account found with this username",
        });
        return { success: false, error: "No account found with this username" };
      }

      // Check if password matches
      if (userByUsername.password !== password) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Incorrect password",
        });
        return { success: false, error: "Incorrect password" };
      }

      // Login successful
      const { password: _, ...userWithoutPassword } = userByUsername;

      // Save user to localStorage
      localStorage.setItem(
        "bookTracker_user",
        JSON.stringify(userWithoutPassword),
      );

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userWithoutPassword });
      return { success: true };
    } catch {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: "Login failed. Please try again.",
      });
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  // Signup function
  const signup = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });

    try {
      console.log("Starting signup with userData:", userData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(
        localStorage.getItem("bookTracker_users") || "[]",
      );
      console.log("Existing users:", users);

      // Check if user already exists - filter out invalid users first
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const existingUser = validUsers.find(
        (u) => u.username.toLowerCase() === userData.username.toLowerCase(),
      );
      console.log("Existing user found:", existingUser);

      if (existingUser) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Username already taken",
        });
        return { success: false, error: "Username already taken" };
      }

      // Validate required fields
      if (!userData.name || !userData.username || !userData.password) {
        console.error("Missing required fields:", userData);
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Missing required fields",
        });
        return { success: false, error: "Missing required fields" };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        username: userData.username.toLowerCase(),
        password: userData.password,
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
      };
      console.log("Creating new user:", newUser);

      // Save user to users array
      users.push(newUser);
      localStorage.setItem("bookTracker_users", JSON.stringify(users));
      console.log("Saved users to localStorage");

      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = newUser;

      // Save current user
      localStorage.setItem(
        "bookTracker_user",
        JSON.stringify(userWithoutPassword),
      );
      console.log("Saved current user to localStorage");

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userWithoutPassword });
      console.log("Signup successful, user set in state");
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: "Signup failed. Please try again.",
      });
      return { success: false, error: "Signup failed. Please try again." };
    }
  };

  // Logout function
  const logout = () => {
    // If logging out from demo account, clear demo-specific data
    if (state.user && state.user.id === "demo-user") {
      localStorage.removeItem("reading-tracker-books");
      localStorage.removeItem("reading-tracker-goal");
    }
    localStorage.removeItem("bookTracker_user");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Reveal password function
  const revealPassword = async (username) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get existing users
      const users = JSON.parse(
        localStorage.getItem("bookTracker_users") || "[]",
      );

      // Check if user exists - filter out invalid users first
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const user = validUsers.find(
        (u) => u.username.toLowerCase() === username.toLowerCase(),
      );

      if (!user) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "No account found with this username",
        });
        return { success: false, error: "No account found with this username" };
      }

      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

      return {
        success: true,
        message: "User found! Password revealed below.",
        password: user.password
      };

    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: "Failed to find user. Please try again.",
      });
      return { success: false, error: "Failed to find user. Please try again." };
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get stored reset token
      const resetData = JSON.parse(
        localStorage.getItem("bookTracker_resetToken") || "null"
      );

      if (!resetData || resetData.token !== token) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Invalid reset code. Please check the code and try again, or request a new reset code.",
        });
        return { success: false, error: "Invalid reset code. Please check the code and try again, or request a new reset code." };
      }

      // Check if token is expired
      if (Date.now() > resetData.expires) {
        localStorage.removeItem("bookTracker_resetToken");
        dispatch({ type: AUTH_ACTIONS.CLEAR_RESET_TOKEN });
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "Reset code has expired (codes are valid for 1 hour). Please request a new reset code.",
        });
        return { success: false, error: "Reset code has expired (codes are valid for 1 hour). Please request a new reset code." };
      }

      // Get users and update password
      const users = JSON.parse(
        localStorage.getItem("bookTracker_users") || "[]",
      );

      // Filter out invalid users first
      const validUsers = users.filter(u => u && typeof u === 'object' && u.username);
      const userIndex = validUsers.findIndex(
        (u) => u.username.toLowerCase() === resetData.username
      );

      if (userIndex === -1) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: "User not found",
        });
        return { success: false, error: "User not found" };
      }

      // Update password in the original users array
      const originalUserIndex = users.findIndex(
        (u) => u && u.username && u.username.toLowerCase() === resetData.username
      );
      users[originalUserIndex].password = newPassword;
      localStorage.setItem("bookTracker_users", JSON.stringify(users));

      // Clear reset token
      localStorage.removeItem("bookTracker_resetToken");
      dispatch({ type: AUTH_ACTIONS.CLEAR_RESET_TOKEN });

      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

      return { success: true, message: "Password has been reset successfully!" };

    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: "Failed to reset password. Please try again.",
      });
      return { success: false, error: "Failed to reset password. Please try again." };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...state.user, ...updates };

      // Update in localStorage
      localStorage.setItem("bookTracker_user", JSON.stringify(updatedUser));

      // Update in users array
      const users = JSON.parse(
        localStorage.getItem("bookTracker_users") || "[]",
      );
      const userIndex = users.findIndex((u) => u.id === state.user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem("bookTracker_users", JSON.stringify(users));
      }

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
      return { success: true };
    } catch {
      return { success: false, error: "Failed to update profile" };
    }
  };

  const contextValue = {
    // State
    user: state.user,
    status: state.status,
    error: state.error,
    resetToken: state.resetToken,
    isAuthenticated: state.status === AUTH_STATUS.AUTHENTICATED,
    isLoading: state.status === AUTH_STATUS.LOADING,

    // Actions
    login,
    signup,
    logout,
    clearError,
    updateProfile,
    revealPassword,

    // Constants
    AUTH_STATUS,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
