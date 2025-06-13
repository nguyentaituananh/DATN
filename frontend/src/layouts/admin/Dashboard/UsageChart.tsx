
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { subject: "AI Train", Mobile: 50, Desktop: 120 },
  { subject: "Tracking", Mobile: 98, Desktop: 130 },
  { subject: "Interval", Mobile: 86, Desktop: 115 },
  { subject: "Builder", Mobile: 99, Desktop: 100 },
  { subject: "Schedule", Mobile: 85, Desktop: 90 },
];

const UsageChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Usage Stats</h2>
      <p className="text-sm text-gray-500 mb-4">
        Comparison between Mobile and Desktop usage
      </p>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Radar
              name="Mobile"
              dataKey="Mobile"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.5}
            />
            <Radar
              name="Desktop"
              dataKey="Desktop"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.5}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
