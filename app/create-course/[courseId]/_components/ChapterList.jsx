import React from 'react'
import { HiCheckCircle } from "react-icons/hi2";
import EditChapters from './EditChapters';

const ChapterList = ({ course, refreshData, edit = true }) => {
  console.log(course)
  return (
    <div className='mt-3'>
      <h2 className='font-medium text-xl'>CHAPTERS</h2>
      <div className='mt-2'>
        {
          course?.courseOutput?.Chapters.map((chapter, index) => (
            <div className='border p-5 rounded-lg flex items-center justify-between mb-2' key={index}>
              <div key={index} className='flex gap-5 items-center'>
                <h1 className='flex-none bg-primary h-10 w-10 text-white rounded-full text-center p-2'>{index + 1}</h1>
                <div>
                  <h2 className='font-medium text-lg'>{chapter?.["Chapter Name"] || chapter?.["ChapterName"] || "Untitled Course"}
                    {edit && <EditChapters course={course} index={index} refreshData={refreshData} />}
                  </h2>
                  <p className='text-gray-500 text-sm'>{chapter?.about}</p>
                  <p className='text-primary'>🕛{chapter?.Duration}</p>
                </div>
              </div>
              <HiCheckCircle className='text-4xl text-gray-200 flex-none' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChapterList;

// http://localhost:3000/create-course/0357c0c8-ff23-4190-ba2c-82514fd4a34b
