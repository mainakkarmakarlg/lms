import { LuLoader } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

const Button = ({
  type = "button",
  variant = "contained", // default variant
  size = "medium", // default size
  onClick,
  color = "primary", // default color
  id,
  name,
  startIcon,
  endIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  children,
  rounded = false,
  responsiveIcon = false,
}) => {
  // Dynamic class generator for colors and variants
  const colorClasses = {
    primary: {
      contained: "bg-primary text-white hover:bg-primary-hover border-primary",
      outlined:
        "border bg-transparent border-primary text-primary hover:bg-primary hover:text-white",
      disabled: "bg-primary text-white opacity-50", // Disabled state for primary
    },
    secondary: {
      contained:
        "bg-secondary text-white hover:bg-secondary-hover border-secondary border",
      outlined:
        "border bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-white",
      disabled: "bg-secondary text-white opacity-50", // Disabled state for secondary
    },
    success: {
      contained:
        "bg-success text-white hover:bg-success-hover border-success border",
      outlined:
        "border bg-transparent border-success text-success hover:bg-success",
      disabled: "bg-success text-white opacity-50", // Disabled state for success
    },
    warning: {
      contained:
        "bg-warning text-white hover:bg-warning-hover border-warning border",
      outlined:
        "border bg-transparent border-warning text-warning hover:bg-warning hover:text-white",
      disabled: "bg-warning text-white opacity-50", // Disabled state for warning
    },
    danger: {
      contained: "bg-danger text-white hover:bg-danger/80 border-danger border",
      outlined:
        "border bg-transparent border-danger text-danger hover:bg-danger hover:text-white",
      disabled: "bg-danger text-white opacity-50", // Disabled state for danger
    },
    neutral: {
      contained:
        "bg-neutral text-slate-700 hover:bg-neutral/80 border-neutral border",
      outlined:
        "border bg-transparent border-neutral text-slate-700 hover:bg-neutral hover:text-slate-700",
      disabled: "bg-neutral text-slate-700 opacity-50", // Disabled state for neutral
    },

    highlight: {
      contained:
        "bg-highlight text-white hover:bg-highlight/80 border-highlight border",
      outlined:
        "border bg-transparent border-highlight text-highlight hover:bg-highlight hover:text-white",
      disabled: "bg-highlight text-white opacity-50", // Disabled state for highlight
    },
  };

  const sizeClasses = {
    small: ` ${children ? "py-1 px-3" : "py-2 px-4"} text-sm`,
    base: `${children ? "px-3 py-[6px]" : "py-2 px-4"} text-base`,
    medium: `${children ? "px-4 py-2" : "py-3 px-5"}  text-base`,
    large: `${children ? "px-5 py-3" : " py-4 px-6"} text-lg`,
  };

  return (
    <button
      type={type}
      id={id}
      name={name}
      onClick={!disabled && !loading ? onClick : null} // Disable click if loading or disabled
      disabled={disabled}
      className={twMerge(
        "relative flex items-center justify-center space-x-2 transition-all duration-300 rounded-md select-none outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
        !disabled && !loading && "cursor-pointer", // Enable pointer only when not disabled or loading
        fullWidth ? "w-full" : "w-fit",
        rounded && "rounded-full",
        sizeClasses[size],
        disabled
          ? colorClasses[color]?.disabled // Use disabled color if button is disabled
          : colorClasses[color]?.[variant], // Use normal color otherwise
        className
      )}
    >
      {/* Start Icon */}
      {startIcon && (
        <span
          className={twMerge(
            loading ? "invisible" : "visible",
            responsiveIcon ? "hidden md:block" : "block"
          )}
        >
          {startIcon}
        </span>
      )}

      {/* Button Content */}

      {children && (
        <div className={twMerge(loading ? "invisible" : "visible")}>
          {children}
        </div>
      )}

      {/* End Icon */}
      {endIcon && (
        <span
          className={twMerge(
            loading ? "invisible" : "visible",
            responsiveIcon ? "hidden md:block" : "block"
          )}
        >
          {endIcon}
        </span>
      )}

      {/* Loader */}
      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center bg-transparent">
          <LuLoader className="text-xl animate-spin text-white" />
        </div>
      )}
    </button>
  );
};

export default Button;
