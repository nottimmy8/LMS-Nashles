"use client";

import {
  Trophy,
  Download,
  Calendar,
  ExternalLink,
  Award,
  Loader2,
  Search,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/services/api";

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await api.get("/analytics/certificates");
        setCertificates(res.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

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
          <h1 className="text-4xl font-bold text-white mb-2">
            My Certificates
          </h1>
          <p className="text-gray-500">
            Showcase your achievements and professional milestones
          </p>
        </div>
        <div className="px-6 py-3 bg-white/10 border border-white/15 rounded-2xl shadow-sm text-sm font-bold flex items-center gap-2">
          <Trophy className="text-amber-500" size={18} />
          {certificates.length} Certificates Earned
        </div>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="glass-panel backdrop-blur-2xl rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Certificate Preview Mask */}
              <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <Award
                  size={80}
                  className="text-indigo-200 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-6 py-2 bg-white text-black rounded-xl font-bold text-sm flex items-center gap-2">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-indigo-50/10 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                    Official Certificate
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-1">
                  {cert.course?.title || "Course Certificate"}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} />
                    Issued on {new Date(cert.issueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ExternalLink size={14} />
                    ID: {cert.certificateId}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-black text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                    View Online
                  </button>
                  <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer">
                    <ExternalLink
                      size={18}
                      className="text-gray-400 hover:text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Trophy size={40} className="text-gray-200" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No certificates yet
          </h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Complete courses to earn official certificates and showcase your
            skills to the world.
          </p>
          <Link
            href="/student/my-learning"
            className="inline-flex px-8 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:shadow-lg transition-all"
          >
            Continue Learning
          </Link>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
