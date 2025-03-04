"use client";
import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateChapter = (newIndex) => {
    if (course?.courseOutput?.Chapters[newIndex]) {
      setCurrentIndex(newIndex);
      setSelectedChapter(course.courseOutput.Chapters[newIndex]);
    }
  };

  return (
    <CourseContext.Provider value={{ course, setCourse, selectedChapter, updateChapter }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
