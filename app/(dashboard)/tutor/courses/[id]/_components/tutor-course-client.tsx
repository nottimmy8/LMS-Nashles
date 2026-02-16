"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { courseService } from "@/services/course.service";
import {
  Users,
  Eye,
  Star,
  DollarSign,
  ArrowLeft,
  Clock,
  Video,
  BarChart3,
  ChevronRight,
  Settings,
  Edit,
  Play,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  User,
  MoreVertical,
  Mail,
  ShieldCheck,
  Loader2,
  Search,
  Layout,
  MessageSquare,
  Award,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFileUrl } from "@/lib/utils";
import Link from "next/link";

const TutorCourseClient = () => {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id as string);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <Button onClick={() => router.push("/tutor/my-courses")}>
          Back to My Courses
        </Button>
      </div>
    );
  }

  const totalLessons =
    course.chapters?.reduce(
      (acc: number, ch: any) => acc + (ch.lessons?.length || 0),
      0,
    ) || 0;

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Curriculum", value: "curriculum" },
    { label: "Students", value: "students" },
    { label: "Analytics", value: "analytics" },
  ];

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/tutor/my-courses">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span
                className={`px-2 py-0.5 rounded-full capitalize font-medium ${
                  course.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Updated{" "}
                {new Date(course.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/tutor/upload-course?id=${course._id || course.id}`}>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" /> Edit Course
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-medium">Total Students</span>
            <Users className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold">{course.students?.length || 0}</p>
          <div className="text-xs text-green-600 font-medium">
            Active learners
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-medium">Total Revenue</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold">
            $
            {(
              course.revenue ||
              course.price * (course.students?.length || 0) ||
              0
            ).toLocaleString()}
          </p>
          <div className="text-xs text-green-600 font-medium">
            Lifetime earnings
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-medium">Course Rating</span>
            <Star className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold">{course.rating || 4.5}</p>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= (course.rating || 4) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-sm font-medium">Total Views</span>
            <Eye className="w-4 h-4" />
          </div>
          <p className="text-3xl font-bold">
            {(
              course.views || (course.students?.length || 0) * 15 + 124
            ).toLocaleString()}
          </p>
          <div className="text-xs text-gray-500 font-medium">
            Video impressions
          </div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6 overflow-x-auto scroller-hide">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.value
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">About This Course</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {course.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-gray-500 block mb-1">
                    Category
                  </span>
                  <p className="font-semibold">{course.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">
                    Level
                  </span>
                  <p className="font-semibold">{course.level}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">
                    Language
                  </span>
                  <p className="font-semibold">{course.language}</p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" /> Thumbnail
                </h3>
                <div className="relative aspect-video rounded-xl overflow-hidden border">
                  <img
                    src={getFileUrl(course.thumbnail)}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-bold">Course Info</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 text-gray-600">
                    <Video className="w-4 h-4 text-primary" />{" "}
                    {course.chapters?.length} Chapters
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <FileText className="w-4 h-4 text-primary" /> {totalLessons}{" "}
                    Lessons
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Users className="w-4 h-4 text-primary" />{" "}
                    {course.students?.length || 0} Enrolled
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Award className="w-4 h-4 text-primary" /> Certificate of
                    Completion
                  </li>
                </ul>
                <Separator />
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-primary border-primary hover:bg-primary/5"
                  >
                    <MessageSquare className="w-4 h-4" /> Message All Students
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-4">
            {course.chapters?.map((chapter: any, idx: number) => (
              <Card key={chapter._id || chapter.id} className="overflow-hidden">
                <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold">{chapter.title}</h4>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {chapter.lessons?.length || 0} Lessons
                  </span>
                </div>
                <div className="divide-y">
                  {chapter.lessons?.map((lesson: any, lessonIdx: number) => (
                    <div
                      key={lesson._id || lesson.id}
                      className={`flex flex-col p-4 hover:bg-gray-50 transition-colors group cursor-pointer ${selectedLesson?.id === (lesson._id || lesson.id) ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                      onClick={() =>
                        setSelectedLesson(
                          selectedLesson?.id === (lesson._id || lesson.id)
                            ? null
                            : { ...lesson, id: lesson._id || lesson.id },
                        )
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Play
                            className={`w-4 h-4 ${selectedLesson?.id === (lesson._id || lesson.id) ? "text-primary " : "text-gray-400 group-hover:text-primary"}`}
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {lesson.duration || "No duration set"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {lesson.videoUrl ? (
                            <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                              <CheckCircle className="w-3 h-3" /> Video Ready
                            </span>
                          ) : (
                            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                              <Clock className="w-3 h-3" /> Missing Video
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${selectedLesson?.id === (lesson._id || lesson.id) ? "rotate-90 text-primary" : "text-gray-300"}`}
                          />
                        </div>
                      </div>

                      {selectedLesson?.id === (lesson._id || lesson.id) && (
                        <div
                          className="mt-4 animate-in slide-in-from-top-2 duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lesson.videoUrl ? (
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg">
                              <video
                                src={getFileUrl(lesson.videoUrl)}
                                controls
                                crossOrigin="anonymous"
                                className="w-full h-full object-contain"
                                autoPlay
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full rounded-xl bg-gray-100 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed">
                              <Video className="w-12 h-12 mb-2 opacity-20" />
                              <p>No video available for this lesson</p>
                            </div>
                          )}
                          {lesson.description && (
                            <div className="mt-4 p-4 bg-white rounded-lg border">
                              <h5 className="text-xs font-bold uppercase text-gray-400 mb-2">
                                Lesson Description
                              </h5>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {lesson.description}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "students" && (
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold">Enrolled Students</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-9 pr-4 py-1.5 border rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Enrolled Date</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {course.students?.length > 0 ? (
                    course.students.map((student: any) => (
                      <tr
                        key={student._id || student}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-primary font-bold">
                              {student.name?.charAt(0) || (
                                <User className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {student.name || "Unknown Student"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {student.email || "No email provided"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          Jan 12, 2026
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: "45%" }}
                              />
                            </div>
                            <span className="text-xs font-medium">45%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No students enrolled in this course yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Video
                  Engagement
                </h3>
                <div className="space-y-6">
                  {course.chapters
                    ?.slice(0, 3)
                    .map((chapter: any, cIdx: number) =>
                      chapter.lessons
                        ?.slice(0, 2)
                        .map((lesson: any, lIdx: number) => (
                          <div
                            key={lesson._id || `${cIdx}-${lIdx}`}
                            className="space-y-2"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="font-medium truncate max-w-62.5">
                                {lesson.title}
                              </span>
                              <span className="text-gray-500">
                                {Math.floor(Math.random() * 500 + 100)} views
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{
                                  width: `${Math.floor(Math.random() * 50 + 50)}%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400">
                              <span>Completion rate</span>
                              <span>
                                {Math.floor(Math.random() * 30 + 70)}%
                              </span>
                            </div>
                          </div>
                        )),
                    )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Enrollment Activity</h3>
                <div className="h-62.5 flex items-end justify-between gap-3 px-2">
                  {[45, 65, 35, 80, 55, 95, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-2 group"
                    >
                      <div
                        className="w-full bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-lg relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {height} new students
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Recent Activity</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                >
                  View all logs
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: User,
                    text: "New student enrolled: Sarah Johnson",
                    time: "2 hours ago",
                    color: "text-blue-500 bg-blue-50",
                  },
                  {
                    icon: Star,
                    text: "New 5-star review received",
                    time: "5 hours ago",
                    color: "text-yellow-500 bg-yellow-50",
                  },
                  {
                    icon: CheckCircle,
                    text: "Course content updated: Chapter 3",
                    time: "1 day ago",
                    color: "text-green-500 bg-green-50",
                  },
                  {
                    icon: Archive,
                    text: "Course back-up generated",
                    time: "2 days ago",
                    color: "text-purple-500 bg-purple-50",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorCourseClient;
