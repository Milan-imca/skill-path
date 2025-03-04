"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { MdOutlineContentCopy } from "react-icons/md";
import { Loader2 } from "lucide-react"; // Importing a loading spinner
import Navbar from "@/app/components/Navbar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";


const FinishScreen = ({ params: paramsPromise,refreshData}) => {
  const params = use(paramsPromise)
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("FinishScreen Params:", params); // Debugging log
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [params?.courseId, user?.primaryEmailAddress?.emailAddress]);

  const GetCourse = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        setCourse(result[0]);
      } else {
        console.warn("Course not found!");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };
  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      toast.success("Copied Successful!", {
              position: "top-right",
              autoClose: 3000,
            });
    } catch (error) {
      toast.success("Failed to copy!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="p-5">
        <Navbar />
        <ToastContainer />
      </div>
      <div className="px-10 md:px-20 lg:px-44 my-7">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
            <p className="text-gray-500 mt-3">Loading course details...</p>
          </div>
        ) : (
          <>
            <h2 className="text-center font-bold text-2xl my-3 text-primary">
              🎉 Congrats! Your course is Ready
            </h2>

            <CourseBasicInfo course={course} refreshData={refreshData} />

            <h2 className="mt-3 text-lg font-semibold">Course URL</h2>

            <div className="border p-3 rounded-md flex flex-wrap gap-3 items-center justify-between bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-600 dark:text-gray-300 break-all">{courseUrl}</span>
              <MdOutlineContentCopy
                className="h-6 w-6 cursor-pointer text-primary hover:text-primary-dark transition-all"
                onClick={copyToClipboard}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FinishScreen;
