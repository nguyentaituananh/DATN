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
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";

// ✅ Định nghĩa kiểu dữ liệu cho mỗi tài khoản
interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const API_URL = "http://localhost:5000/account"; // json-server

const AccountInfo: React.FC = () => {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccount = async () => {
    try {
      const res = await axios.get(API_URL);
      const accounts = res.data.map((account: Account) => ({
        key: account.id,
        ...account,
      }));
      setData(accounts);
    } catch (err) {
      message.error("Lỗi khi tải tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá tài khoản này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          message.success("Đã xoá tài khoản");
          fetchAccount();
        } catch {
          message.error("Lỗi khi xoá tài khoản");
        }
      },
    });
  };

  const columns: ColumnsType<Account> = [
    {
      title: (
        <span className="flex items-center justify-center gap-1 font-semibold text-purple-700">
          👤 Họ tên
        </span>
      ),
      dataIndex: "name",
      align: "center",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: (
        <span className="flex items-center justify-center gap-1 font-semibold text-blue-600">
          📧 Email
        </span>
      ),
      dataIndex: "email",
      align: "center",
      render: (text: string) => <a className="text-blue-600">{text}</a>,
    },
    {
      title: (
        <span className="flex items-center justify-center gap-1 font-semibold text-yellow-700">
          🔐 Vai trò
        </span>
      ),
      dataIndex: "role",
      align: "center",
      render: (role: string) => (
        <Tag
          color="purple"
          className="rounded-md px-3 py-1"
          style={{ backgroundColor: "#f9f0ff", color: "#722ed1", border: "1px solid #d3adf7" }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: (
        <span className="flex items-center justify-center gap-1 font-semibold text-indigo-700">
          🗓️ Ngày tạo
        </span>
      ),
      dataIndex: "createdAt",
      align: "center",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: (
        <span className="flex items-center justify-center gap-1 font-semibold text-gray-700">
          🛠️ Thao tác
        </span>
      ),
      dataIndex: "action",
      align: "center",
      render: (_: any, record: Account) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
          className="border border-red-500 text-red-500 hover:bg-red-100 rounded-md px-4"
        >
          Xoá
        </Button>
      ),
    },
  ];

  if (loading)
    return <Spin size="large" className="block mx-auto mt-10" />;

  if (data.length === 0)
    return <div className="text-center mt-6 text-gray-600">Không có dữ liệu người dùng.</div>;

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          📋 Danh sách tài khoản
        </h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="rounded-xl overflow-hidden"
        />
      </div>
    </div>
  );
};

export default AccountInfo;

