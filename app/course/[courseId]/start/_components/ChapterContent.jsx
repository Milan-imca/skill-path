"use client";
import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css"; // Dark theme
import YouTube from "react-youtube";
import Markdown from "react-markdown";
import { Clipboard, Check } from "lucide-react"; // Icons for copy button
import { CourseProvider } from "@/app/_context/CourseContext";

const opts = {
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset copy status after 2s
  };

  useEffect(() => {
    Prism.highlightAll(); // Highlights all code blocks
  }, [content]);

  return (
    <CourseProvider>
      <div className="mt-20 ">
        {/* ✅ Full-Width Content Section */}
        <div className="w-full max-w-7xl  mx-auto">

          {/* ✅ Main Content Area */}
          <div className="w-full bg-white shadow-md rounded-lg p-5">
            {/* ✅ Chapter Title */}
            <h2 className="text-4xl font-extrabold text-blue-700 mb-4 text-center lg:text-left">
              {chapter?.["Chapter Name"]}
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed text-center lg:text-left">
              {chapter?.about}
            </p>

            {/* ✅ Video Section (Fully Responsive) */}
            {content?.videoId && (
              <div className="relative w-[90vw] sm:w-[50vw] aspect-video rounded-lg overflow-hidden shadow-lg z-0 mx-auto">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${content.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* ✅ Chapter Content */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
                {content?.content.chapterTitle}
              </h1>

              {/* ✅ Sections */}
              {content?.content.sections.map((section, index) => (
                <div
                  key={index}
                  className="mb-10 bg-gray-100 p-5 rounded-lg shadow-md border-l-4 border-blue-500"
                >
                  {/* ✅ Section Title */}
                  <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                    {section.title}
                  </h2>

                  {/* ✅ Explanation */}
                  <Markdown className="text-gray-700 leading-relaxed text-lg">
                    {section.explanation}
                  </Markdown>

                  {/* ✅ Code Block */}
                  {section.codeExample && (
                    <div className="relative bg-gray-900 text-white rounded-lg shadow-lg mt-4">
                      {/* ✅ Copy Button */}
                      <button
                        onClick={() => handleCopy(section.codeExample.trim(), index)}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                      >
                        {copiedIndex === index ? <Check size={16} /> : <Clipboard size={16} />}
                        {copiedIndex === index ? "Copied!" : "Copy"}
                      </button>

                      {/* ✅ Scrollable Code Container */}
                      <div className="p-4 overflow-x-auto max-h-64">
                        <pre className="whitespace-pre-wrap text-sm">
                          <code className="language-javascript">
                            {section.codeExample.trim().replace(/<precode>|<\/precode>/g, "")}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CourseProvider>
  );
};

export default ChapterContent;
