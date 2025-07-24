import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ResultStatistics = ({ data }) => {
  return (
    <div className="w-full h-[400px] md:px-6 py-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="attemptCount"
            tick={{ fill: "#A0AEC0", fontSize: 14, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 20, right: 20 }}
            tickMargin={10}
          />

          <YAxis
            tick={{ fill: "#A0AEC0", fontSize: 14, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            domain={[0, (dataMax) => Math.ceil(dataMax * 1.2)]}
          />

          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend iconType="square" wrapperStyle={{ paddingTop: 10 }} />

          <Line
            type="monotone"
            dataKey="totalQuestions"
            stroke="#1E40AF"
            strokeWidth={2}
            dot={false}
            name="Total Questions"
          />
          <Line
            type="monotone"
            dataKey="attemptCount"
            stroke="#4CB1E1"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 4"
            name="Attempt Count"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultStatistics;
