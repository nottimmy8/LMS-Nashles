"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Clock, Star, BookOpen } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced Web3 Architecture",
    instructor: "Sarah Jenkins",
    image: "https://picsum.photos/seed/course1/800/600",
    progress: 0,
    rating: 4.9,
    duration: "12h 30m",
    lessons: 24,
    tags: ["Blockchain", "Architecture"],
  },
  {
    id: 2,
    title: "AI-Driven UI/UX Design",
    instructor: "Marcus Chen",
    image: "https://picsum.photos/seed/course2/800/600",
    progress: 45,
    rating: 4.8,
    duration: "8h 15m",
    lessons: 16,
    tags: ["Design", "AI"],
  },
  {
    id: 3,
    title: "Full-Stack Next.js Mastery",
    instructor: "Elena Rodriguez",
    image: "https://picsum.photos/seed/course3/800/600",
    progress: 100,
    rating: 5.0,
    duration: "20h 45m",
    lessons: 42,
    tags: ["Development", "React"],
  },
];

export default function CourseCatalog() {
  return (
    <section
      id="courses"
      className=" bg-black py-32 relative z-10 overflow-hidden"
    >
      {/* Background Element */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-violet-900/10 -skew-y-6 -z-10" />

      <div className="container  max-w-7xl mx-auto px-5 ">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl text-white font-bold tracking-tight mb-6"
            >
              Trending <span className="text-gradient-accent">Courses</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/60"
            >
              Explore our highly curated library of premium courses designed for
              the modern professional.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="px-6 py-3 rounded-full text-sm text-white font-medium border border-white/10 hover:bg-white/5 transition-colors"
          >
            View All Courses
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 40px -20px rgba(139, 92, 246, 0.3)",
              }}
              className="glass-panel rounded-3xl overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-white font-semibold line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                <p className="text-sm text-white/60 mb-6">
                  by {course.instructor}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-cyan-400">In Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${course.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white/40">Not Started</span>
                        <span className="text-white/40">0%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
