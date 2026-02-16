import CourseDetailsClient from "./_components/course-details-client";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseDetailsPage = () => {
  return <CourseDetailsClient />;
};

export default CourseDetailsPage;
