"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
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
    { id: 1, name: 'Category', icon: '/category-animation.gif' },
    { id: 2, name: 'Topic and Description', icon: '/topic-animation.gif' },
    { id: 3, name: 'Options', icon: '/options-animation.gif' },
  ];

  const router = useRouter();
  const { userCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const checkStatus = () => {
    if (activeIndex === 0) return !(userCourseInput?.category?.trim());
    if (activeIndex === 1) return !(userCourseInput?.topic?.trim());
    if (activeIndex === 2) return !(userCourseInput?.level && userCourseInput?.duration && userCourseInput?.displayVideo && userCourseInput?.noOfChapters);
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);
    try {
      const FINAL_PROMPT = `Generate A Course Tutorial on Following Detail: Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOf Chapters: ${userCourseInput?.noOfChapters}, in JSON format`;
      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const parsedResponse = JSON.parse(result.response.text());
      SaveCourseLayoutInDb(parsedResponse);
    } catch (error) {
      console.error("Error generating course layout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    setLoading(true);
    const id = uuid4();
    await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName || user?.username,
      userProfileImage: user?.imageUrl
    });
    setLoading(false);
    router.replace(`/create-course/${id}`);
  };

  return (
    <div className='flex flex-col items-center mt-5 px-4 sm:px-10 md:px-20 lg:px-32'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl text-primary font-semibold text-center'>Create Course</h1>

      {/* Stepper */}
      <div className='relative flex justify-center items-center mt-10 w-full max-w-4xl'>
        {/* Background Progress Bar (Gray) */}
        <div className="absolute top-[35px] left-0 w-full h-1 sm:h-1.5 bg-gray-300 rounded-full" />

        {/* Active Progress Bar (Animated) */}
        <div
          className="absolute top-[35px] left-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 to-primary rounded-full transition-all duration-500"
          style={{ width: `${(activeIndex / (StepperOptions.length - 1)) * 100}%` }}
        />

        {/* Stepper Items */}
        <div className='flex justify-between w-full px-5 sm:px-10 md:px-16'>
          {StepperOptions.map((item, index) => (
            <div key={index} className="relative flex flex-col items-center z-10">
              {/* Step Icon */}
              <div className={`rounded-lg border-4 transition-all duration-300 
          ${activeIndex >= index ? 'border-primary bg-primary text-white scale-110 shadow-lg' : 'border-gray-400 bg-gray-200'}`}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40} height={40}
                  className='rounded-md w-10 sm:w-12 md:w-14'
                />
              </div>

              {/* Step Name */}
              <h2 className='text-xs sm:text-sm md:text-base font-medium mt-2 text-center'>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className='w-full max-w-2xl mt-10'>
        {activeIndex === 0 && <SelectCategory />}
        {activeIndex === 1 && <TopicDescription />}
        {activeIndex === 2 && <SelectOption />}
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-between w-full max-w-2xl mt-10'>
        <Button disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
        {activeIndex < 2 ? (
          <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>
        ) : (
          <Button disabled={checkStatus()} onClick={GenerateCourseLayout}>Generate Course</Button>
        )}
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCourse;
