// "use client";
// import { db } from '@/configs/db';
// import { CourseList } from '@/configs/schema';
// import { useUser } from '@clerk/nextjs';
// import { eq } from 'drizzle-orm';
// import React, { useContext, useEffect, useState } from 'react';
// import CourseCard from './CourseCard';
// import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
// import { motion } from 'framer-motion'

// const UserCourseList = () => {
//   const { user } = useUser();
//   const [courseList, setCourseList] = useState([]);
//   const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

//   useEffect(() => {
//     user && getUserCourses();
//   }, [user]);

//   const getUserCourses = async () => {
//     const email = user?.primaryEmailAddress?.emailAddress;
//     const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, email));
//     setCourseList(result);
//     setUserCourseList(result);
//   };

//   return (

//     <div className='mt-8'>
//       <h2 className='font-semibold text-2xl text-gray-800'>My Courses</h2>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
//         {courseList?.length > 0 ? (
//           courseList.map((course, index) => (
//             <motion.div initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }} // Slight delay for staggered effect
//               key={index}>
//               <CourseCard course={course} refreshData={getUserCourses} />
//             </motion.div>
//           ))
//         ) : (
//           [1, 2, 3, 4, 5].map((item, index) => (
//             <div key={index} className='bg-gray-300 animate-pulse rounded-xl h-[200px] shadow-md'></div>
//           ))
//         )}
//       </div>
//     </div>

//   );
// };

// export default UserCourseList;
"use client";
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { motion } from 'framer-motion'

const UserCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, email));
    setCourseList(result);
    setUserCourseList(result);
  };

  return (
    <div className='mt-8'>
      <h2 className='font-semibold text-2xl text-gray-800'>My Courses</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
        {courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
            >
              <CourseCard course={course} refreshData={getUserCourses} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center mt-10">
            <h3 className="text-xl font-semibold text-gray-700">Create your first course now!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourseList;
