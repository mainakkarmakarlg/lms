const TopPerformers = () => {
  // const [statsTimeLine, setStatsTimeLine] = useState("");

  // const performerData = [
  //   {
  //     fname: "Tanaya",
  //     lname: "Sharma",
  //     rank: "1st",
  //     desc: "Among top 4% candidate",
  //   },
  //   {
  //     fname: "Bipod",
  //     lname: "Ghosh",
  //     rank: "1st",
  //     desc: "Among top 4% candidate",
  //   },
  //   {
  //     fname: "Roahan",
  //     lname: "Banerjee",
  //     rank: "1st",
  //     desc: "Among top 4% candidate",
  //   },
  //   {
  //     fname: "Tanaya",
  //     lname: "Sharma",
  //     rank: "1st",
  //     desc: "Among top 4% candidate",
  //   },
  // ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-6 bg-gray-100 p-4">
      {/* Header Section */}
      <h3 className="text-xl md:text-3xl font-bold text-gray-800">
        Top Performers
      </h3>

      {/* Coming Soon Section */}
      <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 animate-pulse">
            Coming Soon
          </p>
          <div className="absolute -top-2 -right-4 text-base sm:text-lg text-red-500 font-semibold rotate-12">
            Stay Tuned!
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md px-4">
          We’re working on bringing more analysis to you. Check back soon for
          updates!
        </p>
      </div>
    </div>

    // <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
    //   {/* Header & Filter Section */}
    //   <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
    //     <h3 className="text-2xl font-semibold text-custom-black">
    //       Top Performers
    //     </h3>
    //     {/* <TimeFilter
    //       statsTimeLine={statsTimeLine}
    //       setStatsTimeLine={setStatsTimeLine}
    //     /> */}
    //   </div>

    //   {/* Performer List */}
    //   <div className="grid grid-cols-1 md:grid-cols-2  w-full">
    //     {performerData?.map((item, index) => {
    //       return (
    //         <PerformerCard
    //           key={index}
    //           fname={item?.fname}
    //           lname={item?.lname}
    //           rank={item?.rank}
    //           desc={item?.desc}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default TopPerformers;
