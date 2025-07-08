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
} from "antd";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import { User } from "../../../types";
import {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../../../api/userApi";

const { Option } = Select;

const UserList: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle hiện mật khẩu

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      const users = res.data.map((user) => ({
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
      await deleteUser(id);
      message.success("Xoá thành công");
      fetchUsers();
    } catch (error) {
      message.error("Xoá thất bại");
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
        const updatedData = { ...values };
        if (!values.password) {
          delete updatedData.password;
        }
        await updateUser(editingUser.id, updatedData);
        message.success("Cập nhật thành công");
      } else {
        await createUser({
          ...values,
          createdAt: new Date().toISOString(),
        });
        message.success("Thêm người dùng thành công");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error("Lưu thất bại");
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
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Danh sách người dùng
          </h2>
          <Button type="primary" onClick={openAddModal}>
            ➕ Thêm người dùng
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
            name="password"
            label="Mật khẩu"
            rules={
              editingUser
                ? []
                : [{ required: true, message: "Vui lòng nhập mật khẩu" }]
            }
          >
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={editingUser ? "Để trống nếu không đổi" : ""}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            >
              Hiện mật khẩu
            </Checkbox>
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
