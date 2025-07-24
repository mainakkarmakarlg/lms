import { Outlet } from "react-router-dom";

const QuizLayout = () => {
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-none  bg-transparent">
      <Outlet />
    </div>
  );
};

export default QuizLayout;
