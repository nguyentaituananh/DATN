// import { Descriptions } from "antd";

// const AccountInfo = () => (
//   <Descriptions title="Thông tin tài khoản" bordered>
//     <Descriptions.Item label="Họ tên">Tuấn Anh</Descriptions.Item>
//     <Descriptions.Item label="Email">tuananh@gmail.com</Descriptions.Item>
//     <Descriptions.Item label="Vai trò">Admin</Descriptions.Item>
//     <Descriptions.Item label="Ngày tạo">2024-01-01</Descriptions.Item>
//   </Descriptions>
// );

// export default AccountInfo;

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  message,
  Spin,
  Space,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";

// ✅ Kiểu dữ liệu tài khoản
interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const API_URL = "http://localhost:5000/users"; // json-server

const AccountInfo: React.FC = () => {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data.map((user: any) => ({
        key: user.id,
        ...user,
      }));
      setData(users);
    } catch (err) {
      message.error("Không thể tải danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      message.success("Xoá thành công");
      fetchUsers();
    } catch (error) {
      message.error("Xoá thất bại");
    }
  };

  const columns: ColumnsType<Account> = [
    {
      title: "👤 Họ tên",
      dataIndex: "name",
      align: "center",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "📧 Email",
      dataIndex: "email",
      align: "center",
      render: (text) => <span className="text-blue-600 font-medium">{text}</span>,
    },
    {
      title: "🔐 Vai trò",
      dataIndex: "role",
      align: "center",
      render: (role) => (
        <Tag color={role === "Admin" ? "purple" : "blue"} className="rounded-md">
          {role}
        </Tag>
      ),
    },
    {
      title: "📅 Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "🛠️ Thao tác",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Danh sách người dùng</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="rounded-xl overflow-hidden"
          />
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
