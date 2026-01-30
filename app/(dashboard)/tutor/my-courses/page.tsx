"use client";

import {
  Filter,
  Search,
  Plus,
  MoreVertical,
  Users,
  Eye,
  Star,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { name: "Published", value: "published", count: 8 },
  { name: "Drafts", value: "draft", count: 3 },
  { name: "Archived", value: "archived", count: 2 },
];

export const mockCourses = {
  published: [
    {
      id: 1,
      title: "Modern React from Scratch",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 1248,
      views: 8420,
      rating: 4.7,
      revenue: 12450,
      status: "published",
      lastUpdated: "2026-01-12",
      category: "Web Development",
      level: "Intermediate",
    },
    {
      id: 2,
      title: "UI Design Fundamentals",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 932,
      views: 6104,
      rating: 4.5,
      revenue: 9320,
      status: "published",
      lastUpdated: "2026-01-08",
      category: "Design",
      level: "Beginner",
    },
    {
      id: 5,
      title: "Advanced MongoDB",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 0,
      views: 0,
      rating: 0,
      revenue: 0,
      status: "published",
      lastUpdated: "2026-01-25",
      category: "Backend",
      level: "Advanced",
    },
    {
      id: 6,
      title: "Advanced MongoDB",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 0,
      views: 0,
      rating: 0,
      revenue: 0,
      status: "published",
      lastUpdated: "2026-01-25",
      category: "Database",
      level: "Intermediate",
    },
    {
      id: 7,
      title: "Advanced MongoDB",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 0,
      views: 0,
      rating: 0,
      revenue: 0,
      status: "published",
      lastUpdated: "2026-01-25",
      category: "Backend",
      level: "Advanced",
    },
    {
      id: 8,
      title: "Advanced Next.js",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 100,
      views: 400,
      rating: 4.5,
      revenue: 1000,
      status: "published",
      lastUpdated: "2026-01-25",
      category: "Frontend",
      level: "Advanced",
    },
  ],
  draft: [
    {
      id: 3,
      title: "Advanced MongoDB",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 0,
      views: 0,
      rating: 0,
      revenue: 0,
      status: "draft",
      lastUpdated: "2026-01-25",
      category: "Backend",
      level: "Beginner",
    },
  ],
  archived: [
    {
      id: 4,
      title: "Old JavaScript Course",
      thumbnail:
        "https://img.freepik.com/free-photo/abstract-black-white-background_53876-10264.jpg",
      students: 456,
      views: 2340,
      rating: 4.2,
      revenue: 4560,
      status: "archived",
      lastUpdated: "2025-11-15",
      category: "Frontend",
      level: "Beginner",
    },
  ],
};

const TCoursesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("published");
  const [searchQuery, setSearchQuery] = useState("");

  const currentCourses =
    mockCourses[activeTab as keyof typeof mockCourses] || [];

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Courses</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track your course performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>

            {/* Filter Button */}
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>

            {/* Create Course Button */}
            <Link href="/tutor/upload-course">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Tabs with Motion */}
        <div className="mt-6 relative">
          <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-6 py-2.5 font-medium text-sm transition-colors rounded-md ${
                  activeTab === tab.value
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.name}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      activeTab === tab.value
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        course.status === "published"
                          ? "bg-green-100 text-green-700"
                          : course.status === "draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{course.views.toLocaleString()} views</span>
                    </div>
                    {course.rating > 0 && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold text-green-600">
                            ${course.revenue.toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>
                      Updated{" "}
                      {new Date(course.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === "published"
                  ? "You haven't published any courses yet"
                  : activeTab === "draft"
                    ? "No draft courses available"
                    : "No archived courses"}
              </p>
              <Link href="/tutor/upload-course">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Course
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TCoursesPage;
