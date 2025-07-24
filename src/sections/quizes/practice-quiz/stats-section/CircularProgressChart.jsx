import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import tickPng from "/practise-quiz/tick.png";
import Tooltip from "../../../../components/common/Tooltip";

export default function CircularProgressChart({
  length,
  atempted,
  width = 150,
  height = 150,
  textClassName = "",
}) {
  // console.log(length, atempted);
  // Calculate progress percentage
  const progressPercentage = length > 0 ? (atempted / length) * 100 : 0;
  const percentage = Math.round(progressPercentage);

  // Chart data
  const data = [
    { name: "Progress", value: progressPercentage, fill: "#6DBD99" },
  ];

  return (
    <Tooltip
      description={`Your accuracy`}
      position="top"
      classNames="text-xs bg-black text-white text-center "
    >
      <div className="flex flex-col items-center relative">
        <RadialBarChart
          width={width}
          height={height}
          innerRadius="80%"
          outerRadius="100%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          {/* Ensure values are scaled between 0 and 100 */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          {/* Background and progress bar */}
          <RadialBar dataKey="value" background={{ fill: "#E5E7EB" }} />
        </RadialBarChart>

        {/* Centered Text */}
        {percentage <= 100 ? (
          <p
            className={`${textClassName ? textClassName : "text-3xl text-gray-500 font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"} `}
          >
            {percentage ? percentage : 0}%
          </p>
        ) : (
          <img
            src={tickPng}
            alt="tick"
            className="w-[10px] h-[10px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </Tooltip>
  );
}
