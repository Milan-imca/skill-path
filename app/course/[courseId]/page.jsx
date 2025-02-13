"use client"
import Navbar from '@/app/components/Navbar';
// import Header from '@/app/_components/Header';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';

const Course = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);

  const [course, setCourse] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId))

    setCourse(result[0])
    // console.log(result)
  }


  return (
    <div>
      <div className='md:w-[1000PX] mx-auto mt-2'>
        <Navbar />
      </div>
      <div className='px-10 p-10 md:px-20 lg:px-44'>
        <CourseBasicInfo course={course} edit={false} />
        <CourseDetails course={course} />
        <ChapterList course={course} edit={false} />
      </div>
    </div>
  )
}

export default Course;