

interface DashboardCardProps {
  title: string;
  value: string;
  change?: string;
  changeColor?: 'green' | 'red';
}

export const DashboardCard = ({ title, value, change, changeColor = 'green' }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-1 w-full">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {change && (
        <p className={`text-sm ${changeColor === 'green' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      )}
    </div>
  );
};
