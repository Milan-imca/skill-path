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

    // Delay hiding the loader for a smoother transition
    setTimeout(() => {
      setCourseList(result);
      setUserCourseList(result);
      setLoading(false);
    }, 1000); // 1 second delay
  };

  return (
    <div className='mt-8'>
      <h2 className='font-semibold text-2xl text-gray-800'>My Courses</h2>

      {loading ? (
        // Show GIF Loader while fetching data
        <div className="flex justify-center items-center mt-10">
          <Image src="/loading2.gif" alt="Loading..." width={100} height={100} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'
        >
          {courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <CourseCard course={course} refreshData={getUserCourses} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center mt-10">
              <h3 className="text-xl font-semibold text-gray-700">Create your first course now!</h3>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default UserCourseList;
