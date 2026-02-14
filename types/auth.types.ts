export interface User {
  id: string;
  email: string;
  role: "admin" | "student" | "tutor";
  name?: string;
  bio?: string;
  headline?: string;
}
export interface LoginPayload {
  user: User;
  accessToken: string;
}
