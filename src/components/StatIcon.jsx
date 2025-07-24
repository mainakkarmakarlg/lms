import { twMerge } from "tailwind-merge";

/**
 * A component for displaying a stat icon.
 *
 * @param {{ icon: React.ReactNode, rounded?: boolean, size?: "small" | "base" | "medium" | "large"  , fontSize?: "small" | "base" | "medium" | "large" , className?: string}} props
 * @returns {JSX.Element} The rendered stat icon.
 */
const StatIcon = ({ icon, rounded, size, fontSize, className }) => {
  const sizes = {
    small: "w-4 h-4 md:w-6 md:h-6",
    base: " w-6 h-6 md:w-8 md:h-8",
    medium: "w-8 h-8 md:w-10 md:h-10",
    large: "w-10 h-10 md:w-12 md:h-12",
  };

  const fontSizes = {
    small: "text-base",
    base: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  };

  return (
    <div
      className={twMerge(
        "p-2 flex items-center justify-center bg-purple-500/10 text-purple-500",
        rounded ? "rounded-full" : "rounded-lg",
        sizes[size],
        className
      )}
    >
      <div className={twMerge(fontSizes[fontSize])}>{icon}</div>
    </div>
  );
};

export default StatIcon;
