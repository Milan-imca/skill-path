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
import { toast } from "react-toastify"; // ✅ Import React Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles
import { useRouter } from "next/navigation";


const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  const router = useRouter()
  
  const courseName = course?.courseOutput?.["Course Name"] || "Give your custom Course Name";
  const Description = course?.courseOutput?.Description || "Give your custom Description";

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false); // Track upload state

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const handleStartCourse = () => {
    router.push(`/course/${course?.courseId}/start`);
    router.refresh(); // ✅ Forces the page to refresh
  };
  

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
      const fileId = result.$id;
      const fileUrl = storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);

      await db
        .update(CourseList)
        .set({ courseBanner: fileUrl })
        .where(eq(CourseList.id, course?.id));

      setSelectedFile(fileUrl); // Update state with uploaded file URL

      // ✅ Success Toast Notification
      toast.success("Upload Successful! Your image has been uploaded.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Upload Error:", error);

      // ❌ Error Toast Notification
      toast.error("Upload Failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 border rounded-xl shadow-sm mt-6 md:mt-10 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-xl md:text-2xl flex items-center gap-2">
            {courseName}
            {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}
          </h2>
          <p className="text-gray-500 text-sm mt-4 md:mt-5">{Description}</p>
          <h2 className="mt-4 md:mt-5">
            <span className="font-semibold">Category</span>: {course?.category}
          </h2>
          {/* <Link href={`/course/${course?.courseId}/start`}> */}
            <Button className="w-full mt-4 md:mt-5" disabled={loading}  onClick={handleStartCourse}>
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Start"}
            </Button>
          {/* </Link> */}
        </div>
        <div>
          <label htmlFor="upload-image" className="relative cursor-pointer block w-full">
            {loading ? (
              <div className="flex items-center justify-center w-full h-[200px] md:h-[250px] bg-gray-100 rounded-xl">
                <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
              </div>
            ) : (
              <Image
                src={selectedFile || "/placeholder.jpeg"}
                width={500}
                height={500}
                alt="course-placeholder"
                className="w-full h-[200px] md:h-[250px] object-cover rounded-xl"
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