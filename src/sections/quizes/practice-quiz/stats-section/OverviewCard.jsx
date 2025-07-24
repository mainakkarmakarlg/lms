// import CircularProgressChart from "./CircularProgressChart";
// import { FiClock } from "react-icons/fi";
// // import image from "/public/practise-quiz/chartUp.png";
// import chartUptrend from "/practise-quiz/chartUp.svg";
// import OverView from "./OverView";
// import Statistics from "./Statistics";
import { TbInfoCircle } from "react-icons/tb";
import Tooltip from "../../../../components/common/Tooltip";
// import { IoCaretUpSharp } from "react-icons/io5";
import { useResponsive } from "../../../../hooks/useResponsive";

export default function OverviewCard({
  title,
  value,
  image,
  toolTipText,
  bgColor,
}) {
  const { isMobile, isTablet } = useResponsive();
  return (
    <div
      className={`w-full flex items-center px-2 lg:px-6 py-3 space-x-2 justify-between border-b border-gray-200`}
    >
      <div className="w-[80%] flex items-center space-x-2 lg:space-x-4">
        <div
          className={`${bgColor} w-[40px] lg:w-[50px] h-[40px] lg:h-[50px] flex justify-center items-center rounded-xl`}
        >
          <img
            src={image}
            alt="chart"
            className="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px] object-contain"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <div className="flex space-x-2">
            <h3 className="text-xs md:text-sm font-semibold text-custom-gray">
              {title}
            </h3>
            <Tooltip
              description={toolTipText}
              position={isMobile || isTablet ? "top" : "top"}
              classNames={"bg-black text-white "}
            >
              <TbInfoCircle className="text-custom-black cursor-pointer" />
            </Tooltip>
          </div>
          <p className=" text-sm font-semibold lg:text-lg lg:font-bold text-custom-black">
            {value === "NaN%" ? "0" : value}
          </p>
        </div>
      </div>
      {/* <p
        className={`${trendText?.startsWith("-") ? "bg-[#FEF2F2] text-red-900" : "bg-[#ECFDF5] text-green-900"} px-2 py-1 text-center rounded-md text-xs lg:text-sm space-x-2 flex items-center `}
      >
        <IoCaretUpSharp
          className={`${trendText?.startsWith("-") ? "text-red-700 rotate-180" : "text-green-900"}`}
        />
        {trendText?.slice(1)}
      </p> */}
    </div>
  );
}
