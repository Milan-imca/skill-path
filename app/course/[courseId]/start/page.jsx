"use client";
import React, { use, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";

const CourseStart = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);

  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourseAndChapter = async () => {
      setLoading(true);
      const result = await db.select().from(CourseList).where(eq(CourseList?.courseId, params?.courseId));

      if (result?.length > 0) {
        const courseData = result[0];
        setCourse(courseData);

        if (courseData?.courseOutput?.Chapters?.length > 0) {
          setCurrentIndex(0);
          setSelectedChapter(courseData.courseOutput.Chapters[0]);

          const chapterContentResult = await db.select()
            .from(Chapters)
            .where(and(eq(Chapters.chapterId, 0), eq(Chapters.courseId, courseData?.courseId)));

          setChapterContent(chapterContentResult[0]);
        }
      }
      setLoading(false);
    };

    fetchCourseAndChapter();
  }, [params?.courseId]);

  const updateChapter = async (newIndex) => {
    if (course?.courseOutput?.Chapters[newIndex]) {
      setLoading(true);
      setCurrentIndex(newIndex);
      setSelectedChapter(course.courseOutput.Chapters[newIndex]);

      const contentResult = await db.select()
        .from(Chapters)
        .where(and(eq(Chapters.chapterId, newIndex), eq(Chapters.courseId, course?.courseId)));

      setChapterContent(contentResult[0]);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Image src="/loading2.gif" alt="Loading..." width={120} height={120} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen bg-gray-50"
      >
        {/* Sidebar */}
        <div className="hidden md:block fixed h-[95vh] md:w-72 p-6 bg-white text-gray-900 shadow-lg rounded-2xl m-2 bottom-2 left-2 border border-gray-200">
          <h1 className="text-3xl font-bold tracking-wide mb-6 text-gray-800">SKILLPATH</h1>
          <Separator className="my-4" />
          <h2 className="text-lg font-semibold">{course?.courseOutput?.["Course Name"]}</h2>
          <Separator className="my-3" />
          <div className="space-y-2">
            {course?.courseOutput?.Chapters?.map((chapter, index) => (
              <>
                <div
                  key={index}
                  onClick={() => updateChapter(index)}
                  className="rounded-lg cursor-pointer transition-all bg-gray-100 hover:bg-blue-300 hover:text-white shadow-sm"
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
                

              </>
            ))}
          </div>
          <Link href={"/dashboard"}>
                  <Button className="mt-3 px-10"> <FaArrowAltCircleLeft /> Back to Dashboard</Button>
                </Link>
        </div>

        {/* Content Section */}
        <div className="flex-1 md:ml-72 p-5 mt-2 w-full">
          {course && selectedChapter && chapterContent ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <ChapterContent chapter={selectedChapter} content={chapterContent} params={params} />
            </motion.div>
          ) : (
            <p className="text-center text-gray-500">No content available.</p>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 mb-6 p-2">
            <Button variant="outline" disabled={currentIndex === 0} onClick={() => updateChapter(currentIndex - 1)}>
              <ChevronLeft className="h-5 w-5 mr-2" /> Previous
            </Button>
            <Button variant="outline" disabled={currentIndex === course?.courseOutput?.Chapters?.length - 1} onClick={() => updateChapter(currentIndex + 1)}>
              Next <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CourseStart;
