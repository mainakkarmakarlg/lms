import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const Loader = ({ fullHeight, loadingTexts = [] }) => {
  // Normalize the input: convert object values to array if needed
  const textArray = useMemo(() => {
    if (Array.isArray(loadingTexts)) return loadingTexts;
    if (typeof loadingTexts === "object" && loadingTexts !== null) {
      return Object.values(loadingTexts).filter(
        (val) => typeof val === "string"
      );
    }
    return [];
  }, [loadingTexts]);

  // Pick a random loading text
  const randomText = useMemo(() => {
    if (textArray.length === 0) return "Loading...";
    const index = Math.floor(Math.random() * textArray.length);
    return textArray[index];
  }, [textArray]);

  return (
    <div
      className={twMerge(
        fullHeight ? "h-full" : "h-fit",
        "w-full flex items-center justify-center"
      )}
    >
      <div className="flex flex-col h-fit w-fit items-center justify-center">
        <img
          className="h-[80px] w-[80px] object-contain"
          src="/loader.gif"
          alt="loader"
        />
        <div className="-mt-3 ml-2 text-lg font-medium dark:text-white text-gray-700 text-center">
          {randomText}
        </div>
      </div>
    </div>
  );
};

export default Loader;
