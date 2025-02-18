"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/configs/appwriteConfig";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // For the loading icon

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  const courseName = course?.courseOutput?.["Course Name"] || "Unknown Course Name";
  const Description = course?.courseOutput?.Description;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Track upload state

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(URL.createObjectURL(file)); // Show preview
    setLoading(true); // Start loading

    try {
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        "unique()",
        file
      );
      console.log("Upload result:", result); // Log result to check on Vercel

      const fileId = result.$id;
      const fileUrl = storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);

      await db
        .update(CourseList)
        .set({ courseBanner: fileUrl })
        .where(eq(CourseList.id, course?.id));

      setSelectedFile(fileUrl); // Update state with uploaded file URL
    } catch (error) {
      console.error("Upload Error:", error); // Log errors for debugging
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-2xl">
            {courseName}
            {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}
          </h2>
          <p className="text-gray-500 text-sm mt-5">{Description}</p>
          <h2 className="mt-5">
            <span className="font-semibold">Category</span> : {course?.category}
          </h2>
          <Link href={"/course/" + course?.courseId + "/start"}>
            <Button className="w-full mt-5">Start</Button>
          </Link>
        </div>
        <div>
          <label htmlFor="upload-image" className="relative cursor-pointer">
            {loading ? (
              <div className="flex items-center justify-center w-full h-[250px] bg-gray-100 rounded-xl">
                <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
              </div>
            ) : (
              <Image
                src={selectedFile || "/placeholder.jpeg"}
                width={300}
                height={300}
                alt="course-placeholder"
                className="w-full rounded-xl h-[250px] object-cover"
                unoptimized
                priority
              />
            )}
          </label>
          <input type="file" id="upload-image" className="hidden" onChange={onFileSelected} />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;


// Explain the topic in detail with the following format: Title: The name of the topic. Overview: A comprehensive explanation covering the purpose and importance of the topic. Details: In-depth discussion of the concept, including key features and insights. Code Example: Provide a practical example in HTML (or another language if applicable), with comments explaining each part of the code. Use Cases: Real-world applications or scenarios where the concept is applied. Key Points: A summary of essential takeaways for better understanding