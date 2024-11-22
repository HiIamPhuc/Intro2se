import LessonsPagination from "@/components/lessons/LessonsPagination";
import LessonCard from "@/components/lessons/LessonCard";

const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <LessonCard
        title="em la domdom, em yeu anh jack j97"
        body="Negav comeback nhe"
        difficulty={["Phap Kieu", "HurryKNG", "HIEUTHUHAI"]}
        category={["MasterD", "Hung Huynh", "Quan A.P"]}
      />
      <LessonsPagination></LessonsPagination>
    </div>
  );
};

export default HomePage;
