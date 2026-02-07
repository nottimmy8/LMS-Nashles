import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFileUrl = (path: string | undefined) => {
  if (!path) return null;
  // Handle Cloudinary or other external URLs
  if (
    path.startsWith("http") ||
    path.startsWith("https") ||
    path.startsWith("blob:")
  )
    return path;

  // Handle local files (fallback)

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api/v1", "") ||
    "http://localhost:5000";

  // Ensure path starts with / if not present
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
