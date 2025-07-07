import { Table } from "antd";

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
import React, { useEffect, useState } from "react";
import {  Tag, Spin, message, Button, Modal, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types";

const { Option } = Select;

const UserList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/users");
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
    await axios.delete(`http://localhost:3001/users/${id}`);
    message.success("Xoá thành công");
    fetchUsers();
  } catch (error) {
    message.error("Xoá thất bại");
  }
};

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:3001/users/${editingUser?.id}`, values);
      message.success("Cập nhật thành công");
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("Cập nhật thất bại");
    }
  };

  const columns: ColumnsType<User> = [
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
          <Button type="primary" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          📋 Danh sách người dùng
        </h2>
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

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> 
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



