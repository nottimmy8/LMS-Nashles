"use client";

import { TutorCourse } from "@/data/page";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<TutorCourse>[] = [
  {
    accessorKey: "title",
    header: "Courses",
    cell: (row) => {
      const course = row.row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={course.thumbnail}
            alt={course.title}
            width={50}
            height={50}
          />
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
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
  },
];
