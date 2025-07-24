import { twMerge } from "tailwind-merge";

const Switch = ({ id, value, onClick, disabled = false }) => {
  return (
    <div
      id={id}
      className={twMerge(
        "w-10 h-5 flex items-center rounded-full transition-all",
        value ? "bg-primary" : "bg-gray-300",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "opacity-100 cursor-pointer"
      )}
      onClick={disabled ? null : onClick}
    >
      <div
        className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-all ${
          value ? "translate-x-[23px]" : "translate-x-[2px]"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
