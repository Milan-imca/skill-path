"use client";
import { SignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Use next/link for Next.js

const images = ["/login1.jpg", "/login2.jpg", "/login3.jpg"];

export default function SignupPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left Side - Image Carousel (Full Height in Both Mobile & Desktop) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Changing visuals"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </div>

      {/* Right Side - Sign In Section (Full Height in Mobile & Desktop) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to SkillPath 🎉</h1>
        
        <SignIn
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg",
              inputField: "border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md",
              card: "shadow-lg border border-gray-200 rounded-lg p-6",
              headerTitle: "text-2xl font-semibold text-gray-800",
              footer: "hidden", // Hide default Clerk footer
            },
          }}
        />

        {/* Custom Footer - Sign Up Link */}
        <p className="m-b p-4  text-sm text-gray-600">
          Don't have an account?  
          <Link href="/sign-up" className="text-blue-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
