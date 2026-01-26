import Navbar from "@/components/navbar";
import Image from "next/image";
import banner from "@/public/bannerimg.png";
import { Button } from "@/components/ui/button";
import { AnimatedStack } from "@/components/animated-stack";
const stats = [
  { value: "4.5", label: "80k Reviews" },
  { value: "30M", label: "Enrollments" },
  { value: "2M+", label: "Learners" },
  { value: "1K+", label: "Popular Courses" },
];

const Home = () => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="py-12 md:py-20 px-5 ">
        <section className="max-w-6xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center ">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight   ">
              BUILD IN-DEMAND <br />
              TECH SKILLS
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3 flex-wrap ">
              Launch your
              <AnimatedStack />
              career
            </h2>

            <p className="text-muted-foreground max-w-md text-base leading-relaxed">
              Build practical skills that modern tech companies actually hire
              for — from design thinking to real-world frontend development.
            </p>
            <div className="pt-4 flex gap-4">
              <Button size="lg" className="rounded-full px-8">
                Get Started
              </Button>
              <Button
                size="lg"
                className="rounded-full px-8 border border-black bg-transparent text-black hover:text-white"
              >
                Enroll Now
              </Button>
            </div>
          </div>
          {/* image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-black/10 rounded-3xl blur-2xl" />
            <Image
              src={banner}
              alt="Learning illustration"
              className="relative z-10"
              priority
            />
          </div>
        </section>
      </div>
      {/*  */}
      <section className="px-5 py-12 md:py-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center w-full"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{item.value}</span>
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>

              <div className="h-8 border-2 rounded-full border-black/30" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20  bg-black/30">
        <div className="max-w-6xl mx-auto"></div>
      </section>
    </div>
  );
};

export default Home;
