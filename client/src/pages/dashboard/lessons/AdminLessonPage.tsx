import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import LessonsPagination from "@/components/lessons/LessonsPagination";
import LessonsTable from "@/components/lessons/LessonsTable";
import { Link } from "react-router-dom";
const AdminLessonsPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <BackButton link="/dashboard" text="Back to Dashboard" />
        <Link to="/dashboard/lessons/add" className="mr-2 inline-block">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
            Add new lesson
          </Button>
        </Link>
      </div>
      <LessonsTable />
      <LessonsPagination />
    </>
  );
};

export default AdminLessonsPage;