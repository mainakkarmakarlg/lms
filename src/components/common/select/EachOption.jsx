import { twMerge } from "tailwind-merge";

const EachOption = ({ name, value, isSelected, onChange, className }) => {
  const changeVal = () => {
    onChange({ name, value });
  };
  return (
    <div
      onClick={changeVal}
      className={twMerge(
        "w-full mt-1 cursor-pointer py-1 px-2 rounded-md flex items-start space-x-2 text-sm",
        isSelected
          ? "bg-gray-300 hover:bg-gray-300"
          : "bg-white hover:bg-gray-200",
        className
      )}
    >
      <span>{name}</span>
    </div>
  );
};

export default EachOption;
