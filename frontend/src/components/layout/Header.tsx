import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, Search, ChevronDown } from "lucide-react";
import { Badge } from "antd";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const User_id = localStorage.getItem("id");
    if (storedUser) {
      setUser(storedUser);
    }
    if (User_id) {
      setId(User_id);
    }
  }, []);

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
      to: "/products",
      label: "Sản phẩm",
      children: [
        { to: "/products/sofas", label: "Sofa" },
        { to: "/products/tables", label: "Bàn" },
        { to: "/products/chairs", label: "Ghế" },
        { to: "/products/beds", label: "Giường" },
      ],
    },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/blogs/news", label: "Tin tức" },
    { to: "/store", label: "Cửa hàng" },
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
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition-colors ${location.pathname === link.to ? "text-amber-800" : "text-slate-700 hover:text-amber-700"}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search size={20} />
            </button>

            <Link to="/cart" className="relative flex items-center justify-center">
              <Badge count={0} size="small" color="#B45309">
                <ShoppingCart size={21} className="text-slate-700 hover:text-amber-700 transition-colors" />
              </Badge>
            </Link>

            {user ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 text-slate-700 hover:text-amber-700 cursor-pointer">
 <img
  src="https://i.pravatar.cc/300"
  alt="user"
  className="w-6 h-6 rounded-full object-cover"
/>

  <span className="text-sm font-medium">{user || "User"}</span>
</div>

                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to={`/userDeitail/${id}`}
                    className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/order-history"
                    className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Lịch sử mua hàng
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                      window.location.href = "/";
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="flex items-center justify-center text-slate-700 hover:text-amber-700 cursor-pointer">
                  <User size={20} />
                </div>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Đăng ký
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <Badge count={0} size="small" color="#B45309">
                <ShoppingCart size={20} className="text-slate-700" />
              </Badge>
            </Link>
            <button onClick={() => setMenuOpen(true)} className="text-slate-700" aria-label="Mở menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;