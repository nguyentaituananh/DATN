import { useState } from 'react';
import { RecentUsers } from './RecentUsers';
import { UserActivityChart } from './UserActivityChart';
import { UserCard } from './UserCard';
import { UserRegionChart } from './UserRegionChart';

export const User = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý thêm người dùng ở đây (gửi API, cập nhật danh sách, v.v.)
    console.log('Thêm người dùng:', newUsername, newPassword);
    // Reset form
    setNewUsername('');
    setNewPassword('');
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Form thêm người dùng */}
      <div className="bg-white p-4 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Thêm người dùng mới</h2>
        <form onSubmit={handleAddUser} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tên tài khoản"
            className="border p-2 rounded"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Thêm người dùng
          </button>
        </form>
      </div>

      {/* Thống kê người dùng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UserCard title="Tổng số người dùng" value="12,345" change="+4.2%" changeColor="green" />
        <UserCard title="Đang hoạt động hôm nay" value="3,210" change="+1.8%" changeColor="green" />
        <UserCard title="Đăng ký mới" value="145" change="-0.5%" changeColor="red" />
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserActivityChart />
        <UserRegionChart />
      </div>

      {/* Danh sách người dùng gần đây */}
      <RecentUsers />
    </div>
  );
};
