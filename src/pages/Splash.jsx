import React from "react";
import PageWrapper from "../components/PageWrapper";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import studpic from "../assets/studpic.png";
import {
  HiArrowRight,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { motion } from "framer-motion";

const Splash = () => {
  const navigate = useNavigate();

  const features = [
    {
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
      title: "AI-Powered Learning",
      description:
        "Our advanced AI Tutor provides instant guidance and personalized study roadmaps.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
      title: "Collaborative Ecosystem",
      description:
        "Join a vibrant community. Share notes, join study groups, and grow together.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400",
      title: "Course Mastery",
      description:
        "Access curated materials designed for high school and university excellence.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      title: "Dynamic Tracking",
      description:
        "Visualize your growth with detailed analytics and motivated trackers.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
      title: "Digital Resources",
      description:
        "A vast library of PDFs, notes, and video lectures at your fingertips.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
      title: "Global Community",
      description:
        "Connect with students from around the world and share knowledge.",
    },
  ];

  const scrollingFeatures = [...features, ...features];

  return (
    <PageWrapper>
      <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
        {/* Navigation Header */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:px-8">
            <h1 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#6e1a52] to-[#a04a80]">
              EduCraft
            </h1>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => navigate("/Login")}
                className="hidden sm:block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#6e1a52] transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/Signup")}
                className="px-5 py-2 rounded-full bg-[#6e1a52] text-white text-sm font-bold hover:bg-[#5a1543] transition-all shadow-lg shadow-[#6e1a52]/20"
              >
                Join Now
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1]">
                  Master Your Future with{" "}
                  <span className="text-[#6e1a52]">EduCraft</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  EduCraft is an all-in-one ecosystem designed for the modern
                  student. From AI-driven insights to collaborative tools, we
                  provide everything you need to excel in your academic journey.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate("/Signup")}
                    className="group px-8 py-4 bg-[#6e1a52] text-white font-bold rounded-2xl hover:bg-[#5a1543] transition-all shadow-xl shadow-[#6e1a52]/25 flex items-center gap-2"
                  >
                    Start Learning Today
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate("/Login")}
                    className="px-8 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                  >
                    Explore Courses
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/150?u=${i}`}
                          alt="user"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Trusted by{" "}
                    <span className="text-slate-900 dark:text-white font-bold">
                      10,000+
                    </span>{" "}
                    students globally
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative w-full max-w-2xl"
            >
              <div className="absolute -inset-4 bg-[#6e1a52]/20 dark:bg-[#6e1a52]/10 rounded-[3rem] blur-2xl -z-10" />
              <img
                src={studpic}
                alt="Students using EduCraft"
                className="w-full h-auto object-cover rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-900"
              />
            </motion.div>
          </div>
        </main>

        {/* Moving Features Section */}
        <section className="py-24 bg-white dark:bg-slate-900 transition-colors overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16 px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Designed for Excellence
            </h2>
          </div>

          <div className="relative flex overflow-x-hidden">
            <motion.div
              className="flex whitespace-nowrap gap-8 py-4"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {scrollingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="w-[300px] md:w-[400px] flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:border-[#6e1a52]/50 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-8 whitespace-normal">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto bg-[#6e1a52] rounded-[3rem] p-12 md:p-20 text-center relative">
            <div className="absolute top-0 right-0 p-10 opacity-10 text-white">
              <HiOutlineAcademicCap className="w-48 h-48" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 relative z-10">
              Ready to transform your learning experience?
            </h2>
            <p className="text-slate-50 text-xl mb-12 max-w-2xl mx-auto relative z-10">
              Join thousands of students who are already using EduCraft to
              streamline their studies and achieve their career goals.
            </p>
            <button
              onClick={() => navigate("/Signup")}
              className="px-10 py-5 bg-white text-[#6e1a52] font-black rounded-2xl hover:bg-slate-50 transition-all shadow-2xl relative z-10"
            >
              Get Started for Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-[#6e1a52] mb-2">
                EduCraft
              </h2>
              <p className="text-slate-500 dark:text-slate-600 text-sm italic">
                Empowering the next generation of global talent.
              </p>
            </div>
            <div className="flex gap-10 text-sm font-bold text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-[#6e1a52] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#6e1a52] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#6e1a52] transition-colors">
                Contact Support
              </a>
            </div>
            <p className="text-slate-400 dark:text-slate-700 text-xs">
              © 2026 EduCraft Ecosystems Inc.
            </p>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
};

export default Splash;
