import { Cell, Pie, PieChart } from "recharts";

const CompletionRateCard = ({ title, percentage, result }) => {
  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];
  const COLORS = ["#3498db", "#E0E0E0"]; // Blue and light gray

  return (
    <div className="flex  justify-between items-center p-4 border rounded-xl w-full h-fit">
      {/* Left Section */}
      <div className="w-full flex flex-col items-start ">
        <h3 className=" text-sm font-semibold lg:text-base lg:font-bold text-custom-black whitespace-nowrap">
          {title}
        </h3>
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-semibold text-custom-black">
            {percentage}%
          </p>
          <p className="text-xs text-gray-500">{result}</p>
        </div>
      </div>
      <div className="h-full w-full flex items-center justify-end">
        <div className="w-12 h-12">
          <PieChart width={48} height={48}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={15}
              outerRadius={24}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default CompletionRateCard;
