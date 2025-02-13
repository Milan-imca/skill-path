"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";




const NavbarC = () => {

  return (
    <>
      {/* ✅ Navbar (Same for Desktop & Mobile) */}
      <div className="flex items-center justify-between bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-5 rounded-xl relative w-full">
        {/* ✅ Brand Logo (Click to Go Home) */}
        <Link href={"/dashboard"}>
          <span className="">ICON</span>
        </Link>
        {/* ✅ User Button (Clerk) */}
        <UserButton />
      </div>
    </>
  );
};

export default NavbarC;
