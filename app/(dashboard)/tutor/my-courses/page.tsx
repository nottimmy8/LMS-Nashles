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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { courseService } from "@/services/course.service";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tabConfig = [
  { name: "Published", value: "published" },
  { name: "Drafts", value: "draft" },
  { name: "Archived", value: "archived" },
];

const TCoursesPage = () => {
  const getFileUrl = (path: string | undefined) => {
    if (!path) return null;
    if (path.startsWith("blob:") || path.startsWith("http")) return path;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api/v1", "") ||
      "http://localhost:5000";
    return `${baseUrl}${path}`;
  };

  const [activeTab, setActiveTab] = useState<string>("published");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const data = await courseService.getTutorCourses(activeTab);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [activeTab]);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            {tabConfig.map((tab) => (
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
                  {activeTab === tab.value && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/20 text-white">
                      {courses.length}
                    </span>
                  )}
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
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course._id || course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={getFileUrl(course.thumbnail) ?? "/placeholder.png"}
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
                      <span>{course.students?.length || 0} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{(course.views || 0).toLocaleString()} views</span>
                    </div>
                    {(course.rating || 0) > 0 && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold text-green-600">
                            ${(course.revenue || 0).toLocaleString()}
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
                      {new Date(
                        course.updatedAt || course.lastUpdated,
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Link
                      href={
                        course.status === "published"
                          ? `/tutor/courses/${course._id || course.id}`
                          : `/tutor/upload-course?id=${course._id || course.id}`
                      }
                      className="flex-1"
                    >
                      <Button
                        variant={
                          course.status === "published" ? "default" : "outline"
                        }
                        size="sm"
                        className="w-full gap-2"
                      >
                        {course.status === "published" ? (
                          <>
                            <Eye className="w-4 h-4" />
                            View Details
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4" />
                            Keep Editing
                          </>
                        )}
                      </Button>
                    </Link>
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
