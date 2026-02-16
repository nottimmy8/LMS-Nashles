import CourseDetailsClient from "./_components/course-details-client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseDetailsPage = () => {
  return <CourseDetailsClient />;
};

export default CourseDetailsPage;
