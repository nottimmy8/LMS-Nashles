"use client";

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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/enrollments/my-learning");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((enrollment) => {
    const isCompleted = enrollment.progressPercent === 100;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && !isCompleted) ||
      (activeTab === "completed" && isCompleted);

    const matchesSearch = enrollment.course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  const tabs = [
    { id: "all", label: "All Courses", count: courses.length },
    {
      id: "in-progress",
      label: "In Progress",
      count: courses.filter((c) => c.progressPercent < 100).length,
    },
    {
      id: "completed",
      label: "Completed",
      count: courses.filter((c) => c.progressPercent === 100).length,
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
          {filteredCourses.map((enrollment) => (
            <div
              key={enrollment._id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    enrollment.course.thumbnail ||
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
                  }
                  alt={enrollment.course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button */}
                <Link
                  href={`/student/my-learning/${enrollment.course._id}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <PlayCircle size={32} className="text-black ml-1" />
                </Link>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${enrollment.progressPercent}%` }}
                  />
                </div>

                {/* Status Badge */}
                {enrollment.progressPercent === 100 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Completed
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {enrollment.course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  by {enrollment.course.tutor?.name || "Instructor"}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {enrollment.completedLessons?.length || 0}/
                    {enrollment.totalLessons || 0} lessons
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-bold text-indigo-600">
                      {enrollment.progressPercent}%
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/student/my-learning/${enrollment.course._id}`}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all text-center"
                  >
                    {enrollment.progressPercent === 100 ? "Review" : "Continue"}
                  </Link>
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
            href="/student/search"
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
