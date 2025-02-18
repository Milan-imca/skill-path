// "use client"
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { motion, useAnimation } from "framer-motion";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import Link from 'next/link';

// export default function Home() {


//   const controls = useAnimation();
//   const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   const heroControls = useAnimation();
//   const cardControls = useAnimation();

//   const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
//   const { ref: cardRef, inView: cardInView } = useInView({ threshold: 0.3 });

//   useEffect(() => {
//     if (heroInView) {
//       heroControls.start("visible");
//     } else {
//       heroControls.start("hidden");
//     }
//   }, [heroInView, heroControls]);

//   useEffect(() => {
//     if (cardInView) {
//       cardControls.start("visible");
//     } else {
//       cardControls.start("hidden");
//     }
//   }, [cardInView, cardControls]);
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white relative">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-3 lg:px-20 bg-white fixed top-0 w-full z-50 shadow-md">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-gray-900"
//         >
//           <span className="text-indigo-600 text-2xl font-bold">SkillPath</span>
//         </motion.div>
//         <Link href={"/dashboard"}>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-md font-medium shadow-md hover:bg-indigo-700 transition-all"
//           >
//             Join Now
//           </motion.button>
//         </Link>
//       </nav>

//       {/* Hero Section with Infinite Text Animation & Parallax */}
//       <motion.div
//         ref={heroRef}
//         initial="hidden"
//         animate={heroControls}
//         variants={{
//           visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//           hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } }
//         }}
//         className="h-[85vh] flex flex-col items-center justify-center text-center px-6"
//       >
//         <div className="max-w-5xl">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
//             Create AI-Powered Courses Effortlessly with{" "}
//             <motion.span
//               animate={{ opacity: [0.4, 1, 0.4] }}
//               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//               className="text-indigo-600"
//             >
//               SkillPath
//             </motion.span>
//           </h1>
//           <p className="mt-4 text-lg text-gray-600">
//             Transform your knowledge into structured, engaging courses in
//             minutes. No coding, no hassle – just AI magic!
//           </p>
//           <div className="mt-6 flex justify-center gap-4">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="px-4 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium shadow-lg hover:bg-indigo-700 transition-all"
//             >
//               Get Started
//             </motion.button>

//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
//         >
//           <span className="text-gray-600 text-sm">Scroll Down</span>
//           <div className="w-8 h-8 border-2 border-indigo-600 rounded-full flex items-center justify-center">
//             <span className="text-indigo-600 text-xl">⌄</span>
//           </div>
//         </motion.div>

//       </motion.div>

//       {/* Feature Cards Section with Entry & Exit Animations */}
//       <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-20 pt-10 pb-16">
//         <h2 className="text-3xl font-bold text-gray-900 text-center">
//           Why Choose <span className="text-indigo-600">SkillPath?</span>
//         </h2>
//         <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
//           {[
//             { icon: "⚡", title: "AI-Powered Course Creation", desc: "Generate high-quality courses instantly with AI-driven tools." },
//             { icon: "🎓", title: "Personalized Learning", desc: "Customize course content based on learner preferences and skill levels." },
//             { icon: "💡", title: "Easy-to-Use & Beginner-Friendly", desc: "No technical skills needed! Our intuitive interface makes course creation simple for everyone." },
//             { icon: "🎉", title: "100% Free – Start Instantly!", desc: "No hidden fees, no subscriptions. Start building and sharing your courses for free today!" },
//           ].map((card, index) => (
//             <motion.div
//               key={index}
//               className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
//               initial="hidden"
//               animate={controls}
//               exit="hidden"
//               variants={{
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
//                 hidden: { opacity: 0, y: 50, transition: { duration: 0.3 } }
//               }}
//             >
//               <div className="text-indigo-600 text-4xl">{card.icon}</div>
//               <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
//               <p className="text-gray-600 mt-2">{card.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"
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
          setTimeout(() => setLoading(false), 500); // Small delay before hiding loader
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
    if (heroInView) {
      heroControls.start("visible");
    } else {
      heroControls.start("hidden");
    }
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (cardInView) {
      cardControls.start("visible");
    } else {
      cardControls.start("hidden");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-3 lg:px-20 md:px-10 bg-white fixed top-0 w-full z-50 shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-900"
        >
          <span className="text-indigo-600 text-2xl font-bold">SkillPath</span>
        </motion.div>
        <Link href={"/dashboard"}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-md font-medium shadow-md hover:bg-indigo-700 transition-all"
          >
            Join Now
          </motion.button>
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } }
        }}
        className="h-[85vh] flex flex-col items-center justify-center text-center p-6"
      >
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-6xl  font-bold text-gray-900">
            Create AI-Powered Courses Effortlessly with{" "}
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-indigo-600"
            >
              SkillPath
            </motion.span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Transform your knowledge into structured, engaging courses in minutes. No coding, no hassle – just AI magic!
          </p>
          <div className="mt-6 flex justify-center gap-4">
          <Link href={"/sign-up"}>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium shadow-lg hover:bg-indigo-700 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
          </div>
        </div>

        {/* Scroll Indicator */}

        <motion.div
          animate={{ y: [20, 40, 20] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className=""
        >
          <span className="text-gray-600 text-xl mt-5">Scroll Down 👇🏻</span>
        </motion.div>
      </motion.div>

      {/* Feature Cards Section */}
      <div ref={cardRef} className="max-w-6xl mx-auto px-6 lg:px-20 pt-10 pb-16">

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Why Choose <span className="text-indigo-600">SkillPath?</span>
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {[
            { icon: "⚡", title: "AI-Powered Course Creation", desc: "Generate high-quality courses instantly with AI-driven tools." },
            { icon: "🎓", title: "Personalized Learning", desc: "Customize course content based on learner preferences and skill levels." },
            { icon: "💡", title: "Easy-to-Use & Beginner-Friendly", desc: "No technical skills needed! Our intuitive interface makes course creation simple for everyone." },
            { icon: "🎉", title: "100% Free – Start Instantly!", desc: "No hidden fees, no subscriptions. Start building and sharing your courses for free today!" },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
              initial="hidden"
              animate={cardControls}
              exit="hidden"
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
    </div>
  );
}
