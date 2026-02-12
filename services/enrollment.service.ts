import api from "./api";

export interface Enrollment {
  _id: string;
  student: string;
  course: string;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  transactionId?: string;
  enrolledAt: string;
}

export const enrollmentService = {
  /**
   * Initiate enrollment (create pending record)
   */
  initiateEnrollment: async (courseId: string): Promise<Enrollment> => {
    const response = await api.post("/enrollments/initiate", { courseId });
    return response.data.enrollment;
  },

  /**
   * Verify payment and finalize enrollment
   */
  verifyPayment: async (
    enrollmentId: string,
    transactionId: string,
    status: "success" | "failed",
  ): Promise<Enrollment> => {
    const response = await api.post("/enrollments/verify", {
      enrollmentId,
      transactionId,
      status,
    });
    return response.data.enrollment;
  },

  /**
   * Check if student is already enrolled
   */
  checkEnrollment: async (courseId: string): Promise<boolean> => {
    const response = await api.get(`/enrollments/check/${courseId}`);
    return response.data.isEnrolled;
  },
};
