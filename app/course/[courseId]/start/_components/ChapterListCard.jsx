// import React from 'react'
// import { FaRegClock } from "react-icons/fa6";

// const ChapterListCard = ({ chapter, index }) => {
//   return (
//     <div className='grid grid-cols-5 p-4 items-center border-b'>
//       <div>
//         <h2 className='p-1 w-8 h-8 bg-primary rounded-full text-white text-center'>{index + 1}</h2>
//       </div>
//       <div className='col-span-4'>
//         <h2 className='font-medium'>{chapter?.["Chapter Name"]}</h2>
//         <h2 className='flex items-center text-sm text-primary gap-2'> <FaRegClock /> {chapter?.Duration}</h2>
//       </div>
//     </div>
//   )
// }

// export default ChapterListCard;

import React from "react";
import { FaRegClock } from "react-icons/fa6";

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div
      className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all 
      bg-gray-100 hover:bg-blue-500 hover:text-white shadow-sm"
    >
      {/* Chapter Number */}
      <div className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full text-sm font-bold">
        {index + 1}
      </div>

      {/* Chapter Info */}
      <div className="flex-1">
        <h2 className="text-sm font-bold">{chapter?.["Chapter Name"]}</h2>
        <h2 className="flex items-center text-xs text-primary gap-2 mt-1">
          <FaRegClock /> {chapter?.Duration}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;
