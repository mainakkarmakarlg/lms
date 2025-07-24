import TimeFilter from "./TimeFilter";

const StatsHeader = ({ statsTimeLine, setStatsTimeLine }) => {
  return (
    <div className="w-full flex justify-end">
      {/* Top Section */}
      {/* <div className="flex items-center justify-between ">
        <h1 className="text-md font-semibold text-custom-black text-3xl">
          Practice Quizes
        </h1>
      </div> */}

      {/* Buttons Section */}
      <div className="flex space-x-4">
        {/* <button className="flex space-x-2 items-center  px-4 py-2 bg-highlight text-white rounded-md">
          <IoMdAdd />
          Create New Quiz
        </button> */}
        <TimeFilter
          statsTimeLine={statsTimeLine}
          setStatsTimeLine={setStatsTimeLine}
        />
      </div>
    </div>
  );
};

export default StatsHeader;
