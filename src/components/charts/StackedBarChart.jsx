import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { useResponsive } from "../../hooks/useResponsive";

/**
 * Renders a responsive stacked bar and line chart using the provided data.
 *
 * @param {Array} data - Array of objects representing the data.
 * @param {string} k1 - Key for first bar.
 * @param {string} k2 - Key for second bar.
 * @param {string} k3 - Key for third bar.
 * @param {string} lineKey - Key for the line chart.
 * @param {string} k1Color - Color for first bar.
 * @param {string} k2Color - Color for second bar.
 * @param {string} k3Color - Color for third bar.
 * @param {string} lineColor - Color for line chart.
 */

const StackedBarChart = ({
  data,
  k1,
  k2,
  k3,
  lineKey,
  k1Color,
  k2Color,
  k3Color,
  lineColor,
}) => {
  const { isMobile } = useResponsive();
  return (
    <ResponsiveContainer width="100%" minWidth={320} height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: isMobile ? 0 : 20,
          right: isMobile ? 0 : 30,
          left: isMobile ? 0 : 20,
          bottom: isMobile ? 0 : 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          tickFormatter={(subject) =>
            subject.length > 10 ? `${subject.substring(0, 10)}...` : subject
          }
          tick={{ angle: -45, textAnchor: "end", fontSize: 0 }}
          dataKey="name"
          interval={0}
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip
          formatter={(value, name) => (name === "time" ? `${value}s` : value)}
        />
        <Legend margin={{ top: 40 }} wrapperStyle={{ marginTop: 40 }} />
        <Bar
          yAxisId={"left"}
          dataKey={k1}
          stackId="a"
          fill={k1Color}
          barSize={50}
        />
        <Bar
          yAxisId={"left"}
          dataKey={k2}
          stackId="a"
          fill={k2Color}
          barSize={50}
        />
        <Bar
          yAxisId={"left"}
          dataKey={k3}
          stackId="a"
          fill={k3Color}
          barSize={50}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={lineKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;

// import React from "react";
// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Line,
// } from "recharts";

// const data = [
//   { subject: "Math", correct: 20, incorrect: 5, unattempted: 3, timeTaken: 45 },
//   {
//     subject: "Science",
//     correct: 15,
//     incorrect: 10,
//     unattempted: 2,
//     timeTaken: 50,
//   },
//   {
//     subject: "History",
//     correct: 10,
//     incorrect: 8,
//     unattempted: 5,
//     timeTaken: 30,
//   },
//   {
//     subject: "English",
//     correct: 18,
//     incorrect: 6,
//     unattempted: 1,
//     timeTaken: 40,
//   },
//   {
//     subject: "Geography",
//     correct: 12,
//     incorrect: 7,
//     unattempted: 6,
//     timeTaken: 35,
//   },
// ];

// const StackedBarChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <ComposedChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="subject" />
//         <YAxis yAxisId="left" />
//         <YAxis yAxisId="right" orientation="right" />
//         <Tooltip />
//         <Legend />

//         {/* Stacked Bars */}
//         <Bar yAxisId="left" dataKey="correct" stackId="a" fill="#4caf50" />
//         <Bar yAxisId="left" dataKey="incorrect" stackId="a" fill="#f44336" />
//         <Bar yAxisId="left" dataKey="unattempted" stackId="a" fill="#ffc107" />

//         {/* Line Chart for Time Taken */}
//         <Line
//           yAxisId="right"
//           type="monotone"
//           dataKey="timeTaken"
//           stroke="#2196f3"
//           strokeWidth={2}
//           dot={{ r: 4 }}
//         />
//       </ComposedChart>
//     </ResponsiveContainer>
//   );
// };

// export default StackedBarChart;
