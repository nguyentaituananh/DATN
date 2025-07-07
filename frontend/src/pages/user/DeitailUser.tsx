import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Typography,
  Row,
  Col,
  message,
} from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../pages/context/AuthContext';
import instanceAxios from '../../utils/instanceAxios';

const { Title } = Typography;

const AccountInfoPage = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { getUser } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUser();
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phone: data.phone_number,
          address: data.address,
        });
      } catch (err) {
        message.error('Không thể lấy thông tin người dùng');
      }
    };

    fetchUserInfo();
  }, [form, getUser]);

  const handleUpdateInfo = async (values: any) => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('Chưa đăng nhập');

      
      const userId = localStorage.getItem('id')

      await instanceAxios.put(`/auth/${userId}`, values);

      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      message.error('Cập nhật thông tin thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values: any) => {
    const token = localStorage.getItem('token')
    if (values.newPassword !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setPasswordLoading(true);
    try {
      await instanceAxios.put(
  "/auth/change-password",
  {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`, // token từ localStorage hoặc context
    },
  }
);

      message.success('Đổi mật khẩu thành công!');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Đổi mật khẩu thất bại!');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Thông tin tài khoản
        </Title>

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              title="Thông tin cá nhân"
              style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Row justify="center" style={{ marginBottom: 24 }}>
                <Col>
                  <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                  <div style={{ textAlign: 'center', marginTop: 8 }}>
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      style={{
                        backgroundColor: '#d2b48c',
                        color: 'white',
                        borderRadius: '16px',
                        padding: '4px 16px',
                      }}
                    >
                      Thay ảnh đại diện
                    </Button>
                  </div>
                </Col>
              </Row>

              <Form
                layout="vertical"
                form={form}
                onFinish={handleUpdateInfo}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    >
                      <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="SĐT"
                      rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^\d{10,11}$/, message: 'SĐT không hợp lệ' },
                      ]}
                    >
                      <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' },
                      ]}
                    >
                      <Input placeholder="Nhập email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="address" label="Địa chỉ">
                      <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{
                      backgroundColor: '#d2b48c',
                      borderColor: '#d2b48c',
                      borderRadius: '16px',
                      paddingLeft: '32px',
                      paddingRight: '32px',
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>

          <Col span={24}>
            <Card
              title="Đổi mật khẩu"
              style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Form
                layout="vertical"
                form={passwordForm}
                onFinish={handleChangePassword}
              >
                <Form.Item
                  name="currentPassword"
                  label="Mật khẩu hiện tại"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                >
                  <Input.Password placeholder="••••••••" />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="newPassword"
                      label="Mật khẩu mới"
                      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
                    >
                      <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="confirmPassword"
                      label="Nhập lại mật khẩu mới"
                      rules={[{ required: true, message: 'Vui lòng xác nhận lại mật khẩu' }]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={passwordLoading}
                    style={{
                      backgroundColor: '#d2b48c',
                      borderColor: '#d2b48c',
                      borderRadius: '16px',
                      paddingLeft: '32px',
                      paddingRight: '32px',
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AccountInfoPage;
