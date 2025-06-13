const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', joined: '2025-06-01' },
  { name: 'Bob Smith', email: 'bob@example.com', joined: '2025-06-02' },
  { name: 'Carol Lee', email: 'carol@example.com', joined: '2025-06-03' },
];

export const RecentUsers = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
      <ul className="divide-y divide-gray-200">
        {users.map((user, index) => (
          <li key={index} className="py-2">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            <div className="text-xs text-gray-400">Joined: {user.joined}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
