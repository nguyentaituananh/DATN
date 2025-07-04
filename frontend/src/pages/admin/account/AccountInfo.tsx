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

import { Table, Tag, Card, TableColumnsType } from "antd";
import React from "react";

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: <span className="flex items-center gap-2 text-purple-700 font-semibold">👤 Họ tên</span>,
    dataIndex: "name",
    align: "center",
    render: (text: string) => <span className="font-semibold">{text}</span>,
  },
  {
    title: <span className="flex items-center gap-2 text-blue-700 font-semibold">📧 Email</span>,
    dataIndex: "email",
    align: "center",
    render: (text: string) => (
      <a href={`mailto:${text}`} className="text-blue-600 hover:underline font-medium">
        {text}
      </a>
    ),
  },
  {
    title: <span className="flex items-center gap-2 text-yellow-600 font-semibold">🔒 Vai trò</span>,
    dataIndex: "role",
    align: "center",
    render: (role: string) => (
      <Tag color="purple" className="px-3 py-1 rounded-lg font-medium">
        {role}
      </Tag>
    ),
  },
  {
    title: <span className="flex items-center gap-2 text-cyan-700 font-semibold">📅 Ngày tạo</span>,
    dataIndex: "createdAt",
    align: "center",
  },
];

// ✅ Gán kiểu cho data:
const data: DataType[] = [
  {
    key: "1",
    name: "Tuấn Anh",
    email: "tuananh@gmail.com",
    role: "Admin",
    createdAt: "2024-01-01",
  },
];

const AccountInfo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Card className="max-w-6xl w-full rounded-2xl shadow-md">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="rounded-xl overflow-hidden"
        />
      </Card>
    </div>
  );
};

export default AccountInfo;


