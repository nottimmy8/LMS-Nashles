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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StudentPage = () => {
  const continueLearning = [
    {
      id: 1,
      title: "Complete React & Next.js Course",
      instructor: "John Doe",
      progress: 65,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      lastWatched: "Introduction to Hooks",
      duration: "12h 30m total",
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      instructor: "Jane Smith",
      progress: 32,
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
      lastWatched: "Generic Types Deep Dive",
      duration: "8h 15m total",
    },
  ];

  const upcomingDeadlines = [
    {
      course: "React Course",
      task: "Final Project",
      dueDate: "Feb 5, 2026",
      urgent: true,
    },
    {
      course: "TypeScript",
      task: "Quiz 3",
      dueDate: "Feb 8, 2026",
      urgent: false,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Student! 👋
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
          <h3 className="text-4xl font-bold mb-1">12</h3>
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
          <h3 className="text-4xl font-bold text-gray-900 mb-1">8</h3>
          <p className="text-sm text-gray-500">Courses finished</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Clock size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Time
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">124</h3>
          <p className="text-sm text-gray-500">Hours learned</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <Trophy size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Achievements
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">15</h3>
          <p className="text-sm text-gray-500">Certificates earned</p>
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
          {continueLearning.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                  <PlayCircle size={32} className="text-black ml-1" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  by {course.instructor}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Last: {course.lastWatched}
                  </span>
                  <span className="font-bold text-indigo-600">
                    {course.progress}% Complete
                  </span>
                </div>
              </div>
            </div>
          ))}
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
