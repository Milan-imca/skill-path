"use client";

import Image from "next/image";
import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropDownOptions from "./DropDownOptions";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Define fixed colors for categories
const categoryColors = {
  Programming: "bg-blue-500",
  Yoga: "bg-green-500",
  Creative: "bg-purple-500",
  Science: "bg-indigo-500",
  Maths: "bg-yellow-500",
  Others: "bg-gray-400",
  Default: "bg-gray-400",
};

// List of placeholder images
const placeholderImages = [
  "/p1.jpg",
  "/p2.jpg",
  "/p3.jpg",
  "/p4.jpg",
];

// Function to get a consistent placeholder based on course ID
const getPlaceholderImage = (id) => {
  if (!id) return placeholderImages[0]; // Default if no ID
  const index = parseInt(id, 36) % placeholderImages.length; // Hash-like function
  return placeholderImages[index];
};

const CourseCard = ({ course, refreshData, displayUser = false }) => {
  const categoryColor = categoryColors[course?.category] || categoryColors["Default"];

  const handleCourseDelete = async () => {
    const response = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (response) {
      refreshData();
    }
  };

  return (
    <Card className="shadow-lg rounded-lg transition-transform duration-200 hover:scale-105 max-w-sm md:max-w-xs w-[300px]">
      {/* Course Start Page Link */}
      <Link href={`/course/${course?.courseId}/start`} prefetch={true}>
      {/* course image */}
        <Image
          src={course?.courseBanner || getPlaceholderImage(course?.id)}
          width={300}
          height={200}
          className="w-full h-[180px] object-cover rounded-t-lg"
          unoptimized
          priority
          alt="course image"
        />
      </Link>

      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          {/* Fixed Category Badge */}
          <Badge className={`text-xs px-2 py-1 rounded-md font-medium ${categoryColor}`}>
            {course?.category}
          </Badge>

          {/* Options Dropdown (Only if displayUser is false) */}
          {!displayUser && (
            <DropDownOptions deleteCourse={handleCourseDelete} course={course}>
              <FaEllipsisVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </DropDownOptions>
          )}
        </div>

        {/* Course Title */}
        <h2 className="font-semibold text-sm truncate">
          {course?.courseOutput?.["Course Name"]}
        </h2>

        {/* Course Details */}
        <p className="text-xs text-gray-500">
          {course?.courseOutput?.NoOfChapters} Chapters • {course?.level}
        </p>

        {/* Display User Info if enabled */}
        {displayUser && (
          <div className="flex items-center gap-2 mt-2">
            <Image
              src={course?.userProfileImage || "/default-user.png"}
              width={30}
              height={30}
              className="rounded-full"
              alt="user profile"
            />
            <h2 className="text-xs">{course?.userName}</h2>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
