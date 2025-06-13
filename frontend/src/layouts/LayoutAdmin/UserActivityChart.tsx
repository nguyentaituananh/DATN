import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', users: 300 },
  { day: 'Tue', users: 450 },
  { day: 'Wed', users: 400 },
  { day: 'Thu', users: 480 },
  { day: 'Fri', users: 530 },
  { day: 'Sat', users: 490 },
  { day: 'Sun', users: 520 },
];

export const UserActivityChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">User Activity (Weekly)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
