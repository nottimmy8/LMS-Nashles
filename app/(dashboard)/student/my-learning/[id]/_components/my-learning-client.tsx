"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Lock,
  Menu,
  X,
  Loader2,
  Award,
  Video,
  FileText,
  Star,
  Info,
  Clock,
} from "lucide-react";
import api from "@/services/api";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

const MyLearningClient = () => {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completing, setCompleting] = useState(false);

  const getFileUrl = (path: string | undefined) => {
    if (!path) return "";
    if (path.startsWith("blob:") || path.startsWith("http")) return path;
    const apiUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
    const baseUrl = apiUrl.replace("/api/v1", "");
    return `${baseUrl}${path}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, progressRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/enrollments/progress/${id}`),
        ]);

        const courseData = courseRes.data.course;
        setCourse(courseData);
        setProgress(progressRes.data);

        // Set initial active lesson (last accessed or first lesson)
        let initialLesson = null;
        if (progressRes.data.lastAccessedLesson) {
          courseData.chapters?.forEach((ch: any) => {
            const lesson = ch.lessons?.find(
              (l: any) => l._id === progressRes.data.lastAccessedLesson,
            );
            if (lesson) initialLesson = lesson;
          });
        }

        if (!initialLesson && courseData.chapters?.[0]?.lessons?.[0]) {
          initialLesson = courseData.chapters[0].lessons[0];
        }

        setActiveLesson(initialLesson);
      } catch (error) {
        console.error("Error fetching course content:", error);
        toast.error("Failed to load course content");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleLessonSelect = async (lesson: any) => {
    setActiveLesson(lesson);
    try {
      await api.post("/enrollments/progress", {
        courseId: id,
        lastAccessedLesson: lesson._id,
      });
    } catch (error) {
      console.error("Error updating last accessed lesson:", error);
    }
  };

  const findAndSetNextLesson = () => {
    if (!course?.chapters) return;
    let flatLessons: any[] = [];
    course.chapters.forEach((ch: any) => {
      flatLessons = [...flatLessons, ...ch.lessons];
    });

    const currentIndex = flatLessons.findIndex(
      (l) => l._id === activeLesson?._id,
    );
    if (currentIndex < flatLessons.length - 1) {
      handleLessonSelect(flatLessons[currentIndex + 1]);
    } else {
      toast.success(
        "Congratulations! You've finished all lessons in this course.",
      );
    }
  };

  const handleCompleteLesson = async () => {
    if (!activeLesson || completing) return;

    setCompleting(true);
    try {
      const res = await api.post("/enrollments/progress", {
        courseId: id,
        lessonId: activeLesson._id,
        isCompleted: true,
      });

      setProgress(res.data.progress);
      toast.success("Lesson completed!");

      // Auto-advance logic
      findAndSetNextLesson();
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setCompleting(false);
    }
  };

  const { totalLessons, completedCount, progressPercent } = useMemo(() => {
    if (!course)
      return { totalLessons: 0, completedCount: 0, progressPercent: 0 };
    const total = course.chapters.reduce(
      (acc: number, ch: any) => acc + (ch.lessons?.length || 0),
      0,
    );
    const completed = progress?.completedLessons?.length || 0;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      totalLessons: total,
      completedCount: completed,
      progressPercent: percent,
    };
  }, [course, progress]);

  // Celebration logic
  useEffect(() => {
    if (progressPercent === 100 && course && !loading) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      toast.success("Congratulations! Course Completed!", {
        description:
          "Your official certificate has been issued and is ready for download.",
        duration: 10000,
        action: {
          label: "View Certificate",
          onClick: () => router.push("/student/certificates"),
        },
      });

      return () => clearInterval(interval);
    }
  }, [progressPercent, course, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-black mx-auto" />
          <p className="text-gray-500 font-medium">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="hidden md:block">
              <h1 className="font-bold text-sm truncate max-w-[300px]">
                {course.title}
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {activeLesson?.title || "Select a lesson"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Course Progress
                </p>
                <p className="text-xs font-bold text-black">
                  {progressPercent}% Complete
                </p>
              </div>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-black text-white rounded-xl hover:shadow-lg transition-all "
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Video Player Area */}
        <main className="flex-1 overflow-y-auto p-0 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Player Container */}
            <div className="aspect-video bg-black rounded-none md:rounded-[2rem] overflow-hidden shadow-2xl relative group">
              {activeLesson?.videoUrl ? (
                <ReactPlayer
                  key={activeLesson._id}
                  url={getFileUrl(activeLesson.videoUrl)}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  playsinline
                  onEnded={handleCompleteLesson}
                  onError={(e: any) => {
                    // Suppress abort errors which are common when switching sources
                    if (e?.target?.error?.code !== 4) {
                      console.error("Video Player Error:", e);
                    }
                  }}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 space-y-4">
                  <PlayCircle size={64} className="opacity-20" />
                  <p className="font-medium">
                    Please select a lesson to start learning
                  </p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="px-6 md:px-0 space-y-6 pb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 group">
                    {activeLesson?.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Video size={16} />
                      Video Lesson
                    </span>
                    <span className="flex items-center gap-1.5 font-medium border-l border-gray-200 pl-4">
                      <Clock size={16} />
                      {activeLesson?.duration || "10 mins"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCompleteLesson}
                    disabled={
                      completing ||
                      progress?.completedLessons?.includes(activeLesson?._id)
                    }
                    className={cn(
                      "px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-2",
                      progress?.completedLessons?.includes(activeLesson?._id)
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                        : "bg-black text-white hover:shadow-xl hover:-translate-y-1 active:scale-95",
                    )}
                  >
                    {progress?.completedLessons?.includes(activeLesson?._id) ? (
                      <>
                        <CheckCircle2 size={18} />
                        Completed
                      </>
                    ) : (
                      <>
                        {completing ? (
                          <Loader2 className="w-[18px] animate-spin" />
                        ) : (
                          <CheckCircle2 size={18} />
                        )}
                        Mark as Complete
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Info size={20} className="text-indigo-500" />
                  About this lesson
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeLesson?.description ||
                    "In this lesson, we'll dive deep into the concepts mentioned in the title. Make sure to follow along and try the examples yourself."}
                </p>

                {/* Resources placeholder */}
                <div className="pt-6 border-t border-gray-50 mt-6 mt-6">
                  <h4 className="font-bold text-sm mb-4">Lesson Resources</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 cursor-pointer transition-colors">
                      <FileText size={14} />
                      Course_Slides.pdf
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 cursor-pointer transition-colors">
                      <FileText size={14} />
                      Exercise_Files.zip
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Course Content Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 w-full md:w-[400px]  bg-white border-l border-gray-100 z-30 transition-all duration-300 ease-in-out transform",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Course Content</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            {/* Overall Progress */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Progress
                </span>
                <span className="text-xs font-bold text-black">
                  {completedCount}/{totalLessons} Lessons
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {course.chapters?.map((chapter: any, chapterIdx: number) => (
              <div
                key={chapter._id}
                className="border-b border-gray-50 last:border-0"
              >
                <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">
                    Chapter {chapterIdx + 1}: {chapter.title}
                  </h4>
                </div>
                <div className="divide-y divide-gray-50">
                  {chapter.lessons?.map((lesson: any, lessonIdx: number) => {
                    const isCompleted = progress?.completedLessons?.includes(
                      lesson._id,
                    );
                    const isActive = activeLesson?._id === lesson._id;

                    return (
                      <button
                        key={lesson._id}
                        onClick={() => handleLessonSelect(lesson)}
                        className={cn(
                          "w-full px-6 py-5 flex items-start gap-4 text-left transition-all hover:bg-gray-50",
                          isActive && "bg-indigo-50/50",
                        )}
                      >
                        <div className="mt-1">
                          {isCompleted ? (
                            <div className="p-1 bg-emerald-500 text-white rounded-full">
                              <CheckCircle2 size={12} />
                            </div>
                          ) : (
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border-2",
                                isActive
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-gray-200",
                              )}
                            >
                              <div
                                className={cn(
                                  "w-full h-full rounded-full transition-transform duration-300",
                                  isActive
                                    ? "bg-indigo-500 scale-50"
                                    : "scale-0",
                                )}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "text-sm font-bold line-clamp-2 mb-1",
                              isActive ? "text-indigo-600" : "text-gray-900",
                              isCompleted && !isActive && "text-gray-400",
                            )}
                          >
                            {lessonIdx + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                              <Video size={10} />
                              Video
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 border-l border-gray-200 pl-3">
                              <Clock size={10} />
                              {lesson.duration || "10m"}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <Link
              href={progressPercent === 100 ? "/student/certificates" : "#"}
              className={cn(
                "bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all block",
                progressPercent === 100
                  ? "hover:shadow-md hover:border-indigo-100 cursor-pointer"
                  : "opacity-80 cursor-default",
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-xl",
                  progressPercent === 100
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-amber-50 text-amber-600",
                )}
              >
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Certification
                </p>
                <p className="text-sm font-bold">
                  {progressPercent === 100
                    ? "Ready to Download"
                    : "Finish course to unlock"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MyLearningClient;
