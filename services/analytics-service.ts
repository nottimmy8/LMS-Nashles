import api from "./api";

// Tutor Analytics
export const getTutorAnalytics = async () => {
  const response = await api.get("/analytics/tutor");
  return response.data;
};

// Certificates
export const getMyCertificates = async () => {
  const response = await api.get("/analytics/certificates");
  return response.data;
};

// Popular Categories
export const getPopularCategories = async () => {
  const response = await api.get("/analytics/popular-categories");
  return response.data;
};

// Earnings Chart Data
export const getEarningsChartData = async (year?: number) => {
  const response = await api.get("/analytics/earnings-chart", {
    params: { year },
  });
  return response.data;
};
