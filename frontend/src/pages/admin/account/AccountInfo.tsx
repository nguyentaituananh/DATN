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
  Form,
  Input,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";

const { Option } = Select;

interface Account {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
}

const API_URL = "http://localhost:5000/users";

const AccountInfo: React.FC = () => {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Account | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
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
      await axios.delete(`${API_URL}/${id}`);
      message.success("Xoá thành công");
      fetchUsers();
    } catch (error) {
      message.error("Xoá thất bại");
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (user: Account) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, {
          ...editingUser,
          ...values,
        });
        message.success("Cập nhật tài khoản thành công");
      } else {
        await axios.post(API_URL, {
          ...values,
          createdAt: new Date().toISOString(),
        });
        message.success("Thêm tài khoản thành công");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      message.error("Thao tác thất bại");
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
      render: (text) => (
        <span className="text-blue-600 font-medium">{text}</span>
      ),
    },
    {
      title: "🔑 Mật khẩu", // ✅ thêm cột này
      dataIndex: "password",
      align: "center",
      render: (text) => (
        <span className="text-gray-600 font-mono">{text || "••••••••"}</span>
      ),
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
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📋 Danh sách người dùng</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
            Thêm tài khoản
          </Button>
        </div>

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
        title={editingUser ? "📝 Sửa tài khoản" : "➕ Thêm tài khoản"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ role: "User" }}
        >
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
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: "Chọn vai trò" }]}
          >
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

export default AccountInfo;

