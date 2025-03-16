"use client";
import { useState, useEffect, use } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineContentCopy } from "react-icons/md";
import { Loader2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { storage } from "@/configs/appwriteConfig";
import Link from "next/link";

const FinishScreen = ({ params: paramsPromise, refreshData }) => {
  const params = use(paramsPromise);
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const placeholderImages = ["/p1.jpg", "/p2.jpg", "/p3.jpg", "/p4.jpg"];

  const getPlaceholderImage = (id) => {
    if (!id) return placeholderImages[0];
    const index = parseInt(id, 36) % placeholderImages.length;
    return placeholderImages[index];
  };

  useEffect(() => {
    if (params?.courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [params?.courseId, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    console.log("Current Pathname:", pathname);
    console.log("Expected Path:", `/course/${course?.courseId}/start`);
  
    if (pathname === `/course/${course?.courseId}/start`) {
      setIsNavigating(false); // Reset after navigation
    }
  }, [pathname, course?.courseId]);
  

  const GetCourse = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result.length > 0) {
        setCourse(result[0]);
        setSelectedFile(result[0]?.courseBanner);
      } else {
        console.warn("Course not found!");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleStartCourse = () => {
  //   setIsNavigating(true);
  //   router.push(`/course/${course?.courseId}/start`);
  // };

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setSelectedFile(URL.createObjectURL(file));

    try {
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        "unique()",
        file
      );
      const fileId = result.$id;
      const fileUrl = storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);

      await db
        .update(CourseList)
        .set({ courseBanner: fileUrl })
        .where(eq(CourseList.id, course?.id));

      setSelectedFile(fileUrl);

      toast.dismiss(); // Dismiss any previous toast
      toast.success("Upload Successful!", { autoClose: 3000 });
    } catch (error) {
      console.error("Upload Error:", error);
      toast.dismiss();
      toast.error("Upload Failed! Please try again.", { autoClose: 3000 });
    } finally {
      setIsUploading(false);
    }
  };

  const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      toast.dismiss();
      toast.success("Copied Successfully!", { autoClose: 3000 });
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to copy!", { autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="p-5">
        <Navbar />
        <ToastContainer />
      </div>
      <div className="px-10 md:px-20 lg:px-44 my-7">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Loader2 className="animate-spin text-gray-500 w-10 h-10" />
            <p className="text-gray-500 mt-3">Loading course details...</p>
          </div>
        ) : (
          <>
            <h2 className="text-center font-bold text-2xl my-3 text-primary">
              🎉 Congrats! Your course is Ready
            </h2>

            {/* Course Basic Info */}
            <div className="p-4 md:p-6 lg:p-8 border rounded-xl shadow-sm mt-6 md:mt-10 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl">
                    {course?.courseOutput?.["Course Name"] || "Give your custom Course Name"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-4 md:mt-5">
                    {course?.courseOutput?.Description || "Give your custom Description"}
                  </p>
                  <h2 className="mt-4 md:mt-5">
                    <span className="font-semibold">Category</span>: {course?.category}
                  </h2>
                  <Link href={`/course/${course?.courseId}/start`} onClick={() => setIsNavigating(true)}>
                    <Button className="w-full mt-4 md:mt-5" disabled={loading || isNavigating}>
                      {isNavigating ? <Loader2 className="animate-spin w-5 h-5" /> : "Start"}
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <label htmlFor="upload-image" className="relative cursor-pointer block w-full">
                    <Image
                      src={selectedFile || getPlaceholderImage(course?.id)}
                      width={500}
                      height={500}
                      alt="course-placeholder"
                      className="w-full h-[200px] md:h-[250px] object-cover rounded-xl"
                      unoptimized
                      priority
                    />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                        <Loader2 className="animate-spin text-white w-10 h-10" />
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="upload-image"
                    className="hidden"
                    onChange={onFileSelected}
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>

            {/* Course URL */}
            <h2 className="mt-3 text-lg font-semibold">Course URL</h2>
            <div className="border p-3 rounded-md flex flex-wrap gap-3 items-center justify-between bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-600 dark:text-gray-300 break-all">{courseUrl}</span>
              <MdOutlineContentCopy
                className="h-6 w-6 cursor-pointer text-primary hover:text-primary-dark transition-all"
                onClick={copyToClipboard}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FinishScreen;
