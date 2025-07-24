import { twMerge } from "tailwind-merge";

const ListItem = ({
  id,
  selected,
  children,
  type,
  className,
  startIcon,
  endIcon,
  onClick,
}) => {
  return (
    <>
      {type === "simple" ? (
        <li
          onClick={onClick}
          id={id}
          className={twMerge(
            "py-1 px-2 whitespace-nowrap rounded-md flex items-center w-full cursor-pointer hover:bg-gray-200 duration-300",
            selected ? "bg-gray-200" : "",
            className
          )}
        >
          <div className="w-full flex items-center space-x-3">
            <span className="mr-1">{startIcon && startIcon}</span>
            {children}
            <span className="ml-1">{endIcon && endIcon}</span>
          </div>
        </li>
      ) : (
        <li
          onClick={onClick}
          className={twMerge(
            "py-1 px-2 rounded-md flex items-center justify-between",
            selected ? "bg-gray-200" : "",
            className
          )}
        >
          {children}
        </li>
      )}
    </>
  );
};

export default ListItem;
