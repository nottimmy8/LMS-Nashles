type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
];

export type TutorCourse = {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  status: "published" | "under review" | "draft";
  students: number;
  views: number;
  rating: number;
  lastUpdated: string;
};

export const tutorCourses: TutorCourse[] = [
  {
    id: 1,
    title: "Modern React from Scratch",
    category: "Web Development",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 1248,
    views: 8420,
    rating: 4.7,
    lastUpdated: "2026-01-12",
  },
  {
    id: 2,
    title: "UI Design Fundamentals",
    category: "Design",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 932,
    views: 6104,
    rating: 4.5,
    lastUpdated: "2026-01-08",
  },
  {
    id: 3,
    title: "Node.js & Express Mastery",
    category: "Backend",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "under review",
    students: 0,
    views: 342,
    rating: 0,
    lastUpdated: "2026-01-27",
  },
  {
    id: 4,
    title: "Advanced MongoDB",
    category: "Database",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "draft",
    students: 0,
    views: 0,
    rating: 0,
    lastUpdated: "2026-01-25",
  },
  {
    id: 5,
    title: "Tailwind CSS Deep Dive",
    category: "Frontend",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 1543,
    views: 10214,
    rating: 4.8,
    lastUpdated: "2026-01-05",
  },
  {
    id: 6,
    title: "JavaScript Algorithms",
    category: "Programming",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 876,
    views: 5340,
    rating: 4.4,
    lastUpdated: "2025-12-29",
  },
  {
    id: 7,
    title: "Fullstack MERN Bootcamp",
    category: "Fullstack",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 2214,
    views: 18763,
    rating: 4.9,
    lastUpdated: "2026-01-02",
  },
  {
    id: 8,
    title: "Git & GitHub for Teams",
    category: "Tools",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 689,
    views: 4092,
    rating: 4.3,
    lastUpdated: "2025-12-18",
  },
  {
    id: 9,
    title: "API Design & REST",
    category: "Backend",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "under review",
    students: 0,
    views: 198,
    rating: 0,
    lastUpdated: "2026-01-26",
  },
  {
    id: 10,
    title: "Next.js for Production",
    category: "Frontend",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 1134,
    views: 7921,
    rating: 4.6,
    lastUpdated: "2026-01-09",
  },
  {
    id: 11,
    title: "System Design Basics",
    category: "Architecture",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "draft",
    students: 0,
    views: 0,
    rating: 0,
    lastUpdated: "2026-01-21",
  },
  {
    id: 12,
    title: "Framer Motion Animations",
    category: "UI/UX",
    thumbnail:
      "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
    status: "published",
    students: 764,
    views: 4987,
    rating: 4.5,
    lastUpdated: "2026-01-06",
  },
];
