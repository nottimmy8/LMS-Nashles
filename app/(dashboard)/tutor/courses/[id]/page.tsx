import TutorCourseClient from "./_components/tutor-course-client";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseDetailsPage = () => {
  return <TutorCourseClient />;
};

export default CourseDetailsPage;
