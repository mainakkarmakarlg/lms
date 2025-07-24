import QuestionTypeFilters from "./filters/QuestionTypeFilters";
import Search from "./filters/Search";
import SubjectFilters from "./filters/SubjectFilters";

const Filters = () => {
  return (
    <div className="w-full xl:flex-row flex-col flex items-center xl:justify-between xl:space-x-5 space-y-3 xl:space-y-0 h-[90px] xl:h-[60px] mt-3 px-1">
      <div className="w-full xl:w-1/2  flex items-center justify-start">
        <Search />
      </div>

      <div className="w-full xl:w-1/2 flex items-center lg:space-x-4 space-x-2">
        <SubjectFilters />
        <QuestionTypeFilters />
      </div>
    </div>
  );
};

export default Filters;
