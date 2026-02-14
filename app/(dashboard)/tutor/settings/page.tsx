"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateProfile, updatePassword } from "@/services/user-service";
import { toast } from "@/hooks/use-toast";
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
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payments", label: "Payments", icon: CreditCard },
];

const TSettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
      }));
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
      });
      toast({ title: "Success", description: "Profile updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast({ title: "Success", description: "Password updated successfully" });
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 border-none">
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your profile, account settings, and notification preferences.
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
                <h3 className="text-lg font-bold mb-6">Public Profile</h3>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-sm">
                      {/* <Image
                        src="https://github.com/shadcn.png"
                        alt="Profile"
                        width={96}
                        height={96}
                        className="object-cover"
                      /> */}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold">Profile Photo</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      PNG, JPG or GIF. Max 2MB.
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
                  <div className="space-y-1.5 focus-within:text-black group">
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
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 focus-within:text-black group">
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
                        value={formData.email}
                        readOnly
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all cursor-not-allowed opacity-70"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1.5 focus-within:text-black group">
                    <label className="text-sm font-bold text-gray-400 group-focus-within:text-black transition-colors">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Tell us a little bit about yourself..."
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                    />
                  </div>
                </div>
              </section>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-50">
                <button className="px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm hover:shadow-lg transition-all"
                  onClick={handleProfileUpdate}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
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
                    <div className="space-y-1.5 focus-within:text-black group">
                      <label className="text-sm font-bold text-gray-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5 focus-within:text-black group">
                        <label className="text-sm font-bold text-gray-400">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                        />
                      </div>
                      <div className="space-y-1.5 focus-within:text-black group">
                        <label className="text-sm font-bold text-gray-400">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPassword: e.target.value,
                            })
                          }
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
                      Once you delete your account, there is no going back.
                    </p>
                  </div>
                  <button className="p-3 text-rose-600 hover:bg-rose-100 rounded-2xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </section>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm hover:shadow-lg transition-all"
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-lg font-bold mb-4">
                Notification Preferences
              </h3>
              {[
                {
                  title: "Course Sales",
                  desc: "Notify me when someone buys my course",
                  icon: ShoppingBag,
                  default: true,
                },
                {
                  title: "Student Messages",
                  desc: "Notify me of new messages from students",
                  icon: Mail,
                  default: true,
                },
                {
                  title: "Dashboard Alerts",
                  desc: "Important updates regarding the platform",
                  icon: Bell,
                  default: false,
                },
                {
                  title: "App Push",
                  desc: "Send notifications to my mobile device",
                  icon: Smartphone,
                  default: true,
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
                      item.default ? "bg-emerald-500" : "bg-gray-300",
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

          {activeTab === "payments" && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="text-lg font-bold mb-6">Payout Methods</h3>
                <div className="space-y-4">
                  <div className="p-6 border-2 border-black rounded-3xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-[10px] tracking-tighter italic shadow-inner">
                        VISA
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">
                          •••• •••• •••• 4242
                        </h4>
                        <p className="text-xs text-gray-500">
                          Expired 12/26 • Primary Method
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  </div>
                  <button className="w-full p-6 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold text-sm hover:border-black hover:text-black transition-all flex items-center justify-center gap-2">
                    <CreditCard size={18} />
                    Add New Payment Method
                  </button>
                </div>
              </section>

              <section className="pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold mb-4">Tax Information</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium">
                  Verify your tax status to receive payments without
                  interruption.
                </p>
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center justify-between hover:bg-indigo-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-indigo-900">
                        Tax form W-9
                      </h4>
                      <p className="text-xs text-indigo-700">
                        Not submitted yet.
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-bold px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all">
                    Submit Now
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TSettingsPage;
