
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", visitors: 6000, pageViews: 4500 },
  { month: "Feb", visitors: 3200, pageViews: 1800 },
  { month: "Mar", visitors: 2400, pageViews: 8000 },
  { month: "Apr", visitors: 2900, pageViews: 4500 },
  { month: "May", visitors: 4200, pageViews: 7000 },
  { month: "Jun", visitors: 3600, pageViews: 4700 },
  { month: "Jul", visitors: 4000, pageViews: 5700 },
];

export const ActivityChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        Website Traffic
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Website visitors and page views over time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
            cursor={{ stroke: "#a78bfa", strokeWidth: 1 }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 5, fill: "white", stroke: "#6366f1", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 5, fill: "white", stroke: "#10b981", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
