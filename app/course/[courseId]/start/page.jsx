"use client";
import React, { useEffect, useState } from "react";
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
import NavbarC from "@/app/components/NavBarC";

const CourseStart = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCourseAndChapter = async () => {
      setLoading(true);
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId));

      if (result?.length > 0) {
        const courseData = result[0];
        setCourse(courseData);

        if (courseData?.courseOutput?.Chapters?.length > 0) {
          setCurrentIndex(0);
          setSelectedChapter(courseData.courseOutput.Chapters[0]);

          const chapterContentResult = await db
            .select()
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

      const contentResult = await db
        .select()
        .from(Chapters)
        .where(and(eq(Chapters.chapterId, newIndex), eq(Chapters.courseId, course?.courseId)));

      setChapterContent(contentResult[0]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Loading Screen */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Image src="/loading2.gif" alt="Loading..." width={120} height={120} />
        </div>
      )}

      {/* ✅ Navbar (fixed at the top) */}
      <NavbarC course={course} updateChapter={updateChapter} params={params} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row min-h-screen bg-gray-100"
      >
        

        {/* ✅ Main Content Section */}
        <div className="flex flex-col min-h-screen bg-gray-50 w-full">
          {course && selectedChapter && chapterContent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ChapterContent chapter={selectedChapter} content={chapterContent} params={params} />
            </motion.div>
          ) : (
            <div className="mt-20 flex flex-col items-center justify-center text-center p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-red-600">⚠️ Something went wrong!</p>
              <p className="text-sm text-gray-700 mt-1">Please try again after some time.</p>
            </div>

          )}

          {/* ✅ Navigation (Responsive) */}
          <div className="flex justify-between mt-6 mb-6 p-2">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => updateChapter(currentIndex - 1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" /> Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentIndex === course?.courseOutput?.Chapters?.length - 1}
              onClick={() => updateChapter(currentIndex + 1)}
              className="flex items-center gap-2"
            >
              Next <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CourseStart;
