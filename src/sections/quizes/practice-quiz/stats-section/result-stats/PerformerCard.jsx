import Avatar from "../../../../components/Avatar";
import { FiAward } from "react-icons/fi";

const PerformerCard = ({ fname, lname, rank, desc }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap h-fit md:h-[150px] justify-between items-center p-4 border rounded-xl w-full space-x--4">
      {/* Avatar Section */}
      <div className="w-full sm:w-[30%] flex items-center justify-center">
        <Avatar fName={fname} lName={lname} />
      </div>

      {/* Info Section */}
      <div className="flex w-full sm:w-[70%] h-full flex-col items-center sm:items-start justify-center space-y-2 text-custom-black text-center sm:text-left">
        <p className="text-lg font-semibold">
          {fname} {lname}
        </p>

        {/* Rank Badge */}
        <div className="w-[80px] bg-[#f0faff] rounded-xl flex items-center justify-center py-1">
          <FiAward className="text-primary" />
          <p className="text-primary ml-1">{rank}</p>
        </div>

        <p className="text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default PerformerCard;
