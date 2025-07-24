"use client"; // If using Next.js App Router

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", total: 60, income: 50, expenses: 55 },
  { name: "Feb", total: 70, income: 65, expenses: 60 },
  { name: "Mar", total: 40, income: 45, expenses: 60 },
  { name: "Apr", total: 90, income: 85, expenses: 70 },
  { name: "May", total: 150, income: 95, expenses: 80 },
];

const Statistics = () => {
  return (
    <div className="w-full h-full min-h-[250px] flex flex-col bg-white rounded-md shadow-subject space-y-3 p-3 sm:p-4">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-custom-black">
        Statistics
      </h2>

      {/* Responsive container for different screen sizes */}
      <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] border border-gray-300 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="15%" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis width={30} tickMargin={5} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#2F80ED" name="Total Profits" />
            <Bar dataKey="income" fill="#56CCF2" name="Income" />
            <Bar dataKey="expenses" fill="#BBDEFB" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
