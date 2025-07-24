import { twMerge } from "tailwind-merge";

/**
 * Renders an avatar component with optional image, initials, and online status.
 *
 * @param {string} fName - First name for generating initials.
 * @param {string} lName - Last name for generating initials.
 * @param {string} image - URL of the avatar image.
 * @param {function} onClick - Click event handler for the avatar.
 * @param {string} className - Additional classes for styling the avatar container.
 * @param {string} textSize - Size of the text for initials ('small', 'base', 'medium', 'large').
 * @param {string} size - Size of the avatar ('small', 'base', 'medium', 'large').
 * @param {boolean} rounded - If true, the avatar will have rounded corners.
 * @param {boolean} isOnline - If true, displays an online status indicator.
 * @returns {JSX.Element} The rendered avatar component.
 */

export default function Avatar({
  fName = "",
  lName = "",
  image = "",
  onClick,
  className,
  textSize = "base",
  size = "base",
  rounded = true,
  backgroundColor = "primary",
  isOnline = false,
}) {
  const sizeClasses = {
    small: "h-[35px] w-[35px] min-h-[35px] min-w-[35px]",
    base: "h-[40px] w-[40px] min-h-[40px] min-w-[40px]",
    medium: "h-[50px] w-[50px] min-h-[50px] min-w-[50px]",
    large: "h-[60px] w-[60px] min-h-[60px] min-w-[60px]",
  };

  const textSizeClasses = {
    small: "text-base",
    base: "text-lg",
    medium: "text-xl",
    large: "text-xl",
  };

  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-center select-none relative",
        rounded ? "rounded-full" : "rounded-md",
        sizeClasses[size],
        className
      )}
    >
      {image ? (
        <img
          src={image}
          alt={`${fName} ${lName}`}
          className={twMerge(
            "min-h-full h-full min-w-full w-full object-contain",
            rounded ? "rounded-full" : "rounded-md"
          )}
        />
      ) : (
        <div
          className={twMerge(
            "h-full w-full p-2 flex items-center justify-center",
            rounded ? "rounded-full" : "rounded-md",
            backgroundColor
              ? `bg-${backgroundColor} text-white`
              : "bg-primary text-white"
          )}
        >
          {fName && lName && (
            <span className={textSizeClasses[textSize]}>
              {fName[0]?.toUpperCase() + lName[0]?.toUpperCase()}
            </span>
          )}
        </div>
      )}
      {isOnline && (
        <div className="h-2 w-2 rounded-full bg-green-500 border border-white absolute bottom-0 right-0"></div>
      )}
    </div>
  );
}
