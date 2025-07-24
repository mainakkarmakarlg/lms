import { twMerge } from "tailwind-merge";

const Lists = ({ children, className }) => {
  return (
    <ul className={twMerge("list-none flex flex-col  space-y-1", className)}>
      {children}
    </ul>
  );
};

export default Lists;
