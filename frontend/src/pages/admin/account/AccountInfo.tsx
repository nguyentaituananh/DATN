import React, { useState } from "react";
import { Descriptions, Tag, Button, Space, Modal, Form, Input, Select, } from "antd";
import dayjs from "dayjs";
import { EditOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { User } from "../../../types";
import { message } from "antd";
import { Lock } from 'lucide-react';
import instanceAxios from "../../../utils/instanceAxios";
const { Option } = Select;

const AccountInfo: React.FC = () => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useAuth();


  const openEditModal = () => {
    setEditingUser(user);
    setShowPassword(false);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser && editingUser._id === user._id) {
        const updatedData = {
          ...values,
          ...values,
          role: values.role === "admin" ? "admin" : "customer",
        };
        if (!values.password) {
          delete updatedData.password;
        }
        await instanceAxios.put(`/auth/${editingUser._id}`, updatedData);
        message.success("Cập nhật thành công");
        setUser((prevUser) => ({
          ...prevUser!,
          ...updatedData,
        }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: { ...user, ...updatedData } })
        );
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Lưu thất bại");
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 Thông tin tài khoản</h2>

        <Space className="mb-4">
          <Button type="primary" icon={<EditOutlined />} size="large" onClick={() => openEditModal()}>
            Chỉnh sửa
          </Button>
        </Space>

        <Descriptions
          bordered
          column={1}
          size="middle"
        >
          <Descriptions.Item label="Họ tên">
            {user?.name || "Chưa có"}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user?.email || "Chưa có"}
          </Descriptions.Item>

          <Descriptions.Item label="Số điện thoại">
            {user?.phone_number || "Chưa có"}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ">
            {user?.address || "Chưa có"}
          </Descriptions.Item>

          <Descriptions.Item label="Vai trò">
            <Tag color={user?.role === "admin" ? "purple" : "blue"}>
              {user?.role === "admin" ? "Admin" : "Customer"}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo">
            {user?.createdAt ? dayjs(user.createdAt).format("DD/MM/YYYY") : "Không rõ"}
          </Descriptions.Item>
        </Descriptions>
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
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ" },
              ]}
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
                    message: 'Mật khẩu phải có ít nhất 8 ký tự và 1 chữ hoa',
                  }
                ]
                : [{ required: true, message: "Vui lòng nhập mật khẩu" },
                {
                  pattern: /^(?=.*[A-Z]).{8,}$/,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự và 1 chữ hoa',
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
              editingUser ? [
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),

              ] :
                [
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match"));
                    },
                  }),
                ]}
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
                <Option value="admin">Admin</Option>
                <Option value="customer">User</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AccountInfo;
