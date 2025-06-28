import React, { useState } from 'react';

import { Form, Input, Checkbox, Divider, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';



const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    const { name, email, password } = values;
    setIsLoading(true);
    
    try {
      await register(name, email, password);
      message.success('Registration successful!');
      navigate('/');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-medium">Create Account</h1>
            <p className="text-gray-600 mt-2">Hãy tham gia cùng chúng tôi để có trải nghiệm mua sắm tốt hơn</p>
          </div>
          
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
            >
              <Input 
                prefix={<User size={16} className="text-gray-400 mr-2" />} 
                placeholder="John Doe" 
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn' },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
              ]}
            >
              <Input 
                prefix={<Mail size={16} className="text-gray-400 mr-2" />} 
                placeholder="your@email.com" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu của bạn' },
                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' }
              ]}
            >
              <Input.Password 
                prefix={<Lock size={16} className="text-gray-400 mr-2" />} 
                placeholder="Password (min. 8 characters)" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Hai mật khẩu không khớp nhau'));
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
              name="agreement"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn phải chấp nhận các điều khoản và điều kiện')),
                },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với{' '}
                <Link to="/terms" className="text-amber-700">
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link to="/privacy" className="text-amber-700">
                  Chính sách bảo mật
                </Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth 
                isLoading={isLoading}
              >
               Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>hoặc đăng ký với</Divider>
          
          <div className="grid grid-cols-3 gap-3 mt-6">
            <button className="flex justify-center items-center py-2 border rounded-md hover:bg-gray-50">
              Google
            </button>
            <button className="flex justify-center items-center py-2 border rounded-md hover:bg-gray-50">
              Facebook
            </button>
            <button className="flex justify-center items-center py-2 border rounded-md hover:bg-gray-50">
              Apple
            </button>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
             Bạn đã có tài khoản?{' '}
             <Link to="/login" className="text-amber-700 hover:text-amber-800 font-medium">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;