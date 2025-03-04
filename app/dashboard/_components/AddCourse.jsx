"use client";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Loader2 } from "lucide-react"; // Importing loading spinner

const AddCourse = () => {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    setLoading(true); // Start loading

    const redirectUrl = userCourseList.length >= 5 ? "/dashboard/upgrade" : "/create-course";
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      router.push(redirectUrl);
    }, 1000);
  };

  return (
    <div className='flex items-center justify-between bg-white shadow-md p-5 rounded-xl mt-5'>
      <div>
        <p className='text-md text-gray-500'>Hello,</p>
        <h2 className='text-2xl font-semibold'>{user?.fullName || user?.username} 👋🏻</h2>
        <p className='text-sm text-gray-600 mt-1'>Create your courses with AI</p>
      </div>

      <Button
        onClick={handleClick}
        className='bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-5 rounded-lg shadow-lg transition-all flex items-center gap-2'
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Loading...
            
          </>
        ) : (
          "+ Create Course"
        )}
      </Button>
    </div>
  );
};

export default AddCourse;
