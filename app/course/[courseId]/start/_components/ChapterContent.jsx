"use client"
import React, { use, useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Dark theme
import YouTube from 'react-youtube';
import Markdown from 'react-markdown';
import { Clipboard, Check } from 'lucide-react'; // Icons for copy button
import Navbar from '@/app/components/Navbar';
import { UserButton } from '@clerk/nextjs';
import NavbarC from '@/app/components/NavBarC';

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
    <>

      <NavbarC />


      <div className="mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 mt-3">
        {/* Chapter Title */}
        <h2 className="text-3xl font-bold text-blue-600 mb-4">{chapter?.['Chapter Name']}</h2>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{chapter?.about}</p>

        {/* YouTube Video*/}

        {content?.videoId && (
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-4xl">
              <div className="relative overflow-hidden aspect-video">
                <YouTube videoId={content.videoId} opts={{
                  width: "100%",  // Ensures full width
                  height: "100%", // Ensures full height
                  playerVars: {
                    autoplay: 0,   // Prevents autoplay
                    rel: 0,        // Prevents showing related videos
                    modestbranding: 1, // Hides YouTube logo for a cleaner look
                  }
                }} className="w-full h-full" />
              </div>
            </div>
          </div>
        )}





        {/* Chapter Content */}

        <div className="mt-6">
          {/* Chapter Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{content?.content.chapterTitle}</h1>

          {/* Sections */}
          {content?.content.sections.map((section, index) => (
            <div key={index} className="mb-8 border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-blue-500 mb-2">{section.title}</h2>
              <Markdown className="text-gray-700 leading-relaxed">{section.explanation}</Markdown>

              {/* Code Block */}
              {section.codeExample && (
                <div className="relative bg-gray-900 text-white rounded-lg shadow-lg mt-4">
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(section.codeExample.trim(), index)}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {copiedIndex === index ? <Check size={16} /> : <Clipboard size={16} />}
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </button>

                  {/* Scrollable Code Container */}
                  <div className="p-4 overflow-x-auto max-h-64">
                    <pre className="whitespace-pre">
                      <code className="language-javascript">
                        {section.codeExample.trim().replace(/<precode>|<\/precode>/g, '')}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChapterContent;
