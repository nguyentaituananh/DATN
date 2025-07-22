import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Home,
  Send,
  MessageCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={18} />, color: 'hover:text-blue-600 hover:bg-blue-50', label: 'Facebook' },
    { icon: <Instagram size={18} />, color: 'hover:text-pink-600 hover:bg-pink-50', label: 'Instagram' },
    { icon: <Twitter size={18} />, color: 'hover:text-blue-400 hover:bg-blue-50', label: 'Twitter' },
    { icon: <Youtube size={18} />, color: 'hover:text-red-600 hover:bg-red-50', label: 'YouTube' },
    { icon: <Linkedin size={18} />, color: 'hover:text-blue-700 hover:bg-blue-50', label: 'LinkedIn' },
  ]

  const productCategories = [
    'Tất cả sản phẩm', 'Sofa', 'Bàn', 'Ghế', 'Giường', 'Tủ', 'Đèn', 'Phụ kiện'
  ]

  const customerService = [
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Vận chuyển & Giao hàng', path: '/shipping' },
    { name: 'Đổi trả & Hoàn tiền', path: '/returns' },
    { name: 'Câu hỏi thường gặp', path: '/faq' },
    { name: 'Hướng dẫn mua hàng', path: '/guide' },
    { name: 'Chính sách bảo mật', path: '/privacy' },
    { name: 'Điều khoản & Điều kiện', path: '/terms' }
  ]

  return (
    <footer className="bg-gradient-to-br from-stone-50 to-stone-100 border-t border-stone-200 text-sm text-stone-600">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-xl shadow-lg">
              <Home className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-800">Eco Decore</h3>
              <p className="text-xs font-medium text-stone-500">Nội Thất Cao Cấp</p>
            </div>
          </div>
          <p className="leading-relaxed mb-6">
            Kiến tạo không gian sống đẳng cấp với nội thất cao cấp từ năm 2010.
            Chúng tôi mang đến những sản phẩm chất lượng với thiết kế tinh tế và dịch vụ tận tâm.
          </p>
          <div className="flex gap-3 flex-wrap">
            {socialLinks.map((social, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                className={`rounded-xl w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md transition-all ${social.color}`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Categories */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h4 className="text-stone-800 text-base font-semibold mb-4">Danh mục sản phẩm</h4>
          <ul className="space-y-2">
            {productCategories.map((cat) => (
              <motion.li key={cat} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="#" className="hover:text-amber-600 hover:pl-2 transition-all block">{cat}</Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h4 className="text-stone-800 text-base font-semibold mb-4">Hỗ trợ khách hàng</h4>
          <ul className="space-y-2">
            {customerService.map((item) => (
              <motion.li key={item.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to={item.path} className="hover:text-amber-600 hover:pl-2 transition-all block">{item.name}</Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h4 className="text-stone-800 text-base font-semibold mb-4">Thông tin liên hệ</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-amber-600 w-5 h-5 mt-1" />
              <p>123 Đường Nội Thất, Quận 1, TP.HCM</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-amber-600 w-5 h-5" />
              <p>(028) 1234-5678</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-amber-600 w-5 h-5" />
              <p>info@ecodecore.com</p>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="text-amber-600 w-5 h-5" />
              <p>Chat với chúng tôi</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 mt-12 rounded-2xl p-8 shadow-lg container mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-lg space-y-2">
            <h3 className="text-xl font-semibold text-stone-800">Đăng ký nhận tin</h3>
            <p className="text-stone-600 text-base">Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và ý tưởng trang trí nội thất mỗi tuần.</p>
            <div className="flex gap-4 text-sm text-stone-500">
              <span>✓ Không spam</span>
              <span>✓ Hủy đăng ký bất cứ lúc nào</span>
            </div>
          </div>
          <div className="w-full md:w-auto flex">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="px-4 py-3 rounded-l-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm w-full md:w-64"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-r-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span>Đăng ký</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="border-t border-stone-200 mt-12 pt-6 text-sm container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} Eco Decore. Đã đăng ký bản quyền.</p>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link to="/privacy" className="hover:text-amber-600">Chính sách bảo mật</Link>
          <Link to="/terms" className="hover:text-amber-600">Điều khoản sử dụng</Link>
          <Link to="/sitemap" className="hover:text-amber-600">Sơ đồ trang web</Link>
        </div>
      </div>

      {/* Credit */}
      <div className="text-center mt-8 pb-8 text-xs text-stone-400">
        Thiết kế bởi <span className="text-amber-600 font-medium">Eco Decore Design Team</span> với ❤️
      </div>
    </footer>
  )
}

export default Footer
