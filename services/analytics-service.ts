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
