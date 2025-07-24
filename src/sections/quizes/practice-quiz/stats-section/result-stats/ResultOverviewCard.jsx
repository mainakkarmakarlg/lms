import Tooltip from "../../../../../components/common/Tooltip";
import { TbInfoCircle } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { useResponsive } from "../../../../../hooks/useResponsive";

const ResultOverviewCard = ({ title, desc, question }) => {
  const { isMobile } = useResponsive();
  return (
    <div className="h-[120px] w-full p-4 flex items-center justify-between bg-white shadow-card rounded-[20px]">
      {/* Left Section */}
      <div className="flex flex-col space-y-1 ">
        <div className="flex items-center space-x-1">
          <h3 className=" text-sm font-semibold lg:text-lg lg:font-bold text-custom-black">
            {title}
          </h3>

          <Tooltip
            description={desc}
            position={isMobile ? "top" : "right"}
            classNames="bg-black text-white"
          >
            <TbInfoCircle className="text-custom-black cursor-pointer" />
          </Tooltip>
        </div>
        <p className="text-2xl font-semibold text-custom-black">{question}</p>
        {/* <div
          className={`${ratio?.startsWith("-") ? "bg-[#FEF2F2] text-red-900" : "bg-[#ECFDF5] text-green-900"} px-2 py-1 text-center rounded-md text-sm flex items-center justify-center w-[80px]`}
        >
          <IoCaretUpSharp
            className={`${ratio?.startsWith("-") ? "text-red-700 rotate-180" : "text-green-900"} `}
          />
          <p className="pl-1">{ratio?.slice(1)}</p>
        </div> */}
      </div>

      {/* Right Section - Icon / Graph */}
      <div className=" h-fill flex justify-end">
        <IoIosStats size={40} className="text-primary" />
      </div>
    </div>
  );
};

export default ResultOverviewCard;
