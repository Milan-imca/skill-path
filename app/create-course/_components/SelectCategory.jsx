// import { UserInputContext } from '@/app/_context/UserInputContext'
// import CategoryList from '@/app/_shared/CategoryList'
// import Image from 'next/image'
// import React, { useContext } from 'react'

// const SelectCategory = () => {
//   const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

//   const handleCategoryChange = (category) => {
//     setUserCourseInput(prev => ({
//       ...prev,
//       category: category
//     }))
//   }
//   return (
//     <div className='px-10 md:px-20'>
//       <h2 className='my-5'>Select the Course Category</h2>

//       <div className='grid grid-cols-3 gap-10 '>
//         {
//           CategoryList.map((item, index) => (
//             <div
//               key={index}
//               className={`flex flex-col p-5 border items-center rounded-xl  shadow-md hover:shadow-lg hover:shadow-slate-200 ${userCourseInput?.category === item.name ? 'border-4 border-primary scale-105 transition-transform duration-300' : ''}`}
//               onClick={() => handleCategoryChange(item.name)}
//             >

//               <Image src={item.icon} width={120} height={120} unoptimized alt='GIF-ICON' />
//               <h2>{item.name}</h2>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default SelectCategory

import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category
    }))
  }

  return (
    <div className='px-6 md:px-12 lg:px-20'>
      <h2 className='my-5 text-lg md:text-xl font-semibold text-center'>Select the Course Category</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10'>
        {
          CategoryList.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col p-4 md:p-5 border items-center rounded-xl shadow-md hover:shadow-lg hover:shadow-slate-200 cursor-pointer transition-all duration-300 
              ${userCourseInput?.category === item.name ? 'border-4 border-primary scale-105' : ''}`}
              onClick={() => handleCategoryChange(item.name)}
            >
              <Image 
                src={item.icon} 
                width={100} 
                height={100} 
                className="w-20 md:w-30 h-20 md:h-30 object-contain" 
                unoptimized 
                alt='GIF-ICON' 
              />
              <h2 className='text-sm md:text-base font-medium mt-2'>{item.name}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SelectCategory
