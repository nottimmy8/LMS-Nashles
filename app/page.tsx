import CourseCatalog from "@/components/course-catalog";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import RoleSplit from "@/components/role-split";
import SocialProof from "@/components/social-proof";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CourseCatalog />
      <RoleSplit />
      <SocialProof />
      <Footer />
    </div>
  );
};

export default page;
