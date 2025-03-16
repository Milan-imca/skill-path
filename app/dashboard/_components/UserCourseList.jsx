"use client";
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// List of categories
const categories = [
  { id: "All", name: "All Categories" },
  { id: "Programming", name: "Programming" },
  { id: "Yoga", name: "Yoga" },
  { id: "Creative", name: "Creative" },
  { id: "Science", name: "Science" },
  { id: "Maths", name: "Maths" },
  { id: "Others", name: "Others" },
];

const UserCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    setLoading(true);
    const email = user?.primaryEmailAddress?.emailAddress;
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, email));

    setTimeout(() => {
      setCourseList(result);
      setUserCourseList(result);
      setLoading(false);
    }, 1000);
  };

  // Filter courses based on selected category
  const filteredCourses = Array.isArray(courseList)
    ? selectedCategory === "All"
      ? courseList
      : courseList.filter(course => course.category === selectedCategory)
    : [];

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="font-semibold text-2xl text-gray-800 text-center mb-4">My Courses</h2>

      {/* Centered Category Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-64 bg-white border border-gray-300 rounded-md p-2 shadow-sm">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Image src="/loading2.gif" alt="Loading..." width={100} height={100} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-5 flex gap-5 flex-wrap justify-center"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <CourseCard course={course} refreshData={getUserCourses} />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-[40vh] w-full">
              <h3 className="text-xl font-semibold text-gray-700">No courses found in this category.</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserCourseList;
