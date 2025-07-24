import StatIcon from "../../../../components/StatIcon";

const EachStat = ({
  title,
  heading,
  discription,
  size,
  fontSize,
  icon,
  className,
}) => {
  return (
    <div className="w-full h-[130px] md:h-[150px] p-2 md:p-4 rounded-lg bg-white shadow flex flex-col justify-between">
      <div className="w-full flex items-center justify-between">
        {title && (
          <h4 className="text-heading text-base sm:text-lg md:text-xl font-semibold">
            {title}
          </h4>
        )}
        <StatIcon
          icon={icon}
          size={size}
          fontSize={fontSize}
          className={className}
        />
      </div>
      <div className="w-full flex flex-col">
        <h3 className="text-xl md:text-3xl font-bold text-heading">
          {heading}
        </h3>
        <span className="text-xs md:text-sm text-gray-500">{discription}</span>
      </div>
    </div>
  );
};

export default EachStat;
