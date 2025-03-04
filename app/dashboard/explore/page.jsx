"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    setLoading(true);
    const result = await db.select().from(CourseList).limit(8).offset(pageIndex * 8);

    setCourseList(result);
    setLoading(false);
    setHasMore(result.length === 8);
  };

  return (
    <>
      <Navbar />
      
      {loading && (
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
        <p className="text-center text-lg text-gray-600 mb-8">
          Discover AI-powered projects created by our talented community 🚀
        </p>

        {/* Grid Layout for 2 Rows Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courseList.length > 0 ? (
            courseList.map((course, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CourseCard course={course} displayUser={true} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No projects found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            className="px-6 py-2"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>

          <span className="text-gray-700 text-lg">Page {pageIndex + 1}</span>

          <Button
            variant="default"
            className="px-6 py-2"
            onClick={() => setPageIndex(pageIndex + 1)}
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
