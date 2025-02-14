"use client"
import React, { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { UserInputContext } from '@/app/_context/UserInputContext';

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  return (
    <div className='px-5 md:px-10 lg:px-20 xl:px-32'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
        {/* Difficulty Level */}
        <div>
          <label className='text-sm font-medium text-gray-700'>🎯 Difficulty Level</label>
          <Select 
            onValueChange={(value) => handleInputChange('level', value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className='text-sm font-medium text-gray-700'>⏳ Course Duration</label>
          <Select 
            onValueChange={(value) => handleInputChange('duration', value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1hr">1 hr</SelectItem>
              <SelectItem value="2hr">2 hr</SelectItem>
              <SelectItem value="more than 3hr">More than 3 hr</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div>
          <label className='text-sm font-medium text-gray-700'>📹 Add Video</label>
          <Select 
            onValueChange={(value) => handleInputChange('displayVideo', value)}
            defaultValue={userCourseInput?.displayVideo}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div>
          <label className='text-sm font-medium text-gray-700'>📘 No. of Chapters</label>
          <Input
            type="number"
            className="w-full mt-2"
            onChange={(e) => handleInputChange('noOfChapters', e.target.value)}
            defaultValue={userCourseInput?.noOfChapters}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectOption;
