"use client";
import { SignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Use next/link for Next.js

export default function SignupPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen justify-center">
      {/* Right Side - Sign In Section */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center bg-white p-4 md:p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to SkillPath 🎉</h1>

        <SignIn
          forceRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg",
              inputField: "border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md",
              card: "shadow-lg border border-gray-200 rounded-lg p-6",
              headerTitle: "text-2xl font-semibold text-gray-800",
              footer: "hidden",
            },
          }}
        />

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?  
          <Link href="/sign-up" className="text-blue-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
