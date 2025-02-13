import Image from 'next/image';
import React from 'react'

const CourseDetails = ({course}) => {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        <div className='flex gap-2 items-center'>
          <Image 
            src={"/levels.gif"}
            width={50}
            height={50}
            alt='level gif'
            unoptimized
          />
          <div>
              <h2 className='text-xs text-gray-500'>Skill level</h2>
              <h2 className='font-medium text-lg'>{course?.level}</h2>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Image 
            src={"/duration.gif"}
            width={50}
            height={50}
            alt='chapters gif'
            unoptimized
          />
          <div>
              <h2 className='text-xs text-gray-500'>Duration</h2>
              <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Image 
            src={"/chps.gif"}
            width={50}
            height={50}
            alt='nos gif'
            unoptimized
          />
          <div>
              <h2 className='text-xs text-gray-500'>No. Of Chapters</h2>
              <h2 className='font-medium text-lg'>{course?.courseOutput?.NoOfChapters}</h2>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Image 
            src={"/videos.gif"}
            width={50}
            height={50}
            alt='level image'
            unoptimized
          />
          <div>
              <h2 className='text-xs text-gray-500'>Included Video</h2>
              <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails; 