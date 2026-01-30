"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Camera,
  Mail,
  UserCircle,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Trash2,
  Bookmark,
  Award,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 border-none">
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your profile, preferences, and security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
                activeTab === tab.id
                  ? "bg-black text-white shadow-lg shadow-black/10"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
          {activeTab === "profile" && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Public Profile</h3>
                  <span className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-lg">
                    Student Account
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-sm">
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-500">
                        <UserCircle size={48} />
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold">Profile Photo</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Help your instructors recognize you.
                    </p>
                    <div className="flex gap-2">
                      <button className="text-xs font-bold px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Change
                      </button>
                      <button className="text-xs font-bold px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 group">
                    <label className="text-sm font-bold text-gray-400 group-focus-within:text-black transition-colors">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserCircle
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="John Wilson"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-sm font-bold text-gray-400 group-focus-within:text-black transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="john.wilson@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1.5 group">
                    <label className="text-sm font-bold text-gray-400 group-focus-within:text-black transition-colors">
                      Headline
                    </label>
                    <input
                      type="text"
                      placeholder="Aspiring Full-Stack Developer | Design Enthusiast"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                </div>
              </section>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-50">
                <button className="px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm hover:shadow-lg transition-all">
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-lg font-bold mb-6">Password & Security</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-xs text-gray-500">
                          Secure your account with 2FA.
                        </p>
                      </div>
                    </div>
                    <button className="text-xs font-bold px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition-all">
                      Enable
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-gray-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-rose-600 mb-4">
                  Danger Zone
                </h3>
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-rose-900">
                      Delete Account
                    </h4>
                    <p className="text-xs text-rose-700">
                      All your progress and certificates will be lost.
                    </p>
                  </div>
                  <button className="p-3 text-rose-600 hover:bg-rose-100 rounded-2xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </section>

              <div className="pt-4 flex justify-end gap-3">
                <button className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm hover:shadow-lg transition-all">
                  Update Security
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold mb-4">
                What should we tell you?
              </h3>
              {[
                {
                  title: "Course Updates",
                  desc: "Announcements from your instructors",
                  icon: BookOpen,
                  default: true,
                },
                {
                  title: "Learning Reminders",
                  desc: "Tips to stay on track with your goals",
                  icon: Flame,
                  default: true,
                },
                {
                  title: "Achievements",
                  desc: "When you earn a new certificate",
                  icon: Award,
                  default: true,
                },
                {
                  title: "Promotions",
                  desc: "Exclusive discounts on new courses",
                  icon: Sparkles,
                  default: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-black transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-gray-700 group-hover:text-black group-hover:scale-110 transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full p-1 transition-all cursor-pointer",
                      item.default ? "bg-black" : "bg-gray-300",
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 bg-white rounded-full transition-all",
                        item.default ? "translate-x-6" : "translate-x-0",
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder icons for maps
const Flame = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const Sparkles = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default StudentSettings;
