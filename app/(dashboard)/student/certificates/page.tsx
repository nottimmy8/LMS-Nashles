"use client";

import { useEffect, useState } from "react";
import { getMyCertificates } from "@/services/analytics-service";
import {
  Trophy,
  Download,
  Share2,
  ExternalLink,
  Award,
  FileCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Certificates = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getMyCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

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
      {loading ? (
        <div className="text-center py-20">Loading certificates...</div>
      ) : certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-[4/3] bg-gray-900 p-6 flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src={
                      cert.course?.thumbnail ||
                      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop"
                    }
                    alt="Certificate Background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                    <Award size={20} />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      Certificate of Completion
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">
                    {cert.course?.title || "Course Title"}
                  </h3>
                </div>
                <div className="relative z-10">
                  <p className="text-xs opacity-60 mb-1">Issued on</p>
                  <p className="font-bold">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                    <p className="text-sm font-mono font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      {cert.certificateId}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FileCheck size={20} />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="flex-1 py-3 bg-black text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
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
            href="/student/search"
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
