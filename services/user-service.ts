import api from "./api";

// Update Profile
export const updateProfile = async (data: any) => {
  const response = await api.put("/users/profile", data);
  return response.data;
};

// Update Password
export const updatePassword = async (data: any) => {
  const response = await api.put("/users/password", data);
  return response.data;
};

// Get Wishlist
export const getWishlist = async () => {
  const response = await api.get("/users/wishlist");
  return response.data;
};

// Toggle Wishlist
export const toggleWishlist = async (courseId: string) => {
  const response = await api.post("/users/wishlist/toggle", { courseId });
  return response.data;
};
