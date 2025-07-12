import React, { useEffect, useState } from 'react';
import { Table, Tag, Spin, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getOrdersByUser } from '../../api/orderAPI';
import { useAuth } from '../context/AuthContext';
import { Order } from '../../types';

const MyOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  console.log('🟡 Current user:', user);
  if (!user?._id) return;

  console.log('🔵 Fetching orders for user:', user._id);
  setLoading(true);
  getOrdersByUser(user._id)
    .then(res => {
      console.log('✅ Orders:', res.data.orders);
      setOrders(res.data.orders);
    })
    .catch(err => {
      console.error('❌ Lỗi gọi API đơn hàng:', err);
      message.error('Không thể lấy danh sách đơn hàng');
    })
    .finally(() => setLoading(false));
}, [user]);

  const columns: ColumnsType<Order> = [
    {
      title: 'Mã đơn',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <strong>{text.slice(-6).toUpperCase()}</strong>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (products) =>
        products.map((p: any) => (
          <div key={p.product_id}>
            {p.quantity} x {p.product_id}
          </div>
        )),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (text) => new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'done' ? 'green' : status === 'shipped' ? 'blue' : 'orange';
        const label =
          status === 'pending' ? 'Chờ xử lý' : status === 'shipped' ? 'Đang giao' : 'Hoàn tất';
        return <Tag color={color}>{label}</Tag>;
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Đơn hàng của tôi</h2>
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default MyOrdersPage;
