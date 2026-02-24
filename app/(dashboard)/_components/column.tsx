"use client";

import { Button } from "@/components/ui/button";
import { TutorCourse } from "@/data/page";
import { ColumnDef } from "@tanstack/react-table";
import { LucideTrash2, LucideView } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<TutorCourse>[] = [
  {
    accessorKey: "title",
    header: "Courses",
    cell: (row) => {
      const course = row.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-lg overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="flex flex-col">
            <h1 className="font-semibold">{course.title}</h1>{" "}
            <p className="text-sm text-gray-500">{course.category}</p>
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    accessorKey: "views",
    header: "Views",
  },

  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      const course = row.row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/tutor/my-courses/${course.id}`}>
            {/* <Button variant="outline">View</Button> */}
            <LucideView size={20} className="text-cyan-500" />
          </Link>
          {/* <Button variant="destructive">Delete</Button>*/}
          <LucideTrash2 size={20} className="text-red-500" />
        </div>
      );
    },
  },
];
