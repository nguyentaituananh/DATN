import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Badge, Drawer } from 'antd';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const totalItems = (items ?? []).reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/products', label: 'Tất cả sản phẩm' },
    { to: '/products/sofas', label: 'Sofa' },
    { to: '/products/tables', label: 'Bàn' },
    { to: '/products/chairs', label: 'Ghế' },
    { to: '/products/beds', label: 'Giường' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-slate-800">
            LuxeFurnish
          </Link>

          {/* Desktop Navigation */}
          <nav className="font-sans hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-amber-800'
                    : 'text-slate-700 hover:text-amber-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
         <div className="hidden md:flex items-center space-x-6">
  <button
    onClick={() => setSearchOpen(true)}
    className="flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors"
    aria-label="Tìm kiếm"
  >
    <Search size={20} />
  </button>

  <Link to="/cart" className="relative flex items-center justify-center">
    <Badge count={totalItems} size="small" color="#B45309">
      <ShoppingCart size={21} className="text-slate-700 hover:text-amber-700 transition-colors" />
    </Badge>
  </Link>

  <Link
    to={isAuthenticated ? '/account' : '/login'}
    className="flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors"
  >
    <User size={20} />
  </Link>
</div>


          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <Badge count={totalItems} size="small" color="#B45309">
                <ShoppingCart size={20} className="text-slate-700" />
              </Badge>
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-slate-700"
              aria-label="Mở menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        width={280}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ borderBottom: '1px solid #F3F4F6' }}
      >
        <div className="py-4">
          <div className="px-4 pb-5 pt-2">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-2.5 text-gray-500">
                <Search size={18} />
              </button>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <Link to="/account" className="text-sm text-amber-700">Xem tài khoản</Link>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 mb-6 pb-4 border-b border-gray-100">
                <Link
                  to="/login"
                  className="flex-1 py-2 px-3 text-center bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="flex-1 py-2 px-3 text-center border border-amber-700 text-amber-700 rounded-md hover:bg-amber-50 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <nav className="py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 hover:bg-amber-50 ${
                  location.pathname === link.to
                    ? 'text-amber-800 bg-amber-50 font-medium'
                    : 'text-slate-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pt-4 mt-2 border-t border-gray-100">
            {isAuthenticated && (
              <button
                className="block w-full py-2 text-center text-rose-600 hover:text-rose-700"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </Drawer>

      {/* Search Drawer */}
      <Drawer
        title="Tìm kiếm sản phẩm"
        placement="top"
        onClose={() => setSearchOpen(false)}
        open={searchOpen}
        height={120}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Bạn đang tìm gì?"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button 
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setSearchQuery('')}
          >
            {searchQuery ? <X size={18} /> : <Search size={18} />}
          </button>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;