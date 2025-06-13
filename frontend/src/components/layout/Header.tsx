// Header.tsx (đã viết lại hoàn chỉnh, sạch lỗi)

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Input,
  Badge,
  Dropdown,
  Button as AntButton,
  Drawer,
  Space,
  Typography,
  Avatar,
  Divider,
} from "antd";
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
  BellOutlined,
} from "@ant-design/icons";
import { Sofa, Bed, Armchair, Archive, Lamp, Table } from "lucide-react";
import { motion } from "framer-motion";
const { Search } = Input;
const { Text } = Typography;
import { useAuth } from "../../context/AuthContext";
// Menu navigation chính
const navigation = [
  { key: "home", name: "Trang chủ", href: "/" },
  { key: "products", name: "Sản phẩm", href: "/products", hasDropdown: true },
  { key: "about", name: "Giới thiệu", href: "/about" },
  { key: "news", name: "Tin tức", href: "/blogs/news" },
];

// Menu sản phẩm
import type { MenuProps } from "antd";

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
  const { items } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const { user, logout } = useAuth();
  // Menu user
  const userMenuItems =
    (user) ?
      [
        { key: "profile", label: "Tài khoản" },
        { key: "orders", label: "Đơn hàng" },
        { key: "logout", label: "Đăng xuất", onClick: logout },
      ] :
      [
        { key: "login", label: <Link to="/login">Đăng nhập</Link> },
        { key: "register", label: <Link to="/register">Đăng ký</Link> },
      ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 ${isScrolled ? "shadow-lg bg-white" : "bg-white"
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
          <Badge count={2}>
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
  );
};

export default Header;
