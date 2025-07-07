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
    { type: 'divider' },
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
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/account">Thông tin tài khoản</Link>,
    },
    {
      key: 'orders',
      label: <Link to="/orders">Đơn hàng</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <span>Đăng xuất</span>,
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 text-white py-3 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Space size="large" className="hidden md:flex">
            <div className="flex items-center space-x-2 hover:text-amber-300 transition-colors cursor-pointer">
              <PhoneOutlined className="text-amber-300" />
              <Text className="text-white font-medium">Hotline: 1900 xxxx</Text>
            </div>
            <div className="flex items-center space-x-2 hover:text-amber-300 transition-colors cursor-pointer">
              <MailOutlined className="text-amber-300" />
              <Text className="text-white font-medium">info@ecodecore.com</Text>
            </div>
          </Space>
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
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-xl shadow-lg"
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

          {/* Search + Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <Search placeholder="Tìm kiếm sản phẩm..." allowClear size="large" style={{ width: 320 }} />
            </div>
            <Badge count={1}><AntButton icon={<BellOutlined />} type="text" /></Badge>
            <Badge count={2}><AntButton icon={<HeartOutlined />} type="text" /></Badge>
            <Badge count={3}><AntButton icon={<ShoppingCartOutlined />} type="text" /></Badge>
            <Dropdown menu={{ items: userMenuItems }} trigger={['hover']}>
              <AntButton type="text">
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="text-sm font-semibold">Tài khoản</span>
                </Space>
              </AntButton>
            </Dropdown>
            <AntButton icon={<MenuOutlined />} type="text" onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={350}
        >
          <Search placeholder="Tìm kiếm sản phẩm..." allowClear size="large" />
          <Divider />
          <Text strong>Danh mục sản phẩm</Text>
          <div className="space-y-2 mt-2">
            {productMenuItems
              .filter(item => item.key !== 'all' && item.type !== 'divider')
              .map(item => (
                <div key={item.key} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </div>
              ))}
          </div>
        </Drawer>
      </motion.header>
    </>
  );
};

export default Header;
