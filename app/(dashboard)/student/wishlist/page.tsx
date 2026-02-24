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
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/users/wishlist");
        setWishlistItems(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (courseId: string) => {
    try {
      await api.post("/user/wishlist/toggle", { courseId });
      setWishlistItems((prev) => prev.filter((item) => item._id !== courseId));
      toast.success("Course removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove course");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-500">
            Courses you're interested in taking next
          </p>
        </div>
        <div className="px-6 py-3 bg-white/10 border border-white/15 rounded-2xl shadow-sm text-sm font-bold flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500" size={18} />
          {wishlistItems.length} Saved Courses
        </div>
      </div>

      {/* Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 rounded-[2.5rem] border border-white/15 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    item.thumbnail ||
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
                  }
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="p-2.5 bg-white/90 backdrop-blur-sm text-rose-500 rounded-xl shadow-sm hover:bg-rose-500 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  By {item.instructor?.name || "Instructor"}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="text-2xl font-black text-gray-900">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </div>
                  <Link
                    href={`/search?id=${item._id}`} // Or direct to course details if you have it
                    className="px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Enroll Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-black rounded-[3rem] border border-white/15 shadow-sm">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={48} className="text-rose-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-500 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Found a course you like? Click the heart icon to save it here for
            later.
          </p>
          <Link
            href="/student/search"
            className="px-8 py-4 bg-white/10 text-gray-500 rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
