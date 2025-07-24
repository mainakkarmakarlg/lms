import { twMerge } from "tailwind-merge";

const Icon = ({ children, onClick, className, hoverClass, id }) => {
  return (
    <div
      id={id && id}
      onClick={onClick}
      className={twMerge(
        hoverClass ? `p-1 rounded-full  ${hoverClass}` : "",
        "duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Icon;
