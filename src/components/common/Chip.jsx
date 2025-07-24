const Chip = ({ onClick, children, disabled, checked, style }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`outline-none border-2 h-[30px] md:px-4 px-3 flex items-center justify-center text-base rounded-full
        ${
          disabled
            ? "cursor-not-allowed border-gray-300 text-gray-300 opacity-70 dark:opacity-30"
            : "cursor-pointer border-primary text-primary"
        }
        ${
          checked
            ? "bg-primary text-white"
            : disabled
              ? "text-gray-300"
              : "text-primary"
        }
      `}
    >
      <span className="md:text-base text-sm">{children}</span>
    </button>
  );
};

export default Chip;
