"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  PlayCircle,
  Clock,
  CheckCircle2,
  BookOpen,
  Star,
  MoreVertical,
  Download,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      title: "Complete React & Next.js Course",
      instructor: "John Doe",
      progress: 65,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      totalLessons: 45,
      completedLessons: 29,
      duration: "12h 30m",
      rating: 4.8,
      status: "in-progress",
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      instructor: "Jane Smith",
      progress: 32,
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
      totalLessons: 32,
      completedLessons: 10,
      duration: "8h 15m",
      rating: 4.9,
      status: "in-progress",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Sarah Johnson",
      progress: 100,
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      totalLessons: 28,
      completedLessons: 28,
      duration: "10h 45m",
      rating: 4.7,
      status: "completed",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Mike Chen",
      progress: 18,
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
      totalLessons: 50,
      completedLessons: 9,
      duration: "15h 20m",
      rating: 4.6,
      status: "in-progress",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesTab = activeTab === "all" || course.status === activeTab;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: "all", label: "All Courses", count: courses.length },
    {
      id: "in-progress",
      label: "In Progress",
      count: courses.filter((c) => c.status === "in-progress").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: courses.filter((c) => c.status === "completed").length,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Learning</h1>
        <p className="text-gray-500">
          Track your progress and continue where you left off
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button */}
                <Link
                  href={`/course/${course.id}/learn`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <PlayCircle size={32} className="text-black ml-1" />
                </Link>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                {/* Status Badge */}
                {course.status === "completed" && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Completed
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  by {course.instructor}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-bold text-indigo-600">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/course/${course.id}/learn`}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all text-center"
                  >
                    {course.status === "completed" ? "Review" : "Continue"}
                  </Link>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filters
          </p>
          <Link
            href="/search"
            className="inline-flex px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyLearning;
