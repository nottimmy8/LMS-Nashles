"use client";

import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  PlayCircle,
  CheckCircle2,
  Flame,
  Target,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth.store";

const StudentPage = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [continueLearning, setContinueLearning] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, learningRes] = await Promise.all([
          api.get("/analytics/student"),
          api.get("/enrollments/my-learning"),
        ]);
        setStats(statsRes.data);
        // Only show top 2 for "Continue Learning" section
        setContinueLearning(learningRes.data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching student dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const upcomingDeadlines = [
    {
      course: "React Course",
      task: "Final Project",
      dueDate: "Feb 25, 2026",
      urgent: true,
    },
    {
      course: "TypeScript",
      task: "Quiz 3",
      dueDate: "Feb 28, 2026",
      urgent: false,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "Student"}! 👋
          </h1>
          <p className="text-gray-500">
            Ready to continue your learning journey?
          </p>
        </div>
        <Link
          href="/student/search"
          className="px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 w-fit"
        >
          Browse Courses
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-[2rem] shadow-lg hover:shadow-xl transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Flame size={24} />
            </div>
            <span className="text-sm font-bold opacity-80">STREAK</span>
          </div>
          <h3 className="text-4xl font-bold mb-1">{stats?.streak || 0}</h3>
          <p className="text-sm opacity-90">Days in a row</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Completed
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">
            {stats?.completedCourses || 0}
          </h3>
          <p className="text-sm text-gray-500">Courses finished</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <BookOpen size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Lessons
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">
            {stats?.totalLessonsCompleted || 0}
          </h3>
          <p className="text-sm text-gray-500">Lessons completed</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <Trophy size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Certificates
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">
            {stats?.totalCertificates || 0}
          </h3>
          <p className="text-sm text-gray-500">Credentials earned</p>
        </div>
      </div>

      {/* Continue Learning */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Continue Learning
          </h2>
          <Link
            href="/student/my-learning"
            className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {continueLearning.length > 0 ? (
            continueLearning.map((enrollment) => (
              <Link
                key={enrollment._id}
                href={`/student/my-learning/${enrollment.course._id}`}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
              >
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <PlayCircle size={32} className="text-black ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${enrollment.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    by {enrollment.course.tutor?.name || "Instructor"}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {enrollment.progressPercent === 100
                        ? "Completed"
                        : "In Progress"}
                    </span>
                    <span className="font-bold text-indigo-600">
                      {enrollment.progressPercent}% Complete
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="lg:col-span-2 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200 p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No active courses
              </h3>
              <p className="text-gray-500 mb-6">
                Start your learning journey today!
              </p>
              <Link
                href="/student/search"
                className="inline-flex px-6 py-2 bg-black text-white rounded-xl font-bold text-sm hover:shadow-md transition-all"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Deadlines & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <Calendar size={20} />
            </div>
            <h3 className="text-xl font-bold">Upcoming Deadlines</h3>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${item.urgent ? "bg-rose-500" : "bg-gray-300"}`}
                  />
                  <div>
                    <h4 className="font-bold text-sm">{item.task}</h4>
                    <p className="text-xs text-gray-500">{item.course}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">
                  {item.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2rem] p-8 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm w-fit mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Weekly Goal</h3>
            <p className="text-sm opacity-90 mb-6">
              Complete 3 lessons this week
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">Progress</span>
              <span className="text-sm font-bold">2/3</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: "66%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
