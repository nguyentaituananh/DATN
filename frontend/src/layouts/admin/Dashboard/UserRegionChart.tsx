import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'North America', value: 400 },
  { name: 'Europe', value: 300 },
  { name: 'Asia', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#6366F1', '#60A5FA', '#34D399', '#FBBF24'];

export const UserRegionChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">User Distribution by Region</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
