import { AuthGuard } from "@/components/auth/auth-guard";
import React from "react";

const StudentPage = () => {
  return (
    <AuthGuard role="student">
      <div>Student dashboard</div>
    </AuthGuard>
  );
};

export default StudentPage;
