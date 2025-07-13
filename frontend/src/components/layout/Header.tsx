import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, Search, ChevronDown } from "lucide-react";
import { Badge } from "antd";

const Header: React.FC = () => {
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Trang chủ" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-slate-800">
            Eco Decore
          </Link>

          <nav className="font-sans hidden md:flex items-center space-x-6 relative">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.to} className="relative group">
                  <div
                    className={`flex items-center space-x-1 font-medium transition-colors ${location.pathname.startsWith(link.to) ? "text-amber-800" : "text-slate-700 hover:text-amber-700"}`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                      >
                        {child.label}
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
      </header>
    </>
=========
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
  );
};

export default Header;