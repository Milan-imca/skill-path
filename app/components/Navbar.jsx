"use client";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState } from "react";
import { HiBars3, HiHome, HiSquare3Stack3D, HiCurrencyDollar, HiArrowLeftEndOnRectangle } from "react-icons/hi2";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to control the mobile menu

  const Menu = [
    { id: 1, name: "Home", icon: <HiHome />, path: "/dashboard" },
    { id: 2, name: "Explore", icon: <HiSquare3Stack3D />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <HiCurrencyDollar />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout", icon: <HiArrowLeftEndOnRectangle />, path: "/dashboard/logout" },
  ];

  return (
    <>
      {/* ✅ Navbar (Same for Desktop & Mobile) */}
      <div className="flex items-center justify-between bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-5 rounded-xl relative w-full">
        {/* ✅ Mobile Menu Button (Hidden on Desktop) */}
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
                    <div
                      className="flex items-center gap-3 p-3 rounded-lg text-lg font-medium cursor-pointer transition-all text-gray-600 hover:bg-purple-200 hover:text-gray-900"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <h2 className="rounded-md">{item.name}</h2>
                    </div>
                  </Link>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* ✅ Brand Logo (Click to Go Home) */}
        <Link href={"/dashboard"}>
          <span>ICON</span>
        </Link>

        {/* ✅ User Button (Clerk) */}
        <UserButton />
      </div>
    </>
  );
};

export default Navbar;
