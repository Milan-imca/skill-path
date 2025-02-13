// import Image from 'next/image';
// import React from 'react'
// import { FaEllipsisVertical } from "react-icons/fa6";
// import DropDownOptions from './DropDownOptions';
// import { db } from '@/configs/db';
// import { CourseList } from '@/configs/schema';
// import { eq } from 'drizzle-orm';
// import Link from 'next/link';



// const CourseCard = ({ course, refreshData, displayUser = false }) => {

//   const handleCourseDelete = async () => {
//     const response = await db.delete(CourseList)
//       .where(eq(CourseList.id, course?.id))
//       .returning({ id: CourseList?.id })

//     if (response) {
//       refreshData()
//     }
//   }

//   return (
//     <div className='shadow-md rounded-lg'>
//       <Link href={"/course/" + course?.courseId}>
//         <Image
//           src={course?.courseBanner}
//           width={300}
//           height={200}
//           className='w-full h-[200px] object-cover rounded-lg'
//           unoptimized
//           priority
//           alt='course image'
//         />
//       </Link>
//       <div className='p-2'>
//         <h2 className='font-medium flex justify-between items-center'>{course?.courseOutput?.["Course Name"]}
//           {
//             !displayUser && <DropDownOptions
//               deleteCourse={() => handleCourseDelete()}
//             >
//               <FaEllipsisVertical />
//             </DropDownOptions>
//           }

//         </h2>
//         <p className='text-sm text-gray-500'>{course?.category}</p>
//         <div className='flex items-center justify-between '>
//           <h2 className='text-sm'>{course?.courseOutput?.NoOfChapters} Chapters</h2>
//           <h2 className='text-sm'>{course?.level}</h2>
//         </div>
//         {
//           displayUser && <div className='flex items-center gap-2 mt-2'>
//             <Image src={course?.userProfileImage} width={40} height={40} className='rounded-full' />
//             <h2 className='text-sm'>{course?.userName}</h2>
//           </div>
//         }


//       </div>
//     </div>
//   )
// }

// export default CourseCard;


'use client';

import Image from 'next/image';
import React from 'react';
import { FaEllipsisVertical } from "react-icons/fa6";
import DropDownOptions from './DropDownOptions';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const pastelColors = ["bg-pink-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"];

const CourseCard = ({ course, refreshData, displayUser = false }) => {



  const handleCourseDelete = async () => {
    const response = await db.delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (response) {
      refreshData();
    }
  };

  return (
    <Card className='shadow-lg rounded-lg transition-transform duration-200 hover:scale-105 w-full max-w-sm md:max-w-xs lg:max-w-[300px]'>
    {/* course/6d24aa01-fa32-4b27-8a4b-a4e6069cbcf7/start */}
      <Link href={"/course/" + course?.courseId + "/start"}  prefetch={true}>
        <Image
          src={course?.courseBanner}
          width={300}
          height={200}
          className='w-full h-[180px] object-cover rounded-t-lg'
          unoptimized
          priority
          alt='course image'
        />
      </Link>
      <CardContent className='p-3'>
        <div className='flex justify-between items-center mb-2'>
          <Badge className={`text-xs px-2 py-1 rounded-md font-medium ${pastelColors[Math.floor(Math.random() * pastelColors.length)]}`}>
            {course?.category}
          </Badge>
          { !displayUser && 
            <DropDownOptions deleteCourse={() => handleCourseDelete()}>
              <FaEllipsisVertical className='text-gray-500 hover:text-gray-700 cursor-pointer' />
            </DropDownOptions>
          }
        </div>
        <h2 className='font-semibold text-sm truncate'>{course?.courseOutput?.["Course Name"]}</h2>
        <p className='text-xs text-gray-500'>{course?.courseOutput?.NoOfChapters} Chapters • {course?.level}</p>
        {displayUser && (
          <div className='flex items-center gap-2 mt-2'>
            <Image src={course?.userProfileImage} width={30} height={30} className='rounded-full' />
            <h2 className='text-xs'>{course?.userName}</h2>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
