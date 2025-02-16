"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { storage } from '@/configs/appwriteConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  console.log(course)
  const courseName = course?.courseOutput?.["Course Name"] || "Unknown Course Name";
  const Description = course?.courseOutput?.Description;
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner)
    }
  }, [course])


  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file))
    event.preventDefault();

    if (file != null) {
      try {
        var result = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, "unique()", file);
        const fileId = result.$id; // The unique file ID returned after upload
        const fileUrl = storage.getFileView(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          fileId
        );

        await db.update(CourseList).set({
          courseBanner: fileUrl
        }).where(eq(CourseList.id, course?.id))

        // console.log("File uploaded successfully. View URL:", fileUrl);
      } catch (error) {
        console.log("Uploading Error : ", error)
      }
    }
  }



  return (
    <div className='p-10 border rounded-xl shadow-sm mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-2xl'>{courseName}
            {
              edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />
            }
          </h2>
          <p className='text-gray-500 text-sm mt-5'>{Description}</p>
          <h2 className='mt-5'><span className='font-semibold'>Category</span> : {course?.category}</h2>
          {
            <Link href={"/course/" + course?.courseId + "/start"}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          }
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : '/placeholder.jpeg'}
              width={300}
              height={300}
              alt='course-placeholder'
              className='w-full rounded-xl h-[250px] object-cover cursor-pointer'
              unoptimized
              priority
            />
          </label>
          <input type="file" id='upload-image' className='opacity-0' onChange={onFileSelected} />
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo;


// Explain the topic in detail with the following format: Title: The name of the topic. Overview: A comprehensive explanation covering the purpose and importance of the topic. Details: In-depth discussion of the concept, including key features and insights. Code Example: Provide a practical example in HTML (or another language if applicable), with comments explaining each part of the code. Use Cases: Real-world applications or scenarios where the concept is applied. Key Points: A summary of essential takeaways for better understanding