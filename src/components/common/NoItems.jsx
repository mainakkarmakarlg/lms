import { twMerge } from "tailwind-merge";

const NoItems = ({
  text = "No questions found",
  image = "/doubt-forum/no-questions-found.png",
  className,
}) => {
  return (
    <div
      className={twMerge(
        "h-full w-full flex items-center justify-center",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <img
          className="h-[200px] w-[200px] object-contain"
          src={image}
          alt="no-questions"
        />
        <div className="-mt-3 ml-2 text-lg dark:text-white text-black">
          {text}
        </div>
      </div>
    </div>
  );
};

export default NoItems;
