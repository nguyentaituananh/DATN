import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, Search, ChevronDown } from "lucide-react";
import { Badge } from "antd";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [UserId, setUserId] = useState<string | null>(null);


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

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const User_id = localStorage.getItem("id");
  if (storedUser) {
    setIsLoggedIn(true);
    setUserName(storedUser); 
  } else {
    setIsLoggedIn(false);
    setUserName(null);
  }

  if (User_id) {
    setIsLoggedIn(true);
    setUserId(User_id); 
  } else {
    setIsLoggedIn(false);
    setUserId(null);
  }
}, [location]);


const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); 
  localStorage.removeItem("id"); 
  setIsLoggedIn(false);
  setUserName(null);
  setUserId(null);
  window.location.href = "/"; 
};



  const navLinks = [
    { to: "/", label: "Trang chủ" },
    {
      to: "/products",
      label: " Sản phẩm",
      children: [
        { to: "/products/sofas", label: "Sofa" },
        { to: "/products/tables", label: "Bàn" },
        { to: "/products/chairs", label: "Ghế" },
        { to: "/products/beds", label: "Giường" },
      ],
    },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/blogs/news", label: "Tin tức" },
    { to: "/Store", label: "Cửa hàng" },
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

      <div className="relative group">
  <div className="flex items-center justify-center text-slate-700 hover:text-amber-700 transition-colors cursor-pointer">
    {isLoggedIn ? (
      <img
        src="/https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg" 
        alt="Avatar"
        className="w-6 h-6 rounded-full object-cover"
      />
    ) : (
      <User size={20} />
    )}
  </div>

  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    {isLoggedIn ? (
      <>
        <span className="block px-4 py-2 text-slate-600 font-medium cursor-default">
          👋 {userName || "Tài khoản"}
        </span>
        <Link
          to={`userDeitail/${UserId}`}
          className="block px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
        >
          Xem thông tin
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-amber-50 hover:text-amber-700"
        >
          Đăng xuất
        </button>
      </>
    ) : (
      <>
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
      </>
    )}
  </div>
</div>



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
      {/* Drawer hoặc phần mở rộng menu (nếu có) giữ nguyên ở đây */}
    </header>
  );
};

export default Header;
