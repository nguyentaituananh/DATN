// src/pages/user/ChangePasswordPage.tsx

import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import instanceAxios from '../../utils/instanceAxios';

const { Title } = Typography;

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (values: any) => {
    const token = localStorage.getItem('token');
    if (values.newPassword !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    try {
      await instanceAxios.put(
        '/auth/change-password',
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success('Đổi mật khẩu thành công!');
      form.resetFields();
    } catch (error) {
      message.error('Đổi mật khẩu thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          Đổi mật khẩu
        </Title>
        <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Form layout="vertical" form={form} onFinish={handleChangePassword}>
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
      </div>
    </div>
  );
};

export default ChangePasswordPage;
