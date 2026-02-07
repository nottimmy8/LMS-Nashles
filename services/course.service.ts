import api from "./api";

export interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  level?: string;
  price?: number;
  language?: string;
  thumbnail?: string;
  chapters?: Chapter[];
  status: "draft" | "published";
  publishedAt?: string;
  tutor: {
    _id: string;
    name: string;
    email: string;
  };
  students?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  _id?: string;
  id?: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  _id?: string;
  id?: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  description?: string;
}

export interface PaginatedResponse<T> {
  courses: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CourseFilters {
  category?: string;
  level?: string;
  language?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const courseService = {
  /**
   * Save a course as draft
   */
  saveDraft: async (courseData: FormData, id?: string): Promise<Course> => {
    const endpoint = id ? `/courses/save-draft/${id}` : "/courses/save-draft";
    const method = id ? "patch" : "post";
    const response = await api[method](endpoint, courseData);
    return response.data.course;
  },

  /**
   * Publish a course (create new or update existing)
   */
  publishCourse: async (courseData: FormData, id?: string): Promise<Course> => {
    const endpoint = id ? `/courses/publish/${id}` : "/courses/publish";
    const method = id ? "patch" : "post";
    const response = await api[method](endpoint, courseData);
    return response.data.course;
  },

  /**
   * Unpublish a course (change to draft)
   */
  unpublishCourse: async (id: string): Promise<Course> => {
    const response = await api.patch(`/courses/unpublish/${id}`);
    return response.data.course;
  },

  /**
   * Delete a course permanently
   */
  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },

  /**
   * Get all courses created by the tutor
   */
  getTutorCourses: async (
    status?: "draft" | "published",
  ): Promise<Course[]> => {
    const response = await api.get("/courses/tutor-courses", {
      params: status ? { status } : undefined,
    });
    return response.data.courses;
  },

  /**
   * Get a single course by ID
   */
  getCourseById: async (id: string): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data.course;
  },

  /**
   * Get all published courses (public endpoint)
   */
  getPublishedCourses: async (
    filters?: CourseFilters,
  ): Promise<PaginatedResponse<Course>> => {
    const response = await api.get("/courses/public", {
      params: filters,
    });
    return response.data;
  },

  /**
   * Search published courses
   */
  searchCourses: async (
    query: string,
    filters?: Omit<CourseFilters, "search">,
  ): Promise<PaginatedResponse<Course>> => {
    const response = await api.get("/courses/public", {
      params: { search: query, ...filters },
    });
    return response.data;
  },
};
