"use client"
import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  return (
    <div className='px-5 md:px-10 lg:px-20 xl:px-32'>
      {/* Input topic */}
      <div className='mt-5'>
        <label className="block text-sm md:text-base font-medium text-gray-700">
          🖋️ Write the topic for which you want to generate a course (Eg: Python, Yoga, AI, etc.)
        </label>
        <Input
          className="w-full mt-2"
          placeholder="Topic"
          onChange={(e) => handleInputChange('topic', e.target.value)}
          defaultValue={userCourseInput?.topic}
        />
      </div>
    </div>
  )
}

export default TopicDescription;
