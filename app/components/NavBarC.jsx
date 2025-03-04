"use client";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import ChapterListCard from "../course/[courseId]/start/_components/ChapterListCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const NavbarC = ({ course, updateChapter }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-7xl  mx-auto px-4 sm:px-6 lg:px-12 py-4 bg-white/30 backdrop-blur-md border border-white/30 shadow-lg rounded-none lg:rounded-xl">
      
      {/* ✅ Sidebar Toggle Button (Visible on all screens) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 overflow-y-scroll">
          <h2 className="text-lg font-semibold">{course?.courseOutput?.["Course Name"]}</h2>
          <Separator className="my-3" />
          <div className="space-y-2 ">
            {course?.courseOutput?.Chapters?.map((chapter, index) => (
              <div
                key={index}
                onClick={() => {
                  updateChapter(index);
                  setSidebarOpen(false);
                }}
                className="rounded-lg cursor-pointer transition-all bg-gray-100 hover:bg-blue-300 hover:text-white shadow-sm"
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))}
          </div>
          <Link href={"/dashboard"}>
            <Button className="mt-3 px-10">
              <FaArrowAltCircleLeft /> Back to Dashboard
            </Button>
          </Link>
        </SheetContent>
      </Sheet>

      {/* ✅ Brand Title */}
      <h1 className="text-2xl font-bold">SkillPath</h1>

      {/* ✅ User Profile Button */}
      <UserButton />
    </div>
  );
};

export default NavbarC;
