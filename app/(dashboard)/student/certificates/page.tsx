"use client";

import {
  Trophy,
  Download,
  Share2,
  ExternalLink,
  Award,
  Search,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const certificates = [
  {
    id: 1,
    courseTitle: "Complete React & Next.js Course",
    issueDate: "Jan 15, 2026",
    instructor: "John Doe",
    certificateId: "CERT-12345-6789",
    thumbnail:
      "https://images.unsplash.com/photo-1589330694653-731362e49c66?w=400&h=280&fit=crop",
  },
  {
    id: 2,
    courseTitle: "UI/UX Design Masterclass",
    issueDate: "Dec 20, 2025",
    instructor: "Sarah Johnson",
    certificateId: "CERT-98765-4321",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=280&fit=crop",
  },
];

const Certificates = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Certificates
          </h1>
          <p className="text-gray-500">
            Celebrate your achievements and share your expertise
          </p>
        </div>
        <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-2xl text-emerald-600">
          <Award size={24} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">
              Total Earned
            </p>
            <p className="text-xl font-bold">{certificates.length}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Certificate Preview */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden m-4 rounded-[2rem]">
                <Image
                  src={cert.thumbnail}
                  alt={cert.courseTitle}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <Download size={20} />
                  </button>
                  <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <Share2 size={20} />
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Verified
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-8 pb-8 pt-2">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {cert.courseTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Instructor: {cert.instructor}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Issued On
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      {cert.issueDate}
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="p-2 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Add Placeholder for "Next Milestone" */}
          <div className="bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center group hover:border-black/20 transition-colors">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Trophy size={28} className="text-gray-300" />
            </div>
            <h4 className="font-bold text-gray-400">Next Milestone</h4>
            <p className="text-sm text-gray-400 mt-1">
              Complete your active courses to earn more!
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} className="text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No certificates yet
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Complete your first course to unlock your achievement and showcase
            your new skills.
          </p>
          <Link
            href="/student/my-learning"
            className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Continue Learning
          </Link>
        </div>
      )}
    </div>
  );
};

export default Certificates;
