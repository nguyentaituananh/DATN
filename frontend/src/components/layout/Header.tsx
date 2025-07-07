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
  Menu,
  Avatar,
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
} from '@ant-design/icons';
import {
  Sofa,
  Bed,
  Armchair,
  Archive,
  Lamp,
} from 'lucide-react';

const { Search } = Input;
const { Text } = Typography;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productMenuItems = [
    { key: 'sofas', label: <Link to="/products/sofas" className="flex items-center space-x-2"><Sofa size={16} /><span>Sofa</span></Link> },
    { key: 'beds', label: <Link to="/products/beds" className="flex items-center space-x-2"><Bed size={16} /><span>Giường</span></Link> },
    { key: 'chairs', label: <Link to="/products/chairs" className="flex items-center space-x-2"><Armchair size={16} /><span>Ghế</span></Link> },
    { key: 'tables', label: <Link to="/products/tables" className="flex items-center space-x-2"><Archive size={16} /><span>Bàn</span></Link> },
    { key: 'cabinets', label: <Link to="/products/cabinets" className="flex items-center space-x-2"><Archive size={16} /><span>Tủ</span></Link> },
    { key: 'lighting', label: <Link to="/products/lighting" className="flex items-center space-x-2"><Lamp size={16} /><span>Đèn</span></Link> },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="orders">Đơn hàng của tôi</Menu.Item>
      <Menu.Item key="wishlist">Danh sách yêu thích</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  const navigation = [
    { name: 'Trang Chủ', href: '/', key: 'home' },
    { name: 'Sản Phẩm', href: '/products', key: 'products', hasDropdown: true },
    { name: 'Về Chúng Tôi', href: '/about', key: 'about' },
    { name: 'Liên Hệ', href: '/contact', key: 'contact' },
  ];

  return (
    <>
      <div className="bg-stone-800 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-6">
            <Space size="middle">
              <Space size="small">
                <PhoneOutlined />
                <Text className="text-white">Hotline: 1900 xxxx</Text>
              </Space>
              <Space size="small">
                <MailOutlined />
                <Text className="text-white">info@noithat.vn</Text>
              </Space>
            </Space>
          </div>
          <Text className="text-amber-300 ml-auto">
            Miễn phí vận chuyển đơn hàng trên 20 triệu
          </Text>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-amber-600 p-2 rounded-lg">
              <HomeOutlined className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-900">Nội Thất</h1>
              <p className="text-xs text-stone-500 -mt-1">Cao Cấp</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.key}>
                {item.hasDropdown ? (
                  <Dropdown overlay={<Menu items={productMenuItems} />} placement="bottomLeft" trigger={["hover"]}>
                    <Link to={item.href} className={`flex items-center space-x-1 py-2 px-3 rounded-lg transition-colors hover:text-amber-600 ${location.pathname === item.href ? 'text-amber-600 bg-amber-50' : 'text-stone-700'}`}>
                      <span className="font-medium">{item.name}</span>
                      <DownOutlined className="text-xs" />
                    </Link>
                  </Dropdown>
                ) : (
                  <Link to={item.href} className={`flex items-center space-x-1 py-2 px-3 rounded-lg transition-colors hover:text-amber-600 ${location.pathname === item.href ? 'text-amber-600 bg-amber-50' : 'text-stone-700'}`}>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Search placeholder="Tìm kiếm sản phẩm..." allowClear style={{ width: 300 }} />
            </div>

            <Badge count={2} size="small">
              <AntButton type="text" icon={<HeartOutlined />} className="text-stone-600 hover:text-amber-600" />
            </Badge>
            <Badge count={3} size="small">
              <AntButton type="text" icon={<ShoppingCartOutlined />} className="text-stone-600 hover:text-amber-600" />
            </Badge>

            <div className="hidden md:block">
              <Dropdown overlay={userMenu} placement="bottomRight" trigger={["hover"]}>
                <AntButton type="text" className="text-stone-600 hover:text-amber-600">
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span className="text-sm font-medium">Tài khoản</span>
                  </Space>
                </AntButton>
              </Dropdown>
            </div>

            <AntButton
              type="text"
              icon={<MenuOutlined />}
              className="lg:hidden text-stone-600 hover:text-amber-600"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setIsMobileMenuOpen(false)}
          open={isMobileMenuOpen}
          width={300}
        >
          <div className="space-y-6">
            <Search placeholder="Tìm kiếm sản phẩm..." allowClear size="large" />

            <Menu mode="vertical" selectedKeys={[location.pathname]} className="border-none">
              {navigation.map((item) => (
                <Menu.Item key={item.href}>
                  <Link to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>

            <div>
              <Text strong className="text-stone-700">Danh mục sản phẩm</Text>
              <Menu mode="vertical" className="border-none mt-2">
                {productMenuItems.map((item) => (
                  <Menu.Item key={item.key}>
                    <div onClick={() => setIsMobileMenuOpen(false)}>{item.label}</div>
                  </Menu.Item>
                ))}
              </Menu>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <Space direction="vertical" size="middle" className="w-full">
                <AntButton
                  type="primary"
                  icon={<UserOutlined />}
                  block
                  className="bg-amber-600 border-amber-600 hover:bg-amber-700"
                >
                  Đăng nhập
                </AntButton>
                <div className="flex justify-between">
                  <Badge count={2}>
                    <AntButton icon={<HeartOutlined />}>Yêu thích</AntButton>
                  </Badge>
                  <Badge count={3}>
                    <AntButton icon={<ShoppingCartOutlined />}>Giỏ hàng</AntButton>
                  </Badge>
                </div>
              </Space>
            </div>
          </div>
        </Drawer>
      </header>
    </>
  );
};

export default Header;
