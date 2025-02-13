"use client"
import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
    <div className='mx-20 lg:mx-44'>
      {/* input topic */}
      <div className='mt-5'>
        <label htmlFor="">🖋️ Write the topic for which you want to generate a course (Eg:Python,Yoga,AI etc.)</label>
        <Input
          placeholder={'Topic'}
          onChange={(e) => handleInputChange('topic', e.target.value)}
          defaultValue = {userCourseInput?.topic}
        />
      </div>
      <div className='mt-5'>
        <label htmlFor="">🎯 Tell us more about your course , what you want to include</label>
        <Textarea
          placeholder={"About your course"}
          onChange={(e) => handleInputChange('description', e.target.value)}
          defaultValue={userCourseInput?.description}
        />
      </div>
      {/* text area desc */}
    </div>
  )
}

export default TopicDescription