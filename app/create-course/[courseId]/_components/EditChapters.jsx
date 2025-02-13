"use client"
import React, { useEffect, useState } from 'react'
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
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'


const EditChapters = ({ course, index, refreshData }) => {

  const chapter = course?.courseOutput?.Chapters;
  const [name, setName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setName(chapter[index]?.["Chapter Name"])
    setAbout(chapter[index]?.about)
  }, [course])

  const onUpdateChange = async () => {
    if (course?.courseOutput?.Chapters && course.courseOutput.Chapters[index]) {
      // Update chapter details
      course.courseOutput.Chapters[index]["Chapter Name"] = name;
      course.courseOutput.Chapters[index].about = about;

      // Print the updated chapter details
      console.log("Updated Chapter Name:", course.courseOutput.Chapters[index]["Chapter Name"]);
      console.log("Updated About:", course.courseOutput.Chapters[index].about);

      // Log the full course object for debugging
      console.log("Updated Course:", course);
    } else {
      console.error("Chapter at the given index does not exist or courseOutput is undefined.");
    }


    const result = await db.update(CourseList).set({
      courseOutput: course?.courseOutput
    }).where(eq(CourseList?.id, course?.id))
      .returning({id: CourseList.id})
      console.log(result)
      refreshData(true)
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={"/edit3.png"}
          width={30}
          height={30}
          alt='edit'
          unoptimized
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className='mt-3'>
              <label>Course Title</label>
              <Input
                defaultValue={chapter[index]?.["Chapter Name"]}
                onChange={(e) => setName(e?.target.value)}

              />
            </div>
            <div>
              <label>Description</label>
              <Textarea className="h-40" defaultValue={chapter[index]?.about} onChange={(e) => setAbout(e?.target.value)} />
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

export default EditChapters;