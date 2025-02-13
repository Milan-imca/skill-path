"use client";
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { HiHome, HiSquare3Stack3D, HiCurrencyDollar, HiArrowLeftEndOnRectangle, HiBars3 } from "react-icons/hi2";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

const SideBar = () => {
  const { userCourseList } = useContext(UserCourseListContext);
  const path = usePathname();
  const [open, setOpen] = useState(false); // State for Sheet

  const Menu = [
    { id: 1, name: 'Home', icon: <HiHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiSquare3Stack3D />, path: '/dashboard/explore' },
    { id: 3, name: 'Upgrade', icon: <HiCurrencyDollar />, path: '/dashboard/upgrade' },
    { id: 4, name: 'Logout', icon: <HiArrowLeftEndOnRectangle />, path: '/dashboard/logout' },
  ];

  return (
    <>
      {/* ✅ Sidebar for Desktop */}
      <div className='hidden md:block fixed h-[95vh] md:w-64 p-6 bg-white text-gray-900 shadow-lg rounded-2xl m-2 bottom-2 left-2 border border-gray-200'>
        <h1 className='text-3xl font-bold tracking-wide mb-6 text-gray-800'>SKILLPATH</h1>
        <hr className='border-gray-300 my-4' />

        <ul className='space-y-3'>
          {Menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <div className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium cursor-pointer transition-all 
            ${item.path === path ? 'bg-purple-300 text-white shadow-md' : 'text-gray-600 hover:bg-purple-200 hover:text-gray-900'}`}>
                <span className="text-xl">{item.icon}</span>
                <h2 className="rounded-md">{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>

        <div className='absolute bottom-6 left-0 w-full px-6'>
          <Progress value={(userCourseList?.length / 5) * 100} className='h-2 rounded-lg bg-gray-300' />
          <h2 className='text-sm mt-2 text-gray-700'>{userCourseList?.length} out of 5 courses created</h2>
          <p className='text-xs text-gray-500'>Upgrade your plan for unlimited courses</p>
        </div>
      </div>

      {/* ✅ Mobile/Tablet Sidebar using ShadCN Sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="fixed top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-md">
            <HiBars3 className="text-gray-700 text-2xl" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6 bg-white text-gray-900 shadow-lg">
            <h1 className='text-3xl font-bold tracking-wide mb-6 text-gray-800'>SKILLPATH</h1>
            <hr className='border-gray-300 my-4' />

            <ul className='space-y-3'>
              {Menu.map((item) => (
                <Link href={item.path} key={item.id} onClick={() => setOpen(false)}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium cursor-pointer transition-all 
                ${item.path === path ? 'bg-purple-300 text-white shadow-md' : 'text-gray-600 hover:bg-purple-200 hover:text-gray-900'}`}>
                    <span className="text-xl">{item.icon}</span>
                    <h2 className="rounded-md">{item.name}</h2>
                  </div>
                </Link>
              ))}
            </ul>

            <div className='absolute bottom-6 left-0 w-full px-6'>
              <Progress value={(userCourseList?.length / 5) * 100} className='h-2 rounded-lg bg-gray-300' />
              <h2 className='text-sm mt-2 text-gray-700'>{userCourseList?.length} out of 5 courses created</h2>
              <p className='text-xs text-gray-500'>Upgrade your plan for unlimited courses</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SideBar;
