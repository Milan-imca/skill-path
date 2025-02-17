"use client";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiBars3 } from "react-icons/hi2";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import ChapterListCard from "../course/[courseId]/start/_components/ChapterListCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const NavbarC = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(chapters)

  useEffect(() => {
    const fetchCourseChapters = async () => {
      const result = await db.select().from(CourseList).where(eq(CourseList?.courseId, params?.courseId));

      if (result?.length > 0) {
        const courseData = result[0];
        setCourse(courseData);
        setChapters(courseData?.courseOutput?.Chapters || []);
      }
    };

    fetchCourseChapters();
  }, [params?.courseId]);

  return (
    <div className="flex items-center justify-between bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-5 rounded-xl relative w-full">
      {/* ✅ Mobile Menu Button */}
      <div className="md:hidden fixed top-5 left-5 z-50">
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
                <div
                  key={index}
                  onClick={() => { updateChapter(index); setSidebarOpen(false); }}
                  className="rounded-lg cursor-pointer transition-all bg-gray-100 hover:bg-blue-300 hover:text-white shadow-sm"
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
            <Link href={"/dashboard"}>
            <Button className="mt-3 px-10"> <FaArrowAltCircleLeft /> Back to Dashboard</Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>

      {/* ✅ Brand Logo */}
      <Link href={"/dashboard"}>
        <span>ICON</span>
      </Link>

      <h1 className="text-2xl font-bold">SkillPath</h1>

      {/* ✅ User Button */}
      <UserButton />
    </div>
  );
};

export default NavbarC;
