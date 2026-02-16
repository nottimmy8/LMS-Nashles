import MyLearningClient from "./_components/my-learning-client";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ id: "1" }];
}

const CourseWatchPage = () => {
  return <MyLearningClient />;
};

export default CourseWatchPage;
