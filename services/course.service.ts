import api from "./api";

export const courseService = {
  saveDraft: async (courseData: FormData, id?: string) => {
    const endpoint = id ? `/courses/save-draft/${id}` : "/courses/save-draft";
    const method = id ? "patch" : "post";
    const response = await api[method](endpoint, courseData);
    return response.data.course;
  },

  publishCourse: async (courseData: FormData, id?: string) => {
    const endpoint = id ? `/courses/publish/${id}` : "/courses/publish";
    const method = id ? "patch" : "post";
    const response = await api[method](endpoint, courseData);
    return response.data.course;
  },

  getTutorCourses: async (status?: string) => {
    const response = await api.get("/courses/tutor-courses", {
      params: { status },
    });
    return response.data.courses;
  },

  getCourseById: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data.course;
  },
};
