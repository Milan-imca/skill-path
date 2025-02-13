"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'



const Course = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const { user } = useUser();
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params) {
      GetCoure();
    }
  }, [params, user])

  const GetCoure = async () => {
    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId), eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
    setCourse(result[0]);
    console.log(result)
  }

  const GenerateChapterCourse = () => {
    setLoading(true)
    const chapters = course?.courseOutput?.Chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = "Explain the concept in Detail on Topic: " + course?.name + ", Chapter:" + chapter?.["Chapter Name"] + ", in JSON Format with list of array with field as title, explanation on given chapter in detail , Code Example(Code field in <precode> format )if applicable"
      console.log(PROMPT)
      try {
        let videoId = ""
        // video generation url:
        service.getVideos(course?.name + ':' + chapter?.["Chapter Name"]).then(response => {
          console.log(response);
          videoId = response[0]?.id?.videoId;
        })
        // chapter content generation
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        // console.log(result?.response?.text())
        const content = JSON.parse(result?.response?.text())
        // save the chapter content + video url
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
      await db.update(CourseList).set({
        publish: true
      })
      router.replace("/create-course/" + course?.courseId + "/finish")
    })
  }


  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      <LoadingDialog loading={loading} />

      {/* info */}
      <CourseBasicInfo course={course} refreshData={() => GetCoure()} />
      {/* course detail */}
      <CourseDetails course={course} />
      {/* list of lesson */}
      <ChapterList course={course} refreshData={() => GetCoure()} />

      <Button onClick={GenerateChapterCourse} className="my-10">Generate Course</Button>
    </div>
  )
}

export default Course;