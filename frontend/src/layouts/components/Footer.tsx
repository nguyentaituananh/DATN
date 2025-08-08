import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Sofa } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <Sofa className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">EcoDecor</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Chuyên cung cấp đồ nội thất cao cấp, hiện đại với chất lượng tốt nhất.
              Tạo nên không gian sống hoàn hảo cho gia đình bạn.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-slate-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-blue-300 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-slate-400 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>


          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-600">Danh Mục Sản Phẩm</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Bàn Ghế</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Tủ Kệ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Giường Ngủ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Sofa</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Đèn Trang Trí</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Phụ Kiện</a></li>
            </ul>
          </div>


          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-600">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Chính Sách Bảo Hành</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Đổi Trả & Hoàn Tiền</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Vận Chuyển & Lắp Đặt</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Liên Hệ</a></li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-600">Thông Tin Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm">123 Đường ABC, Quận 1</p>
                  <p className="text-slate-300 text-sm">TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <p className="text-slate-300 text-sm">0901 234 567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <p className="text-slate-300 text-sm">info@EcoDecor.vn</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Đăng Ký Nhận Tin</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-md text-sm focus:outline-none focus:border-orange-600"
                />
                <button className="px-4 py-2 bg-orange-600 hover:bg-red-600 rounded-r-md transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 EcoDecor. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Chính Sách Bảo Mật</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Điều Khoản Sử Dụng</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;

