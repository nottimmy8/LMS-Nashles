"use client";

import {
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const wishlistItems = [
  {
    id: 1,
    title: "Mastering Next.js 14 and Server Components",
    instructor: "David Miller",
    price: "$89.99",
    rating: 4.9,
    students: "12,450",
    lessons: 32,
    duration: "10h 45m",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "Advanced CSS Animations & Magic Effects",
    instructor: "Elena Rodriguez",
    price: "$54.99",
    rating: 4.8,
    students: "8,920",
    lessons: 24,
    duration: "6h 20m",
    thumbnail:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=225&fit=crop",
  },
];

const Wishlist = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-500">
            Courses you're interested in taking next
          </p>
        </div>
        <div className="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500" size={18} />
          {wishlistItems.length} Saved Courses
        </div>
      </div>

      {/* Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2.5 bg-white/90 backdrop-blur-sm text-rose-500 rounded-xl shadow-sm hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  Top Seller
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} className="fill-amber-500" />
                    <span className="text-sm font-bold">{item.rating}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Users size={14} />
                    {item.students}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  By {item.instructor}
                </p>

                <div className="flex items-center gap-4 mb-8 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                    <BookOpen size={14} />
                    {item.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Clock size={14} />
                    {item.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="text-2xl font-black text-gray-900">
                    {item.price}
                  </div>
                  <button className="px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                    Enrol Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={48} className="text-rose-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Found a course you like? Click the heart icon to save it here for
            later.
          </p>
          <Link
            href="/student/search"
            className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
