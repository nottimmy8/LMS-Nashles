export interface User {
  id: string;
  email: string;
  role: "admin" | "student" | "tutor";
}
export interface LoginPayload {
  user: User;
  accessToken: string;
}
