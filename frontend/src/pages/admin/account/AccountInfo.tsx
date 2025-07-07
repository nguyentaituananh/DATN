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
  Card,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;
const API_URL = "http://localhost:3001/account"; // json-server

const AccountInfo = () => {
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch account data
  const fetchAccount = async () => {
    try {
      const res = await axios.get(API_URL);
      setAccount(res.data[0]); // Giả sử chỉ có 1 tài khoản
    } catch (err) {
      message.error("Lỗi khi tải tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleEdit = () => {
    form.setFieldsValue(account);
    setEditModalOpen(true);
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá tài khoản này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${account.id}`);
          message.success("Đã xoá tài khoản");
          setAccount(null);
        } catch {
          message.error("Lỗi khi xoá tài khoản");
        }
      },
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const res = await axios.put(`${API_URL}/${account.id}`, {
        ...account,
        ...values,
      });
      setAccount(res.data);
      message.success("Cập nhật thành công");
      setEditModalOpen(false);
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  if (loading) return <Spin size="large" className="block mx-auto mt-10" />;
  if (!account) return <div>Không có dữ liệu người dùng.</div>;

  return (
    <>
      <Card
        title="📋 Thông tin tài khoản"
        bordered
        className="shadow-md rounded-xl"
      >
        <div className="grid grid-cols-2 gap-4 text-base">
          <div>
            <strong>👤 Họ tên:</strong>
            <div className="font-semibold">{account.name}</div>
          </div>
          <div>
            <strong>📧 Email:</strong>
            <div className="text-blue-600 font-medium">{account.email}</div>
          </div>
          <div>
            <strong>🔐 Vai trò:</strong>
            <div>
              <Tag
                color={account.role === "Admin" ? "purple" : "blue"}
                className="rounded-md px-2 py-1"
              >
                {account.role}
              </Tag>
            </div>
          </div>
          <div>
            <strong>📅 Ngày tạo:</strong>
            <div>{dayjs(account.createdAt).format("DD/MM/YYYY")}</div>
          </div>
          <div className="col-span-2 mt-4">
            <Space>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Sửa
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Xoá
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      <Modal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleUpdate}
        title="Chỉnh sửa tài khoản"
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form layout="vertical" form={form}>
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
    </>
  );
};

export default AccountInfo;

