import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Input,
  Badge,
  Dropdown,
  Button as AntButton,
  Drawer,
  Typography,
  Menu,
  Avatar,
<<<<<<< HEAD
} from 'antd';
=======
} from "antd";
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined,
<<<<<<< HEAD
  HomeOutlined,
} from '@ant-design/icons';
import {
  Sofa,
  Bed,
  Armchair,
  Archive,
  Lamp,
} from 'lucide-react';
=======
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import type { MenuProps } from "antd";
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b

const { Search } = Input;
const { Text } = Typography;

// Menu navigation chính
const navigation = [
  { key: "home", name: "Trang chủ", href: "/" },
  { key: "products", name: "Sản phẩm", href: "/products", hasDropdown: true },
  { key: "about", name: "Giới thiệu", href: "/about" },
  { key: "news", name: "Tin tức", href: "/blogs/news" },
];

// Menu sản phẩm
const productMenuItems: MenuProps["items"] = [
  { key: "all", label: <Link to="/products">Tất cả sản phẩm</Link> },
  { type: "divider" as const },
  { key: "sofas", label: <Link to="/products/sofas">Sofa</Link> },
  { key: "beds", label: <Link to="/products/beds">Giường</Link> },
  { key: "chairs", label: <Link to="/products/chairs">Ghế</Link> },
  { key: "tables", label: <Link to="/products/tables">Bàn</Link> },
  { key: "cabinets", label: <Link to="/products/cabinets">Tủ</Link> },
  { key: "lighting", label: <Link to="/products/lighting">Đèn</Link> },
];

const Header: React.FC = () => {
<<<<<<< HEAD
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user_id = localStorage.getItem('id');
    if (storedUser) {
      // const parsedUser = JSON.parse(storedUser);
      setUserName(storedUser || null);
    } else {
      setUserName(null);
    }

    if (user_id) {
      setUserId(user_id || null);
    } else {
      setUserId(null);
    }
  }, [location]);

  const productMenuItems = [
    { key: 'sofas', label: <Link to="/products/sofas" className="flex items-center space-x-2"><Sofa size={16} /><span>Sofa</span></Link> },
    { key: 'beds', label: <Link to="/products/beds" className="flex items-center space-x-2"><Bed size={16} /><span>Giường</span></Link> },
    { key: 'chairs', label: <Link to="/products/chairs" className="flex items-center space-x-2"><Armchair size={16} /><span>Ghế</span></Link> },
    { key: 'tables', label: <Link to="/products/tables" className="flex items-center space-x-2"><Archive size={16} /><span>Bàn</span></Link> },
    { key: 'cabinets', label: <Link to="/products/cabinets" className="flex items-center space-x-2"><Archive size={16} /><span>Tủ</span></Link> },
    { key: 'lighting', label: <Link to="/products/lighting" className="flex items-center space-x-2"><Lamp size={16} /><span>Đèn</span></Link> },
  ];

  const loggedInMenu = (
    <Menu>
    <Menu.Item key="profile">
  <Link to={`/userDeitail/${userId}`}>Thông tin cá nhân</Link>
</Menu.Item>

      <Menu.Item key="orders">Đơn hàng của tôi</Menu.Item>
      <Menu.Item key="wishlist">Danh sách yêu thích</Menu.Item>
      <Menu.Divider />
      <Menu.Item
  key="logout"
  onClick={() => {
    localStorage.clear(); 
    setUserName(null);    
    window.location.href = '/'; 
  }}
>
  Đăng xuất
</Menu.Item>

    </Menu>
  );

  const guestMenu = (
    <Menu>
      <Menu.Item key="register">
        <Link to="/register">Đăng ký</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Đăng nhập</Link>
      </Menu.Item>
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
              <Dropdown overlay={userName ? loggedInMenu : guestMenu} placement="bottomRight" trigger={["hover"]}>
                <AntButton type="text" className="text-stone-600 hover:text-amber-600">
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span className="text-sm font-medium">
                      {userName ? userName : "Tài khoản"}
                    </span>
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
                {userName ? (
                  <Text strong className="text-stone-700">Xin chào, {userName}</Text>
                ) : (
                  <>
                    <Link to="/login">
                      <AntButton
                        type="primary"
                        icon={<UserOutlined />}
                        block
                        className="bg-amber-600 border-amber-600 hover:bg-amber-700"
                      >
                        Đăng nhập
                      </AntButton>
                    </Link>
                    <Link to="/register">
                      <AntButton block>Đăng ký</AntButton>
                    </Link>
                  </>
                )}
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
=======
  const { items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu user
  const userMenuItems = user
    ? [
        { key: "profile", label: "Tài khoản" },
        { key: "orders", label: "Đơn hàng" },
        { key: "logout", label: "Đăng xuất", onClick: logout },
      ]
    : [
        { key: "login", label: <Link to="/login">Đăng nhập</Link> },
        { key: "register", label: <Link to="/register">Đăng ký</Link> },
      ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 ${
        isScrolled ? "shadow-lg bg-white" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">
          EcoDecore
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4">
          {navigation.map((item) => (
            <div key={item.key}>
              {item.hasDropdown ? (
                <Dropdown
                  menu={{ items: productMenuItems }}
                  trigger={["hover"]}
                >
                  <Link to={item.href}>
                    {item.name} <DownOutlined />
                  </Link>
                </Dropdown>
              ) : (
                <Link to={item.href}>{item.name}</Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <Badge count={items.length}>
            <ShoppingCartOutlined className="text-lg" />
          </Badge>
          <Badge count={1}>
            <HeartOutlined className="text-lg" />
          </Badge>
          <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
            <Avatar icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
          <AntButton
            icon={<MenuOutlined />}
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
      >
        <nav className="flex flex-col space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </Drawer>
    </header>
>>>>>>> 4972f81020297a60c800d3060049d31b85e1d23b
  );
};

export default Header;
