import { notFound } from "next/navigation";

export default function VerifyPage({
  params,
}: {
  params: { role: "student" | "tutor" };
}) {
  if (!["student", "tutor"].includes(params.role)) {
    notFound();
  }

  return (
    <div>
      <h1>{params.role === "student" ? "verify student" : "verify tutor"}</h1>
    </div>
  );
}
