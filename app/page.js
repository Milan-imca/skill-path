"use client";
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const controls = useAnimation();
  const heroControls = useAnimation();
  const cardControls = useAnimation();

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: cardRef, inView: cardInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    else heroControls.start("hidden");
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (cardInView) cardControls.start("visible");
    else cardControls.start("hidden");
  }, [cardInView, cardControls]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white z-50">
        <div className="text-gray-900 text-lg font-medium">Loading {progress}%</div>
        <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-gray-100 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-4 md:px-10 lg:px-20 py-3">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-indigo-600 text-2xl font-bold">SkillPath</span>
        </motion.div>
        <Link href={"/dashboard"}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-md font-medium shadow-md hover:bg-indigo-700 transition-all">
            Join Now
          </motion.button>
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.div ref={heroRef} initial="hidden" animate={heroControls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } }
        }}
        className="flex flex-col justify-center items-center text-center min-h-screen px-4 md:px-10"
      >
        <div className="max-w-5xl">
          <h1 className="text-3xl md:text-5xl md:mt-20 font-bold text-gray-900">
            Create AI-Powered Courses Effortlessly with{" "}
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-indigo-600">
              SkillPath
            </motion.span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Transform your knowledge into structured, engaging courses in minutes. No coding, no hassle – just AI magic!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href={"/sign-up"}>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium shadow-lg hover:bg-indigo-700 transition-all">
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div animate={{ y: [20, 40, 20] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="mt-5">
          <span className="text-gray-600 text-xl">Scroll Down 👇🏻</span>
        </motion.div>
      </motion.div>

      {/* Feature Cards Section */}
      <div ref={cardRef} className="max-w-6xl mx-auto px-4 md:px-10 pt-10 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Why Choose <span className="text-indigo-600">SkillPath?</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {[
            { icon: "⚡", title: "AI-Powered Course Creation", desc: "Generate high-quality courses instantly with AI-driven tools." },
            { icon: "🎓", title: "Personalized Learning", desc: "Customize course content based on learner preferences and skill levels." },
            { icon: "💡", title: "Easy-to-Use & Beginner-Friendly", desc: "No technical skills needed! Our intuitive interface makes course creation simple for everyone." },
            { icon: "🎉", title: "100% Free – Start Instantly!", desc: "No hidden fees, no subscriptions. Start building and sharing your courses for free today!" },
          ].map((card, index) => (
            <motion.div key={index} className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
              initial="hidden" animate={cardControls} exit="hidden"
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
                hidden: { opacity: 0, y: 50, transition: { duration: 0.3 } }
              }}
            >
              <div className="text-indigo-600 text-4xl">{card.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-900 text-gray-300 mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold">About SkillPath</h3>
            <p className="mt-2 text-sm">
              SkillPath is an AI-powered course creation platform that helps educators and professionals design structured, engaging courses effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition">Courses</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold">Follow Us</h3>
            <div className="mt-3 flex gap-4">
              <Link href="https://facebook.com" target="_blank">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <span className="text-2xl hover:text-white transition">
                    <Image src={"/fb.png"} height={30} width={30}/>
                  </span>
                </motion.div>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <span className="text-2xl hover:text-white transition">
                  <Image src={"/x.png"} height={30} width={30}/>
                  </span>
                </motion.div>
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <span className="text-2xl hover:text-white transition">
                  <Image src={"/linkedin.png"} height={30} width={30}/>
                  </span>
                </motion.div>
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <span className="text-2xl hover:text-white transition">
                  <Image src={"/insta.png"} height={30} width={30}/>
                  </span>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-indigo-900 text-center py-3 text-sm">
          © {new Date().getFullYear()} SkillPath. All Rights Reserved.
        </div>
      </motion.footer>

    </div>
  );
}
