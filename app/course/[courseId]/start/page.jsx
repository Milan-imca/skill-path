"use client"
import React, { use, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { HiBars3, HiHome, HiSquare3Stack3D, HiCurrencyDollar, HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import NavbarC from "@/app/components/NavBarC";

const CourseStart = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false); // State to control the mobile menu

  useEffect(() => {
    const fetchCourseAndChapter = async () => {
      const result = await db.select().from(CourseList).where(eq(CourseList?.courseId, params?.courseId));
      if (result?.length > 0) {
        const courseData = result[0];
        setCourse(courseData);

        if (courseData?.courseOutput?.Chapters?.length > 0) {
          setCurrentIndex(0);
          setSelectedChapter(courseData.courseOutput.Chapters[0]);
          const chapterContentResult = await db.select().from(Chapters).where(and(eq(Chapters.chapterId, 0), eq(Chapters.courseId, courseData?.courseId)));
          setChapterContent(chapterContentResult[0]);
        }
      }
    };

    fetchCourseAndChapter();
  }, [params?.courseId]);

  const updateChapter = async (newIndex) => {
    if (course?.courseOutput?.Chapters[newIndex]) {
      setCurrentIndex(newIndex);
      setSelectedChapter(course.courseOutput.Chapters[newIndex]);
      const contentResult = await db.select().from(Chapters).where(and(eq(Chapters.chapterId, newIndex), eq(Chapters.courseId, course?.courseId)));
      setChapterContent(contentResult[0]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Toggle (Mobile) */}
      <div className="md:hidden fixed top-11 left-10 z-50">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <h2 className="text-lg font-semibold">{course?.courseOutput?.["Course Name"]}</h2>
            <Separator className="my-3" />
            <div className="space-y-2">
              {course?.courseOutput?.Chapters?.map((chapter, index) => (
                <div key={index} onClick={() => { updateChapter(index); setSidebarOpen(false); }}>
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>



      <div className='hidden md:block fixed h-[95vh] md:w-72 p-6 bg-white text-gray-900 shadow-lg rounded-2xl m-2 bottom-2 left-2 border border-gray-200'>
        <h1 className='text-3xl font-bold tracking-wide mb-6 text-gray-800'>SKILLPATH</h1>
        <hr className='border-gray-300 my-4' />
        <div className="">
          {/* Course Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            {course?.courseOutput?.["Course Name"]}
          </h2>

          {/* Separator */}
          <Separator className="my-3" />

          {/* Scrollable Chapter List */}
          <div className="space-y-2">
            {course?.courseOutput?.Chapters?.map((chapter, index) => (
              <div
                key={index}
                onClick={() => updateChapter(index)}
                className="rounded-lg cursor-pointer transition-all bg-gray-100 hover:bg-blue-300 hover:text-white shadow-sm"
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 md:ml-72 p-5 mt-2">
        {course && selectedChapter && chapterContent ? (
          <ChapterContent chapter={selectedChapter} content={chapterContent} />
        ) : (
          <p className="text-center text-gray-500">Loading chapter content...</p>
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
    </div>
  );
};

export default CourseStart;
