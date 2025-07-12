// import { Table } from "antd";

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
import {
  Tag,
  Spin,
  message,
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Dropdown,
  Menu
} from "antd";
import dayjs from "dayjs";
import { Mail, Lock } from 'lucide-react';

import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types";
import instanceAxios from "../../../utils/instanceAxios";
import { useAuth } from "../../../context/AuthContext";

const UserList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle hiện mật khẩu
  const { user } = useAuth();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await instanceAxios.get("/auth");
      const users = res.data.map((user) => ({
        ...user,
        id: user._id,
        key: user._id,
        role: user.role === "admin" ? "Admin" : "User",
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
      console.log(user._id !== id);
      
      if (user._id !== id) {
        await instanceAxios.put(`/auth/${id}`, { is_active: false });
        message.success("Xoá thành công");
        fetchUsers();
      }else{
        message.error("Bạn không thể xoá chính mình");
      }
    } catch (error) {
      message.error("Xoá thất bại");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await instanceAxios.put(`/auth/${id}`, { is_active: true });
      message.success("Khôi phục thành công");
      fetchUsers();
    } catch (error) {
      message.error("Khôi phục thất bại");
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setShowPassword(false);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setShowPassword(false);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        const updatedData = {
          ...values,
          ...values,
          role: values.role === "Admin" ? "admin" : "customer",
        };
        if (!values.password) {
          delete updatedData.password;
        }
        await instanceAxios.put(`/auth/${editingUser.id}`, updatedData);
        message.success("Cập nhật thành công");
      } else {
        const userData = {
          ...values,
          role: values.role === "Admin" ? "admin" : "customer",
        };
        await instanceAxios.post(`/auth/register`, userData);
        message.success("Thêm người dùng thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error("Lưu thất bại");
    }
  };

  const handleFilterChange = async (value: string) => {
    if (value === "all") {
      fetchUsers();
    } else {
      const role = value === "admin" ? "Admin" : "User";
      const res = await instanceAxios.get("/auth");

      const users = res.data.map((user) => ({
        ...user,
        id: user._id,
        key: user._id,
        role: user.role === "admin" ? "Admin" : "User",
      }));

      const filteredUsers = users.filter(
        (user) => user.role === role && user.is_active
      );

      setData(filteredUsers);

    }
  }

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
      render: (text) => (
        <span className="text-blue-600 font-medium">{text}</span>
      ),
    },
    {
      title: "🔑 Mật khẩu", // ✅ Mới thêm
      dataIndex: "password",
      align: "center",
      render: (text) => (
        <span className="text-gray-500 font-mono">{text}</span>
      ),
    },
    {
      title: "🔐 Vai trò",
      dataIndex: "role",
      align: "center",
      render: (role) => (
        <Tag
          color={role === "Admin" ? "purple" : "blue"}
          className="rounded-md"
        >
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
      render: (_, record) =>
        !record.is_active ? (
          <Button type="link" onClick={() => handleRestore(record.id)}>
            Khôi phục
          </Button>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit" onClick={() => openEditModal(record)}>
                  Sửa
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  danger
                  disabled={record.id === user._id}
                  onClick={() =>
                    Modal.confirm({
                      title: "Bạn có chắc muốn xoá người dùng này?",
                      onOk: () => handleDelete(record.id),
                    })
                  }
                >
                  Xoá
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button>⋮</Button>
          </Dropdown>
        ),
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Danh sách người dùng
          </h2>
          <Button type="primary" onClick={openAddModal}>
            ➕ Thêm người dùng
          </Button>
        </div>
        <div className="mb-4 float-end">
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleFilterChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "admin", label: "Admin" },
              { value: "customer", label: "Customer" },
            ]}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={[
              ...data.filter((u) => u.is_active),
              ...data.filter((u) => !u.is_active),
            ].map((u) => ({ ...u, key: u.id }))}
            pagination={false}
            bordered
            rowClassName={(record) =>
              !record.is_active ? "bg-gray-100 text-gray-400 opacity-70" : ""
            }
          />
        )}
      </div>

      <Modal
        title={editingUser ? "📝 Sửa người dùng" : "➕ Thêm người dùng"}
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
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                transform: (value: string) => value.replace(/\s/g, ""),
                pattern: /^\d{10}$/,
                message: "Số điện thoại phải gồm 10 chữ số",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={
              editingUser
                ? [
                  {
                    pattern: /^(?=.*[A-Z]).{8,}$/,
                    message: "Mật khẩu phải có ít nhất 8 ký tự và 1 chữ hoa",
                  },
                ]
                : [
                  { required: true, message: "Vui lòng nhập mật khẩu" },
                  {
                    pattern: /^(?=.*[A-Z]).{8,}$/,
                    message: "Mật khẩu phải có ít nhất 8 ký tự và 1 chữ hoa",
                  },
                ]
            }
          >
            <Input.Password
              type={showPassword ? "text" : "password"}
              placeholder={editingUser ? "Để trống nếu không đổi" : ""}
              prefix={<Lock size={16} className="text-gray-400 mr-2" />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={
              editingUser
                ? [
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]
                : [
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]
            }
          >
            <Input.Password
              prefix={<Lock size={16} className="text-gray-400 mr-2" />}
              placeholder="Confirm password"
            />
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

export default UserList;
