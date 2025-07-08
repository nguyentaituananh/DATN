import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Input,
  Badge,
  Dropdown,
  Button as AntButton,
  Drawer,
  Space,
  Typography,
  Avatar,
  Divider
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  PhoneOutlined,
  MailOutlined,
  DownOutlined,
  HomeOutlined,
  GiftOutlined,
  BellOutlined
} from '@ant-design/icons';
import {
  Sofa,
  Bed,
  Armchair,
  Archive,
  Lamp,
  Table
} from 'lucide-react';
import { motion } from 'framer-motion';

const { Search } = Input;
const { Text } = Typography;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productMenuItems = [
    {
      key: 'all',
      label: (
        <Link to="/products" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <HomeOutlined className="text-amber-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Tất cả sản phẩm</div>
            <div className="text-xs text-stone-500">Xem toàn bộ bộ sưu tập</div>
          </div>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'sofas',
      label: (
        <Link to="/products/sofas" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Sofa size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Sofa</div>
            <div className="text-xs text-stone-500">120+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'beds',
      label: (
        <Link to="/products/beds" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Bed size={16} className="text-green-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Giường</div>
            <div className="text-xs text-stone-500">60+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'chairs',
      label: (
        <Link to="/products/chairs" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Armchair size={16} className="text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Ghế</div>
            <div className="text-xs text-stone-500">95+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'tables',
      label: (
        <Link to="/products/tables" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Table size={16} className="text-orange-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Bàn</div>
            <div className="text-xs text-stone-500">85+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'cabinets',
      label: (
        <Link to="/products/cabinets" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <Archive size={16} className="text-red-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Tủ</div>
            <div className="text-xs text-stone-500">75+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    {
      key: 'lighting',
      label: (
        <Link to="/products/lighting" className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Lamp size={16} className="text-yellow-600" />
          </div>
          <div>
            <div className="font-medium text-stone-700">Đèn</div>
            <div className="text-xs text-stone-500">40+ sản phẩm</div>
          </div>
        </Link>
      ),
    },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/blogs/news", label: "Tin tức" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white py-3 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center space-x-8">
              <Space size="large">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <PhoneOutlined className="text-amber-300" />
                  <Text className="text-white font-medium">Hotline: 1900 xxxx</Text>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <MailOutlined className="text-amber-300" />
                  <Text className="text-white font-medium">info@ecodecore.com</Text>
                </motion.div>
              </Space>
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-1 rounded-full shadow-lg"
              >
                <Text className="text-white font-semibold text-xs flex items-center space-x-1">
                  <GiftOutlined className="text-xs" />
                  <span>🚚 Miễn phí vận chuyển đơn hàng trên 20 triệu</span>
                </Text>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100'
            : 'bg-white shadow-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <HomeOutlined className="text-white text-2xl" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">
                  Eco Decore
                </h1>
                <p className="text-sm text-stone-500 font-medium -mt-1">Nội Thất Cao Cấp</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {Navigation.map((item) => (
                <div key={item.key}>
                  {item.hasDropdown ? (
                    <Dropdown
                      menu={{ items: productMenuItems }}
                      placement="bottomLeft"
                      trigger={['hover']}
                      overlayClassName="shadow-xl border-0 rounded-xl"
                      overlayStyle={{ minWidth: '280px' }}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 group ${
                          location.pathname === item.href
                            ? 'text-amber-600 bg-amber-50 shadow-md'
                            : 'text-stone-700'
                        }`}
                      >
                        <span className="font-semibold">{item.name}</span>
                        <DownOutlined className="text-xs group-hover:rotate-180 transition-transform duration-300" />
                      </Link>
                    </Dropdown>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
                        location.pathname === item.href
                          ? 'text-amber-600 bg-amber-50 shadow-md'
                          : 'text-stone-700'
                      }`}
                    >
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="hidden md:block">
                <Search
                  placeholder="Tìm kiếm sản phẩm..."
                  allowClear
                  size="large"
                  style={{ width: 320 }}
                  className="rounded-xl shadow-sm"
                />
              </div>

              {/* Notifications */}
              <Badge count={1} size="small" className="hover:scale-110 transition-transform">
                <AntButton
                  type="text"
                  icon={<BellOutlined className="text-lg" />}
                  className="text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl h-12 w-12 flex items-center justify-center transition-all duration-300"
                />
              </Badge>

              {/* Wishlist */}
              <Badge count={2} size="small" className="hover:scale-110 transition-transform">
                <AntButton
                  type="text"
                  icon={<HeartOutlined className="text-lg" />}
                  className="text-stone-600 hover:text-red-500 hover:bg-red-50 rounded-xl h-12 w-12 flex items-center justify-center transition-all duration-300"
                />
              </Badge>

              {/* Cart */}
              <Badge count={3} size="small" className="hover:scale-110 transition-transform">
                <AntButton
                  type="text"
                  icon={<ShoppingCartOutlined className="text-lg" />}
                  className="text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl h-12 w-12 flex items-center justify-center transition-all duration-300"
                />
              </Badge>

              {/* User Account */}
              <div className="hidden md:block">
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['hover']}
                  overlayClassName="shadow-xl border-0 rounded-xl"
                >
                  <AntButton
                    type="text"
                    className="text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl h-12 px-4 transition-all duration-300"
                  >
                    <Space>
                      <Avatar 
                        size="small" 
                        icon={<UserOutlined />} 
                        className="bg-gradient-to-r from-amber-500 to-amber-600" 
                      />
                      <span className="text-sm font-semibold">Tài khoản</span>
                    </Space>
                  </AntButton>
                </Dropdown>
              </div>

              {/* Mobile Menu Button */}
              <AntButton
                type="text"
                icon={<MenuOutlined className="text-lg" />}
                className="lg:hidden text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl h-12 w-12 flex items-center justify-center transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-2 rounded-lg">
                <HomeOutlined className="text-white text-lg" />
              </div>
              <span className="font-bold text-lg">Menu</span>
            </div>
          }
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={350}
          className="mobile-drawer"
        >
          <div className="space-y-6">
            {/* Mobile Search */}
            <Search
              placeholder="Tìm kiếm sản phẩm..."
              allowClear
              size="large"
              className="rounded-xl"
            />

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
                    location.pathname === item.href
                      ? 'text-amber-600 bg-amber-50 font-semibold'
                      : 'text-stone-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Divider />

            {/* Mobile Product Categories */}
            <div>
              <Text strong className="text-stone-700 text-base mb-4 block">Danh mục sản phẩm</Text>
              <div className="space-y-2">
                {productMenuItems.filter(item => item.key !== 'all' && item.type !== 'divider').map((item) => (
                  <div key={item.key} onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-amber-50 rounded-xl transition-all duration-300">
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Mobile Actions */}
            <div>
              <Space direction="vertical" size="large" className="w-full">
                <AntButton
                  type="primary"
                  icon={<UserOutlined />}
                  block
                  size="large"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Đăng nhập
                </AntButton>
                <div className="grid grid-cols-3 gap-3">
                  <Badge count={1}>
                    <AntButton 
                      icon={<BellOutlined />} 
                      className="w-full rounded-xl h-12 border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      title="Thông báo"
                    />
                  </Badge>
                  <Badge count={2}>
                    <AntButton 
                      icon={<HeartOutlined />} 
                      className="w-full rounded-xl h-12 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                      title="Yêu thích"
                    />
                  </Badge>
                  <Badge count={3}>
                    <AntButton 
                      icon={<ShoppingCartOutlined />}
                      className="w-full rounded-xl h-12 border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300"
                      title="Giỏ hàng"
                    />
                  </Badge>
                </div>
              </Space>
            </div>
          </div>
        </Drawer>
      </motion.header>
    </>
  );
};

export default Header;