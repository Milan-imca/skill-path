"use client";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react';

const AddCourse = () => {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);

  return (
    <div className='flex items-center justify-between bg-white shadow-md p-5 rounded-xl mt-5'>
      <div className=''>
        <p className='text-md text-gray-500'>Hello,</p>
        <h2 className='text-2xl font-semibold'>{user?.fullName || user?.username} 👋🏻</h2>
        <p className='text-sm text-gray-600 mt-1'>Create your courses with AI</p>
      </div>

      <Link href={userCourseList.length >= 5 ? "/dashboard/upgrade" : "/create-course"}>
        <Button className='bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2 rounded-lg shadow-lg transition-all'>
          + Create Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
