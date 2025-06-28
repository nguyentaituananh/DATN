import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Checkbox, Divider, message } from 'antd';
import { Mail, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract returnTo from location state if available
  const returnTo = location.state?.returnTo || '/';

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    setIsLoading(true);
    
    try {
      await login(email, password);
      message.success('Login successful!');
      navigate(returnTo);
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-medium">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Đăng nhập để tiếp tục vào tài khoản của bạn</p>
          </div>
          
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
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
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password 
                prefix={<Lock size={16} className="text-gray-400 mr-2" />} 
                placeholder="Password" 
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lưu lại </Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="text-amber-700 hover:text-amber-800">
                Quên mật khẩu?

              </Link>
            </div>

            <Form.Item>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth 
                isLoading={isLoading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          {/* Social Login Options would go here in a real implementation */}
          <Divider plain>hoặc tiếp tục với</Divider>
          
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
             Bạn chưa có tài khoản?{' '}
              <Link to="/register" className="text-amber-700 hover:text-amber-800 font-medium">
                Tạo mới
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;