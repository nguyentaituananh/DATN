
import { DashboardCard } from '../../layouts/admin/Dashboard/DashboardCard';
import { ActivityChart } from '../../layouts/admin/Dashboard/ActivityChart';
import { RecentTransactions } from '../../layouts/admin/Dashboard/RecentTransactions';
import UsageChart from '../../layouts/admin/Dashboard/UsageChart';

export const DashboardPage = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Gross Revenue" value="$120,054.24" change="+2.25%" changeColor="green" />
        <DashboardCard title="Avg Order" value="$27.97" change="-1.01%" changeColor="red" />
        <DashboardCard title="Trailing Year" value="$278,054.24" change="+60.75%" changeColor="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActivityChart />
        <UsageChart />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
};
