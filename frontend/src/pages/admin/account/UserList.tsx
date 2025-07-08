// const columns = [
//   { title: "Họ tên", dataIndex: "name" },
//   { title: "Email", dataIndex: "email" },
//   { title: "Vai trò", dataIndex: "role" },
//   { title: "Ngày tạo", dataIndex: "createdAt" },
// ];

// const data = [
//   {
//     key: "1",
//     name: "Tuấn Anh",
//     email: "tuananh@gmail.com",
//     role: "Admin",
//     createdAt: "2024-06-01",
//   },
// ];

// const UserList = () => <Table columns={columns} dataSource={data} />;

// export default UserList;
import React, { useState } from "react";
import { Modal, Table, Tag, Form, Input, Select } from "antd";
import dayjs from "dayjs";

import type { ColumnsType } from "antd/es/table";
const { Option } = Select;

interface UserType {
  key: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const columns: ColumnsType<UserType> = [
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
];

const data = [
  {
    key: "1",
    name: "Tuấn Anh",
    email: "tuananh@gmail.com",
    role: "Admin",
    createdAt: "2024-06-01",
  },
];
const UserList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Dummy handler for update action
  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        // Handle update logic here
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        // Handle validation error
      });
  };

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          📋 Danh sách người dùng
        </h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="rounded-xl overflow-hidden"
        />
      </div>

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
