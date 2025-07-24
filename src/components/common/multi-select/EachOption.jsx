import { twMerge } from "tailwind-merge";

const EachOption = ({ name, value, isSelected, onChange, className }) => {
  const changeVal = () => {
    onChange({ name, value });
  };
  return (
    <div
      onClick={changeVal}
      className={twMerge(
        "w-full mt-1 cursor-pointer py-1 px-2 rounded-md flex items-start space-x-2",
        className
      )}
    >
      <input
        type="checkbox"
        className="mt-[3px]"
        readOnly
        checked={isSelected}
      />
      <span className="text-sm">{name}</span>
    </div>
  );
};

export default EachOption;
