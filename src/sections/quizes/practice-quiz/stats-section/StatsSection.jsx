import OverView from "./OverView";
// import Statistics from "./Statistics";

export default function StatsSection() {
  return (
    // <div className="w-full flex flex-col justify-center space-y-6 ">

    <div className="w-full flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0  items-stretch">
      {/* Left Component (Overview) */}
      <div className="w-full lg:w-[43%] flex flex-col">
        <OverView />
      </div>

      {/* Right Component (Statistics) */}
      <div className="w-full lg:w-[55%] flex flex-col bg-white shadow-subject rounded-md py-6 px-4 sm:px-6 lg:px-8">
        {/* <Statistics /> */}
        <div className="h-full w-full flex flex-col items-center justify-center space-y-6 bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 rounded-lg">
          {/* Header Section */}
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
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md">
              We’re working on bringing more analysis to you. Check back soon
              for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
