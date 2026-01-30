"use client";

import { useState } from "react";
import {
  Search as SearchIcon,
  Filter,
  Star,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  List,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All Categories",
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Music",
  "Photography",
];

const courses = [
  {
    id: 1,
    title: "Mastering Next.js 14 and Server Components",
    instructor: "David Miller",
    price: "$89.99",
    rating: 4.9,
    students: "12,450",
    lessons: 32,
    duration: "10h 45m",
    category: "Development",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "Ultimate UI/UX Design Masterclass 2026",
    instructor: "Sarah Johnson",
    price: "$94.99",
    rating: 4.8,
    students: "15,200",
    lessons: 45,
    duration: "18h 30m",
    category: "Design",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "Full-Stack Web Development Bootcamp",
    instructor: "John Wilson",
    price: "$129.99",
    rating: 4.7,
    students: "24,000",
    lessons: 120,
    duration: "52h 15m",
    category: "Development",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    title: "Photography for Beginners: Digital Art",
    instructor: "Emma Watson",
    price: "$49.99",
    rating: 4.6,
    students: "6,500",
    lessons: 28,
    duration: "8h 45m",
    category: "Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=225&fit=crop",
  },
];

const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "All Categories" || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Search Header */}
      <div className="bg-black text-white rounded-[3rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-black mb-6 leading-tight">
            Discover Your Next <span className="text-indigo-400">Skill</span>
          </h1>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-6 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 backdrop-blur-md rounded-[2rem] pl-16 pr-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4 text-white/40">
          <Sparkles size={40} />
          <p className="text-sm font-bold uppercase tracking-widest vertical-text">
            Premium Learn
          </p>
        </div>
      </div>

      {/* Categories & View Options */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-50 p-1.5 rounded-2xl">
            <button className="p-2 bg-white rounded-xl shadow-sm text-black">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-black">
              <List size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold hover:shadow-sm transition-all">
            Sort by: Featured
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg">
                {course.category}
              </div>
            </div>

            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star size={12} className="fill-amber-500" />
                  <span className="text-xs font-black">{course.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {course.students} students
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                by {course.instructor}
              </p>

              <div className="flex items-center gap-3 mb-6 text-[10px] font-bold text-gray-400 mt-auto">
                <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                  <BookOpen size={12} />
                  {course.lessons}
                </span>
                <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                  <Clock size={12} />
                  {course.duration}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xl font-black text-gray-900">
                  {course.price}
                </div>
                <Link
                  href={`/course/${course.id}`}
                  className="w-12 h-12 bg-gray-50 text-black hover:bg-black hover:text-white rounded-2xl flex items-center justify-center transition-all group/btn"
                >
                  <ArrowRight
                    size={20}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
