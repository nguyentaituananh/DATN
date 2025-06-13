interface UserCardProps {
  title: string;
  value: string;
  change: string;
  changeColor: 'green' | 'red';
}

export const UserCard = ({ title, value, change, changeColor }: UserCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`text-sm font-medium mt-1 text-${changeColor}-600`}>{change}</div>
    </div>
  );
};
