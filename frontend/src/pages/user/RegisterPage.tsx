import React, { useState } from "react";
import { Form, Input, Checkbox, Divider, message } from "antd";
import Button from "../../components/ui/Button";
import { Mail, Lock, User, Phone, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/context/AuthContext";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}) => {
  setIsLoading(true);
  try {
    await register({
      name: values.name,
      email: values.email,
      password: values.password,
      address: values.address,
      phone_number: values.phone_number,
    });
    message.success("Registration successful!");
    navigate("/");
  } catch (error: any) {
  const msg = error?.message || error?.response?.data?.message || "Registration failed.";
  message.error(msg);
}
 finally {
    setIsLoading(false);
  }
};


  return (
    <div className="py-12 md:py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-medium">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Join us for a better shopping experience
            </p>
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
              rules={[{ required: true, message: "Please enter your name" }]}
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
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
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
                { required: true, message: "Please enter your password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<Lock size={16} className="text-gray-400 mr-2" />}
                placeholder="Password (min. 8 characters)"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
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
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                prefix={<Home size={16} className="text-gray-400 mr-2" />}
                placeholder="Your address"
              />
            </Form.Item>

            <Form.Item
              name="phone_number"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: "Phone number must be 10-11 digits",
                },
              ]}
            >
              <Input
                prefix={<Phone size={16} className="text-gray-400 mr-2" />}
                placeholder="Your phone number"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must accept the terms and conditions")
                        ),
                },
              ]}
            >
              <Checkbox>
                I agree to the{" "}
                <Link to="/terms" className="text-amber-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
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

          <Divider plain>or sign up with</Divider>

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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
