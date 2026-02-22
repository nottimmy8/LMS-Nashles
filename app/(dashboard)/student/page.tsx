"use client";
import { motion } from "framer-motion";
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
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import UserCard from "../_components/user-card";

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
        <Loader2 className="w-10 h-10 animate-spin text-white/20" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto ">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            Dashboard Overview
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Welcome back,
            <span className="text-gradient">
              {user?.name?.split(" ")[0] || "Student"}
            </span>
            !
          </h1>
          <p className="text-white/40 text-sm max-w-md">
            Your progress is looking great. Dive back into your lessons and hit
            your weekly goals.
          </p>
        </div>
        <Link
          href="/student/search"
          className="px-8 py-3.5 bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 w-fit shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Browse Courses
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-6 rounded-[2.5rem] shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Flame size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
              Streak
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-5xl font-bold mb-1 tracking-tighter">
              {stats?.streak || 0}
            </h3>
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-wider">
              Days in a row
            </p>
          </div>
        </div>

        <UserCard
          type="Completed"
          value={stats?.completedCourses || 0}
          icon={CheckCircle2}
          variant="white"
        />

        <UserCard
          type="Lessons"
          value={stats?.totalLessonsCompleted || 0}
          icon={BookOpen}
          variant="white"
        />

        <UserCard
          type="Certificates"
          value={stats?.totalCertificates || 0}
          icon={Trophy}
          variant="white"
        />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left Column: Continue Learning */}
        <div className="xl:col-span-3 space-y-8">
          <div className="flex items-center justify-between overflow-hidden">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Continue Learning
            </h2>
            <Link
              href="/student/my-learning"
              className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
              View All Academy →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {continueLearning.length > 0 ? (
              continueLearning.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <Link
                    href={`/student/my-learning/${enrollment.course._id}`}
                    className="glass-panel rounded-3xl overflow-hidden group cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          enrollment.course.thumbnail ||
                          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
                        }
                        alt={enrollment.course.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl">
                          <PlayCircle size={28} className="text-black ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold line-clamp-2">
                          {enrollment.course.title}
                        </h3>
                      </div>
                      <p className="text-xs text-white/60 mb-6">
                        By{" "}
                        {enrollment.course.tutor?.name || "Nashles Instructor"}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span>{enrollment.rating || "4.5"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{enrollment.duration || "undefined"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{enrollment.lessons} lessons</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-medium ">
                          <span className="text-cyan-400">Progress</span>
                          <span className="">
                            {enrollment.progressPercent}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${enrollment.progressPercent}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="md:col-span-3 bg-[#0a0a0a] rounded-[2.5rem] border border-dashed border-white/5 p-16 text-center group hover:border-white/10 transition-colors">
                <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-6 transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-bold text-white mb-2">
                  No active courses yet
                </h3>
                <p className="text-white/30 text-sm mb-8 max-w-xs mx-auto">
                  Expand your knowledge today with our premium courses.
                </p>
                <Link
                  href="/student/search"
                  className="inline-flex px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Right Column: Deadlines & Weekly Goal */}
      <div className="space-y-8 grid grid-cols-1 md:grid-cols-3 gap-8  ">
        <div className=" md:col-span-2 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 shadow-2xl p-8 transition-all hover:border-white/10 group">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-500">
              <Calendar size={18} />
            </div>
            <h3 className="text-lg font-bold text-white">Deadlines</h3>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:bg-white/[0.04] transition-all cursor-pointer group/item"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${item.urgent ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-white/20"}`}
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover/item:text-gradient transition-all">
                      {item.task}
                    </h4>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                      {item.course}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white/40">
                  {item.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Target size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
              Goal
            </span>
          </div>
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Weekly Focus
              </h3>
              <p className="text-xs font-medium opacity-60">
                Complete 3 core modules
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="opacity-60">Progress</span>
                <span>2 / 3 Modules</span>
              </div>
              <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "66%" }}
                  className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
