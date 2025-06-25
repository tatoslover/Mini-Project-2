// Demo user setup utility
export const setupDemoUser = () => {
  const demoUser = {
    id: "demo-user-123",
    name: "Demo User",
    email: "demo@booktracker.com",
    password: "demo123",
    createdAt: "2024-01-01T00:00:00.000Z",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff",
  };

  // Check if users array exists, if not create it
  const existingUsers = JSON.parse(localStorage.getItem("bookTracker_users") || "[]");

  // Check if demo user already exists
  const demoExists = existingUsers.some(user => user.email === demoUser.email);

  if (!demoExists) {
    existingUsers.push(demoUser);
    localStorage.setItem("bookTracker_users", JSON.stringify(existingUsers));
  }
};

// Demo books data
export const setupDemoBooks = () => {
  const demoBooks = [
    {
      id: "demo-book-1",
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, idealism, and moral decay.",
      publishedDate: "1925",
      pageCount: 180,
      categories: ["Fiction", "Classics"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg",
      isbn: "9780743273565",
      publisher: "Scribner",
      status: "finished",
      rating: 5,
      notes: "Beautifully written with incredible symbolism. The green light metaphor is unforgettable.",
      review: "Fitzgerald's masterpiece brilliantly captures the American Dream's corruption during the Roaring Twenties. The narrative technique and symbolic depth make this a timeless classic that resonates with each reading.",
      monthRead: "January",
      yearRead: "2025",
      progress: 100,
      dateFinished: "2025-01-15T10:30:00.000Z",
      dateRead: "2025-01-15T10:30:00.000Z",
    },
    {
      id: "demo-book-2",
      title: "Atomic Habits",
      authors: ["James Clear"],
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      publishedDate: "2018",
      pageCount: 320,
      categories: ["Self-Help", "Psychology"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg",
      isbn: "9780735211292",
      publisher: "Avery",
      status: "finished",
      rating: 4,
      notes: "Great practical advice on building habits. The 1% better concept is powerful.",
      review: "Clear provides actionable strategies for habit formation backed by solid research. The framework is simple yet effective, though some concepts could be more concise.",
      monthRead: "February",
      yearRead: "2025",
      progress: 100,
      dateFinished: "2025-02-10T14:20:00.000Z",
      dateRead: "2025-02-10T14:20:00.000Z",
    },
    {
      id: "demo-book-3",
      title: "Dune",
      authors: ["Frank Herbert"],
      description: "A science fiction epic set on the desert planet Arrakis, following Paul Atreides and his journey.",
      publishedDate: "1965",
      pageCount: 688,
      categories: ["Science Fiction", "Fantasy"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg",
      isbn: "9780441172719",
      publisher: "Ace Books",
      status: "currentlyReading",
      rating: 0,
      notes: "Complex world-building. Taking notes on the politics and ecology themes.",
      review: "",
      monthRead: "",
      yearRead: "",
      progress: 45,
    },
    {
      id: "demo-book-4",
      title: "The Seven Husbands of Evelyn Hugo",
      authors: ["Taylor Jenkins Reid"],
      description: "A reclusive Hollywood icon finally tells her story to an unknown journalist.",
      publishedDate: "2017",
      pageCount: 400,
      categories: ["Fiction", "Romance"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9781501161933-M.jpg",
      isbn: "9781501161933",
      publisher: "Atria Books",
      status: "wishlist",
      rating: 0,
      notes: "Heard great things about this one. Adding to my reading list.",
      review: "",
      monthRead: "",
      yearRead: "",
      progress: 0,
    },
    {
      id: "demo-book-5",
      title: "Educated",
      authors: ["Tara Westover"],
      description: "A memoir about a woman who grows up in a survivalist family and eventually earns a PhD from Cambridge.",
      publishedDate: "2018",
      pageCount: 334,
      categories: ["Memoir", "Biography"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9780399590504-M.jpg",
      isbn: "9780399590504",
      publisher: "Random House",
      status: "finished",
      rating: 5,
      notes: "Incredibly powerful memoir. The transformation is remarkable.",
      review: "Westover's memoir is both heartbreaking and inspiring. Her journey from isolation to education showcases the transformative power of learning and the complexity of family loyalty.",
      monthRead: "March",
      yearRead: "2025",
      progress: 100,
      dateFinished: "2025-03-05T16:45:00.000Z",
      dateRead: "2025-03-05T16:45:00.000Z",
    },
  ];

  // Check if demo books already exist
  const existingBooks = JSON.parse(localStorage.getItem("bookTracker_books") || "[]");
  const demoExists = existingBooks.some(book => book.id && book.id.startsWith("demo-book"));

  if (!demoExists) {
    const allBooks = [...existingBooks, ...demoBooks];
    localStorage.setItem("bookTracker_books", JSON.stringify(allBooks));
  }
};

// Setup demo reading goal
export const setupDemoReadingGoal = () => {
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
    [currentYear + 1]: {
      target: 15,
      isActive: true,
    },
  };

  // Check if reading goals already exist
  const existingGoals = JSON.parse(localStorage.getItem("bookTracker_readingGoals") || "{}");

  if (Object.keys(existingGoals).length === 0) {
    localStorage.setItem("bookTracker_readingGoals", JSON.stringify(demoGoals));
  }
};

// Main setup function
export const setupDemoData = () => {
  setupDemoUser();
  setupDemoBooks();
  setupDemoReadingGoal();
};
