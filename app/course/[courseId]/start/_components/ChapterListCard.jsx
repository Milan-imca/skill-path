import React from "react";
import { FaRegClock } from "react-icons/fa6";

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all bg-gray-50 hover:bg-blue-500 hover:text-white shadow-md border border-gray-200"
    >
      {/* Chapter Number */}
      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
        {index + 1}
      </div>

      {/* Chapter Info */}
      <div className="flex-1">
        <h2 className="text-sm font-bold text-gray-800 hover:text-white">{chapter?.["Chapter Name"]}</h2>
        <h2 className="flex items-center text-xs text-gray-500 hover:text-white gap-2 mt-1">
          <FaRegClock /> {chapter?.Duration}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;

