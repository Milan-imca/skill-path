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

const UserCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="font-semibold text-2xl text-gray-800 text-center sm:text-left">My Courses</h2>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Image src="/loading2.gif" alt="Loading..." width={100} height={100} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-5 grid gap-6 place-items-center grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
        >
          {courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <CourseCard course={course} refreshData={getUserCourses} />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-[40vh] w-full">
              <h3 className="text-xl font-semibold text-gray-700">Create your first course now!</h3>
              <p className="text-gray-500 mt-2">Start building and sharing your knowledge today.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserCourseList;
