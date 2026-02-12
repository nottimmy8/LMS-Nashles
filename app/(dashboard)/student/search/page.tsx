"use client";

import { useState, useEffect, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { courseService, Course } from "@/services/course.service";

const categories = [
  "All Categories",
  "web-development",
  "mobile-development",
  "data-science",
  "design",
  "business",
  "marketing",
];

const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = useCallback(
    async (query: string, category: string, currentPage: number) => {
      try {
        setLoading(true);
        const filters: any = {
          page: currentPage,
          limit: 12,
        };

        if (query) filters.search = query;
        if (category !== "All Categories") filters.category = category;

        const response = await courseService.getPublishedCourses(filters);
        setCourses(response.courses);
        setTotalPages(response.pagination.pages);
      } catch (err: any) {
        console.error("Fetch courses error:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCourses(searchQuery, activeCategory, page);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, activeCategory, page, fetchCourses]);

  const calculateTotalLessons = (course: Course) => {
    return (
      course.chapters?.reduce(
        (acc, chap) => acc + (chap.lessons?.length || 0),
        0,
      ) || 0
    );
  };

  const calculateTotalDuration = (course: Course) => {
    // This is a placeholder as durations might be strings like "10:00"
    // For now returning a representative value or "TBD"
    return "Variable";
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
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
        <div className="flex items-center gap-3 overflow-x-auto  no-scrollbar pb-2 lg:pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
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
      <div className="min-h-[400px] relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20 rounded-3xl">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-red-50 rounded-3xl">
            <p className="text-red-600 font-bold">{error}</p>
            <button
              onClick={() => fetchCourses(searchQuery, activeCategory, page)}
              className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && courses.length === 0 && !error && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-gray-500 font-bold text-xl">
              No courses found matching your criteria.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    course.thumbnail ||
                    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop"
                  }
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
                    <span className="text-xs font-black">4.8</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {course.students?.length || 0} students
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  by {course.tutor?.name || "Expert Instructor"}
                </p>

                <div className="flex items-center gap-3 mb-6 text-[10px] font-bold text-gray-400 mt-auto">
                  <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                    <BookOpen size={12} />
                    {calculateTotalLessons(course)} lessons
                  </span>
                  <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                    <Clock size={12} />
                    {calculateTotalDuration(course)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-gray-900">
                    ${course.price}
                  </div>
                  <Link
                    href={`/student/course/${course._id}`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all ${
                page === p
                  ? "bg-black text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
