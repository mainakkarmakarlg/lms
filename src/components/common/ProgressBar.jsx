const ProgressBar = ({
  percentage = 0,
  filledColor = "#2C6FBB",
  unfilledColor = "#e0e0e0",
  height = "5px",
  startValue,
  endValue,
}) => {
  const containerStyles = {
    width: "100%",
    backgroundColor: unfilledColor,
    borderRadius: "5px",
    height: height,
    overflow: "hidden",
  };

  const fillerStyles = {
    width: `${percentage}%`,
    backgroundColor: filledColor,
    height: "100%",
    transition: "width 0.3s ease-in-out",
  };

  return (
    <>
      <div className="bg-primary2" style={containerStyles}>
        <div className="duration-300" style={fillerStyles}></div>
      </div>

      {(startValue || endValue) && (
        <div className="mt-1">
          <div className="w-full flex items-center justify-between">
            <div className="text-xs font-light text-gray-600">
              {startValue && <span>{startValue}</span>}
            </div>
            <div className="text-xs font-light text-gray-600">
              {endValue && <span>{endValue}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
