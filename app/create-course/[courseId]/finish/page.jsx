"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { MdOutlineContentCopy } from "react-icons/md";
import { Loader2 } from "lucide-react"; // Importing a loading spinner

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    if (params) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    setLoading(true); // Start loading
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      {loading ? (
        // Loader UI while content is fetching
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
          <p className="text-gray-500 mt-3">Loading course details...</p>
        </div>
      ) : (
        <>
          <h2 className="text-center font-bold text-2xl my-3 text-primary">
            Congrats! Your course is Ready 🎉
          </h2>
          <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
          <h2 className="mt-3">Course URL</h2>
          <h2 className="text-gray-400 border p-2 rounded-md flex gap-5 items-center justify-between">
            {process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId + "/start"}
            <MdOutlineContentCopy
              className="h-5 w-5 cursor-pointer"
              onClick={async () =>
                await navigator.clipboard.writeText(
                  process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId + "/start"
                )
              }
            />
          </h2>
        </>
      )}
    </div>
  );
};

export default FinishScreen;


// https://skill-path-ashy.vercel.app/course/3359b854-fa37-42ef-a4cc-fb1ab10a213c/start