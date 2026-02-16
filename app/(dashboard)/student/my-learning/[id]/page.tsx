import MyLearningClient from "./_components/my-learning-client";

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseWatchPage = () => {
  return <MyLearningClient />;
};

export default CourseWatchPage;
