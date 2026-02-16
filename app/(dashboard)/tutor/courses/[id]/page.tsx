import TutorCourseClient from "./_components/tutor-course-client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseDetailsPage = () => {
  return <TutorCourseClient />;
};

export default CourseDetailsPage;
