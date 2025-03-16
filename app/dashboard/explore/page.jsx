"use client";
import React, { useEffect, useState, useRef } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Available categories
const categories = ["All", "Programming", "Yoga", "Creative", "Science", "Maths", "Others"];

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default: Show all
  const firstLoad = useRef(true); // Track first load

  useEffect(() => {
    fetchCourses();
  }, [pageIndex, selectedCategory]); // Re-fetch when page or category changes

  const fetchCourses = async () => {
    if (firstLoad.current) {
      setLoading(true);
    }

    let query = db.select().from(CourseList).limit(8).offset(pageIndex * 8);

    if (selectedCategory !== "All") {
      query = db.select().from(CourseList).where(eq(CourseList.category, selectedCategory)).limit(8).offset(pageIndex * 8);
    }

    const result = await query;
    
    setCourseList(result);
    setHasMore(result.length === 8); // Check if more courses exist
    setLoading(false);
    firstLoad.current = false; // Disable first load state after initial load
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPageIndex(0); // Reset page when category changes
  };

  return (
    <>
      <Navbar />

      {loading && firstLoad.current && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Image src="/loading2.gif" alt="Loading..." width={120} height={120} />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <h2 className="font-extrabold text-4xl text-center mb-4 text-gray-800">Explore More Projects</h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          Discover AI-powered projects created by our talented community 🚀
        </p>

        {/* Category Filter Dropdown */}
        <div className="flex justify-center mb-6">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-64 bg-white border border-gray-300 rounded-md p-2 shadow-sm">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid Layout for Courses */}
        <div className="mt-5 flex gap-5 flex-wrap justify-center">
          {courseList.length > 0 ? (
            courseList.map((course, index) => (
              <motion.div 
                key={course.id} 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CourseCard course={course} displayUser={true} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No projects found in this category.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            className="px-6 py-2"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>

          <span className="text-gray-700 text-lg">Page {pageIndex + 1}</span>

          <Button
            variant="default"
            className="px-6 py-2"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={!hasMore}
          >
            Next
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Explore;
