"use client"
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


const EditCourseBasicInfo = ({ course, refreshData }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();


  useEffect(() => {
    setTitle(course?.courseOutput?.["Course Name"]);
    setDescription(course?.courseOutput?.Description)
  }, [course])


  const onUpdateChange = async () => {

    if (course?.courseOutput) {
      course.courseOutput["Course Name"] = title; // Update the property directly
      course.courseOutput.Description = description
      console.log("Updated Course Name:", course.courseOutput["Course Name"]);
      console.log("Updated Course Description:", course.courseOutput.Description);
      const result = await db.update(CourseList).set({
        courseOutput: course?.courseOutput
      }).where(eq(CourseList?.id, course?.id))
        .returning({
          id: CourseList.id
        })
      console.log(result)
    } else {
      console.error("courseOutput is undefined, cannot update 'Course Name'.");
    }
    console.log(course)
    refreshData(true)
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={"/edit2.png"}
          width={30}
          height={30}
          alt='edit'
          unoptimized
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div className='mt-3'>
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.["Course Name"]}
                onChange={(e) => setTitle(e?.target.value)}
                placeholder="Your Course Title"

              />
            </div>
            <div>
              <label>Description</label>
              <Textarea 
              className="h-40" 
              defaultValue={course?.courseOutput?.Description} 
              onChange={(e) => setDescription(e?.target.value)} 
              placeholder="Enter your desired decription"

              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdateChange}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default EditCourseBasicInfo