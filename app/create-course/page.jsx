"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '../_context/UserInputContext'
import { GenerateCourseLayout_AI } from '@/configs/AiModel'
import LoadingDialog from './_components/LoadingDialog'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


const CreateCourse = () => {


  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <Image
        src="/category-animation.gif"
        alt="GIF Icon"
        width={50}
        height={50}
        priority
        unoptimized
        className='rounded-lg'
      />
    },
    {
      id: 1,
      name: 'Topic and Description',
      icon: <Image
        src="/topic-animation.gif"
        alt="GIF Icon"
        width={50}
        height={50}
        priority
        unoptimized
        className='rounded-lg'
      />
    },
    {
      id: 3,
      name: 'Options',
      icon: <Image
        src="/options-animation.gif"
        alt="GIF Icon"
        width={50}
        height={50}
        priority
        unoptimized
        className='rounded-lg'
      />
    },
  ]

  const router = useRouter()

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0);

  const { user } = useUser();

  console.log("USER",user)


  useEffect(() => {
    console.log(userCourseInput)
  }, [userCourseInput])

  const checkStatus = () => {
    if (activeIndex === 0) {
      // Ensure 'category' is defined and not empty
      return !(userCourseInput?.category && userCourseInput.category.trim() !== "");
    }
    if (activeIndex === 1) {
      // Ensure 'topic' and 'description' are defined and not empty
      return !(
        userCourseInput?.topic &&
        userCourseInput.topic.trim() !== "" &&
        userCourseInput?.description &&
        userCourseInput.description.trim() !== ""
      );
    }
    else if (activeIndex === 2 && (userCourseInput?.level === undefined || userCourseInput?.duration === undefined || userCourseInput?.displayVideo === undefined || userCourseInput?.noOfChapters === undefined)) {
      return true
    }
    return false; // Default to false if no condition matches
  };
  const [loading, setLoading] = useState(false)

  const GenerateCourseLayout = async () => {
    setLoading(true);
    try {

      const BASIC_PROMPT = "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: ";
      const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOf Chapters: ${userCourseInput?.noOfChapters}, in JSON format`;
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      console.log("Prompt:", FINAL_PROMPT);
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);

      if (result?.response?.text()) {
        const parsedResponse = JSON.parse(result.response.text());
        SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
        console.log("Parsed Response:", parsedResponse);

      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.log("Error generating course layout:", error.message);
    } finally {
      setLoading(false);

    }

  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true)
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName || user?.username,
      userProfileImage: user?.imageUrl
    })
    console.log("finish")

    setLoading(false)
    router.replace('/create-course/' + id)
  }


  return (
    <div>
      {/* stepper */}
      <div className='flex flex-col justify-center items-center mt-5'>
        <h1 className='text-4xl text-primary font-medium'>Create course</h1>
        <div className='flex mt-10'>
          {
            StepperOptions.map((item, index) => (
              <div className='flex items-center' key={index}>
                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                  <div className={`bg-gray-200 p-2 rounded-xl text-black ${activeIndex >= index && 'bg-primary'}`}>
                    {item.icon}
                  </div>
                  <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                </div>
                {
                  index != StepperOptions?.length - 1 &&
                  <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px]   ${activeIndex - 1 >= index ? 'bg-primary' : 'bg-gray-400'}`}></div>
                }

              </div>
            ))
          }
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>

        {/* component */}
        {
          activeIndex == 0 ? <SelectCategory /> : null
        }
        {
          activeIndex == 1 ? <TopicDescription /> : null
        }
        {
          activeIndex == 2 ? <SelectOption /> : null
        }

        {/* next previous button */}
        <div className='flex justify-between mt-10'>

          <Button
            disabled={activeIndex == 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >Previous</Button>
          {
            activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>
          }
          {
            activeIndex == 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course</Button>
          }

        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse;