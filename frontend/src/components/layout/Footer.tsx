import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl mb-4">LuxeFurnish</h3>
            <p className="text-slate-300 mb-4 max-w-xs">
              Kiến tạo không gian sống đẳng cấp với nội thất cao cấp từ năm 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Danh mục sản phẩm</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/products/sofas" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Sofa
                </Link>
              </li>
              <li>
                <Link to="/products/tables" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Bàn
                </Link>
              </li>
              <li>
                <Link to="/products/chairs" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Ghế
                </Link>
              </li>
              <li>
                <Link to="/products/beds" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Giường
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-medium text-lg mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Vận chuyển & Giao hàng
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Đổi trả & Hoàn tiền
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-amber-400 transition-colors">
                  Điều khoản & Điều kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-lg mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-amber-400" />
                <span className="text-slate-300">123 Đường Nội Thất, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-amber-400" />
                <span className="text-slate-300">(028) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-amber-400" />
                <span className="text-slate-300">info@luxefurnish.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="md:flex md:justify-between md:items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h4 className="font-medium text-lg mb-2">Đăng ký nhận tin</h4>
              <p className="text-slate-300 mb-4 max-w-md">
                Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và ý tưởng trang trí nội thất.
              </p>
            </div>
            <div className="md:w-1/2 max-w-md">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Địa chỉ email của bạn"
                  className="flex-grow px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                />
                <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-r-md transition-colors">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} LuxeFurnish. Đã đăng ký bản quyền.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;