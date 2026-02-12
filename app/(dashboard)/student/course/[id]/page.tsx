"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronRight,
  Globe,
  Award,
  Users,
  Calendar,
  ArrowLeft,
  Loader2,
  Heart,
  Share2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { courseService, Course } from "@/services/course.service";
import { enrollmentService } from "@/services/enrollment.service";
import Modal from "@/components/modal";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (typeof id === "string") {
          const [courseData, enrollmentStatus] = await Promise.all([
            courseService.getCourseById(id),
            enrollmentService.checkEnrollment(id),
          ]);
          setCourse(courseData);
          setIsEnrolled(enrollmentStatus);
          if (courseData.chapters && courseData.chapters.length > 0) {
            setActiveChapter(
              courseData.chapters[0]._id || courseData.chapters[0].id || null,
            );
          }
        }
      } catch (err: any) {
        console.error("Fetch course details or enrollment error:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      if (typeof id !== "string") return;

      // 1. Initiate Enrollment
      const enrollment = await enrollmentService.initiateEnrollment(id);

      // 2. Simulate Payment Flow
      // In a real production app, you would redirect to a payment gateway here
      // or open a payment modal (e.g., Paystack Inline, Stripe Elements).
      // Here we simulate a successful transaction.
      const mockTransactionId = `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // 3. Verify Payment
      await enrollmentService.verifyPayment(
        enrollment._id,
        mockTransactionId,
        "success",
      );

      setIsEnrolled(true);
      setOpenModal(false);
      router.refresh(); // Refresh to update enrollment counts etc. if needed
    } catch (err: any) {
      console.error("Enrollment error:", err);
      setError("Failed to complete enrollment. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium">
          Loading course masterpieces...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-3xl mx-6">
        <p className="text-red-600 font-bold text-xl">
          {error || "Course not found"}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-8 py-3 bg-black text-white rounded-full font-bold flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  const totalLessons =
    course.chapters?.reduce(
      (acc, chap) => acc + (chap.lessons?.length || 0),
      0,
    ) || 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={16} />
        Back to Search
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full">
                {course.category}
              </span>
              <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                <Star size={12} className="fill-amber-600" />
                4.9 Featured
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              {course.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.tutor?.name || "Tutor")}&background=random`}
                  alt={course.tutor?.name || "Tutor"}
                  fill
                  className="object-cover"
                />
              </div>
              <span>
                By{" "}
                <span className="text-indigo-600 underline cursor-pointer">
                  {course.tutor?.name}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-400" />
              <span>12h 45m total</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-gray-400" />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-gray-400" />
              <span className="capitalize">{course.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <span>
                Updated {new Date(course.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="relative">
          <div className="sticky top-24 bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 space-y-8 overflow-hidden">
            <div className="relative aspect-video rounded-3xl overflow-hidden group">
              <Image
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=337&fit=crop"
                }
                alt={course.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={64} className="text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-gray-900">
                  {course.price === 0 ? "FREE" : `$${course.price}`}
                </span>
                {course.price ? (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    ${(course.price * 1.5).toFixed(2)}
                  </span>
                ) : null}
              </div>
              {course.price ? (
                <p className="text-sm font-bold text-rose-500">
                  85% off • 2 days left at this price!
                </p>
              ) : (
                <p className="text-sm font-bold text-emerald-500">
                  Enroll now and start learning for free!
                </p>
              )}
            </div>

            <div className="space-y-4">
              {isEnrolled ? (
                <button
                  className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2"
                  onClick={() =>
                    router.push(`/student/my-learning/${course._id}`)
                  }
                >
                  <CheckCircle2 size={24} />
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full py-5 bg-indigo-600 hover:bg-black text-white rounded-[1.5rem] font-black text-lg transition-all shadow-lg hover:shadow-indigo-200"
                >
                  Enroll in Course
                </button>
              )}
              <button className="w-full py-5 bg-gray-50 hover:bg-gray-100 text-black rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-2">
                Add to Wishlist
                <Heart size={20} />
              </button>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 text-center">
                Course Includes
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: Award, text: "Certificate of completion" },
                  { icon: Users, text: "Interactive community access" },
                  { icon: Globe, text: "Lifetime access on all devices" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-xs font-bold text-gray-600"
                  >
                    <item.icon size={14} className="text-indigo-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-16">
          {/* What You'll Learn */}
          <div className="bg-gray-50 rounded-[3rem] p-10 space-y-8">
            <h2 className="text-3xl font-black text-gray-900">
              What you&apos;ll learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Master modern industry-standard workflows",
                "Build production-grade applications from scratch",
                "Understand complex architectural patterns",
                "Deploy and scale your projects effectively",
                "Best practices and common pitfalls to avoid",
                "Real-world case studies and project examples",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <span className="font-bold text-gray-700 leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">Description</h2>
            <div className="prose prose-indigo max-w-none text-gray-600 font-medium leading-relaxed">
              <p>{course.description}</p>
              <p className="mt-4">
                This course is designed for individuals who want to take their
                skills to the next level. Whether you are a beginner looking for
                a solid foundation or an experienced professional aiming to
                sharpen your expertise, our comprehensive curriculum provides
                everything you need.
              </p>
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-gray-900">Curriculum</h2>
              <div className="text-sm font-bold text-gray-500">
                {course.chapters?.length} Sections • {totalLessons} Lectures
              </div>
            </div>

            <div className="space-y-4">
              {course.chapters?.map((chapter, cIdx) => (
                <div
                  key={chapter._id || cIdx}
                  className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setActiveChapter(
                        activeChapter === (chapter._id || chapter.id)
                          ? null
                          : chapter._id || chapter.id || null,
                      )
                    }
                    className="w-full flex items-center justify-between p-7 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">
                        {cIdx + 1}
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-gray-900">
                          {chapter.title}
                        </h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                          {chapter.lessons?.length} Lectures • 45m
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`text-gray-400 transition-transform ${activeChapter === (chapter._id || chapter.id) ? "rotate-90" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeChapter === (chapter._id || chapter.id) ? "max-h-[1000px]" : "max-h-0"}`}
                  >
                    <div className="p-4 bg-gray-50/50 space-y-2">
                      {chapter.lessons?.map((lesson, lIdx) => (
                        <div
                          key={lesson._id || lIdx}
                          className="flex items-center justify-between p-4 bg-white rounded-xl group hover:shadow-md transition-all border border-transparent hover:border-indigo-100"
                        >
                          <div className="flex items-center gap-4">
                            <PlayCircle
                              size={18}
                              className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                            />
                            <div className="text-left">
                              <p className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">
                                {lesson.title}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">
                                {lesson.duration || "05:00"}
                              </p>
                            </div>
                          </div>
                          {lIdx === 0 && cIdx === 0 ? (
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                              Preview
                            </span>
                          ) : (
                            <Lock size={14} className="text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900">Instructor</h2>
            <div className="flex items-start gap-8 bg-white rounded-[3rem] p-10 border border-gray-100">
              <div className="w-32 h-32 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.tutor?.name || "Tutor")}&background=random&size=128`}
                  alt={course.tutor?.name || "Tutor"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">
                    {course.tutor?.name}
                  </h3>
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">
                    Senior Instructor & Professional
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold text-gray-400">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star size={16} className="fill-amber-500" />
                    <span>4.8 Instructor Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} />
                    <span>15,420 Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PlayCircle size={16} />
                    <span>12 Courses</span>
                  </div>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed italic">
                  &quot;Passionate educator dedicated to helping students
                  achieve their career goals through practical, real-world
                  knowledge and hands-on projects.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="p-8 space-y-8 max-w-md">
          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto">
            <Sparkles size={40} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-gray-900">
              Secure Enrollment
            </h2>
            <p className="text-gray-500 font-medium">
              You are about to unlock &quot;{course.title}&quot; for a lifetime
              of learning.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
              <span>Course Price</span>
              <span>{course.price === 0 ? "FREE" : `$${course.price}`}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
              <span>Platform Fee</span>
              <span className="text-emerald-500">FREE</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-xl font-black text-gray-900">
              <span>Total</span>
              <span>
                {course.price === 0 ? "FREE" : `$${course.price || 0}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              disabled={isEnrolling}
              onClick={handleEnroll}
              className="w-full py-5 bg-black hover:bg-indigo-600 disabled:bg-gray-400 text-white rounded-[1.5rem] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Processing...
                </>
              ) : (
                <>
                  {course.price === 0
                    ? "Confirm Free Enrollment"
                    : `Confirm & Pay $${course.price}`}
                </>
              )}
            </button>
            <button
              disabled={isEnrolling}
              onClick={() => setOpenModal(false)}
              className="w-full py-4 text-gray-400 hover:text-black font-bold transition-all"
            >
              Maybe later
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetailsPage;
