"use client";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState } from "react";
import { HiBars3, HiHome, HiSquare3Stack3D, HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const Menu = [
    { id: 1, name: "Home", icon: <HiHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <HiSquare3Stack3D />, path: "/dashboard/explore" },
    { id: 3, name: "Logout", icon: <HiArrowLeftEndOnRectangle />, path: "/" },
  ];

  return (
    <>
    <div className="bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-4 rounded-xl w-full flex items-center justify-between">
    
      {/* ✅ Mobile Menu Button (Hidden on Larger Screens) */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="p-2 rounded-md shadow-md bg-white">
            <HiBars3 className="text-gray-700 text-2xl" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6 bg-white text-gray-900 shadow-lg">
            <h1 className="text-3xl font-bold tracking-wide mb-6 text-gray-800">SKILLPATH</h1>
            <hr className="border-gray-300 my-4" />
            <ul className="space-y-3">
              {Menu.map((item) => (
                <Link href={item.path} key={item.id} onClick={() => setOpen(false)}>
                  <div className="flex items-center gap-3 p-3 rounded-lg text-lg font-medium cursor-pointer transition-all text-gray-600 hover:bg-purple-200 hover:text-gray-900">
                    <span className="text-xl">{item.icon}</span>
                    <h2>{item.name}</h2>
                  </div>
                </Link>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      {/* ✅ Brand Logo */}
      <Link href={"/dashboard"} className="text-xl font-bold text-gray-800">
        SKILLPATH
      </Link>

      {/* ✅ Desktop Menu (Hidden on Mobile) */}
      <div className="hidden md:flex gap-6">
        {Menu.map((item) => (
          <Link href={item.path} key={item.id} className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition">
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* ✅ User Button (Clerk) */}
      <UserButton appearance={{ elements: { userButtonPopoverFooter: "hidden" } }} />
    </div>
    </>
  );
};

export default Navbar;
