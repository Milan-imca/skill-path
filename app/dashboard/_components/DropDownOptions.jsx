"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdDeleteForever, MdShare,MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';



const DropDownOptions = ({ children, deleteCourse,course }) => {
  

  const [openDialog, setOpenDialog] = useState(false);

  const handleShareClick = async () => {
    const link = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`;
    
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
            className="flex justify-between  text-red-600 gap-1">
            Delete <MdDeleteForever />
          </DropdownMenuItem>

          

          <DropdownMenuItem
          onClick={handleShareClick}
            className="flex justify-between  text-blue-600 gap-1">
            Share<MdShare />
          </DropdownMenuItem>

        <Link href={"/create-course/" + course?.courseId + "/finish"}>

          <DropdownMenuItem
            className="flex justify-between  text-green-600 gap-1">
            Edit Image<MdEdit />
          </DropdownMenuItem>
        </Link>


        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { deleteCourse(); setOpenDialog(false) }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default DropDownOptions;