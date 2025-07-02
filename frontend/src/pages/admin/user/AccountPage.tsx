import React, { useState } from 'react';
import { Tabs, Form, Input, Upload, Avatar, message } from 'antd';
import { User, Package, CreditCard, Heart, LogOut, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { useOrders } from '../../../context/OrderContext';

const { TabPane } = Tabs;

const AccountPage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleProfileUpdate = async (values: any) => {
    setIsUpdating(true);
    try {
      await updateProfile({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country || 'USA'
        }
      });
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-medium mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-6">
                <Avatar 
                  src={user.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"} 
                  size={64} 
                />
                <div className="ml-4">
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'profile' 
                        ? 'bg-amber-50 text-amber-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'orders' 
                        ? 'bg-amber-50 text-amber-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package size={18} className="mr-3" />
                    Orders
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'wishlist' 
                        ? 'bg-amber-50 text-amber-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart size={18} className="mr-3" />
                    Wishlist
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                      activeTab === 'payment' 
                        ? 'bg-amber-50 text-amber-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payment Methods
                  </button>
                </li>
              </ul>
            </div>
            <Button 
              variant="outline" 
              fullWidth
              leftIcon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Profile Information</h2>
                  <Form
                    layout="vertical"
                    initialValues={{
                      name: user.name,
                      email: user.email,
                      phone: user.phone || '',
                      street: user.address?.street || '',
                      city: user.address?.city || '',
                      state: user.address?.state || '',
                      zipCode: user.address?.zipCode || '',
                      country: user.address?.country || 'USA'
                    }}
                    onFinish={handleProfileUpdate}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                      >
                        <Input />
                      </Form.Item>
                      <div className="md:col-span-2">
                        <h3 className="font-medium mb-3 mt-2">Address Information</h3>
                      </div>
                      <Form.Item
                        name="street"
                        label="Street Address"
                        className="md:col-span-2"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="city"
                        label="City"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="state"
                        label="State"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="zipCode"
                        label="Zip Code"
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="country"
                        label="Country"
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <Form.Item className="mt-4">
                      <Button 
                        type="submit" 
                        variant="primary"
                        isLoading={isUpdating}
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">My Orders</h2>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'processing'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mb-3">
                            <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                            <span>Total: ${order.total.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>{order.items.length} items</span>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Button variant="primary" onClick={() => navigate('/products')}>
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Button variant="primary" onClick={() => navigate('/products')}>
                      Discover Products
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Payment Methods</h2>
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
                    <Button variant="primary">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;