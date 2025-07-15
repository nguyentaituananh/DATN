import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  BellOutlined,
  HeartOutlined,
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  Drawer,
  Avatar,
  Badge,
  Button as AntButton,
  Divider,
  Dropdown,
  Space,
  Typography,
} from "antd";
import { Bed, Armchair, Table, Archive, Lamp, ChevronDown } from "lucide-react";

const { Text } = Typography;

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const userMenuItems = [
    { key: "profile", label: <Link to="/profile">Tài khoản</Link> },
    { key: "orders", label: <Link to="/orders">Đơn hàng</Link> },
    { key: "logout", label: "Đăng xuất", danger: true },
  ];

  const navigation = [
    { key: "home", name: "Trang chủ", href: "/" },
    { key: "about", name: "Về chúng tôi", href: "/about" },
    { key: "news", name: "Tin tức", href: "/blogs/news" },
  ];

  const productMenuItems = [
    {
      key: "beds",
      label: (
        <Link to="/products/beds" className="flex items-center space-x-3">
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
      key: "chairs",
      label: (
        <Link to="/products/chairs" className="flex items-center space-x-3">
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
      key: "tables",
      label: (
        <Link to="/products/tables" className="flex items-center space-x-3">
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
      key: "cabinets",
      label: (
        <Link to="/products/cabinets" className="flex items-center space-x-3">
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
      key: "lighting",
      label: (
        <Link to="/products/lighting" className="flex items-center space-x-3">
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-slate-800">
            Eco Decore
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Dropdown menu={{ items: productMenuItems }} trigger={["hover"]}>
              <div className="flex items-center cursor-pointer font-medium text-slate-700 hover:text-amber-700 space-x-1">
                <span>Sản phẩm</span>
                <ChevronDown size={16} />
              </div>
            </Dropdown>

            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`font-medium hover:text-amber-700 ${
                  location.pathname === item.href ? "text-amber-800" : "text-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Badge count={1}>
              <AntButton type="text" icon={<BellOutlined />} />
            </Badge>
            <Badge count={2}>
              <AntButton type="text" icon={<HeartOutlined />} />
            </Badge>
            <Badge count={3}>
              <AntButton type="text" icon={<ShoppingCartOutlined />} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} trigger={["hover"]}>
              <AntButton type="text" className="flex items-center space-x-2">
                <Avatar size="small" icon={<UserOutlined />} className="bg-gradient-to-r from-amber-500 to-amber-600" />
                <span className="text-sm font-semibold">Tài khoản</span>
              </AntButton>
            </Dropdown>
            <AntButton
              type="text"
              icon={<MenuOutlined />}
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
        </div>
      </div>

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
        width={320}
      >
        <nav className="flex flex-col space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 px-3 rounded-md hover:bg-amber-50 ${
                location.pathname === item.href ? "bg-amber-100 font-semibold" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Divider />

        <Text strong className="text-base mb-2 block text-stone-700">Danh mục sản phẩm</Text>
        <div className="space-y-2">
          {productMenuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:bg-amber-50 rounded-xl p-2 transition-all duration-300"
            >
              {item.label}
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
