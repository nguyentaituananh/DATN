import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Typography, Divider, Row, Col } from 'antd';
import { 
  FacebookOutlined, 
  InstagramOutlined, 
  TwitterOutlined, 
  MailOutlined, 
  EnvironmentOutlined, 
  PhoneOutlined,
  HomeOutlined,
  SendOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FacebookOutlined />, color: 'hover:text-blue-600 hover:bg-blue-50', label: 'Facebook' },
    { icon: <InstagramOutlined />, color: 'hover:text-pink-600 hover:bg-pink-50', label: 'Instagram' },
    { icon: <TwitterOutlined />, color: 'hover:text-blue-400 hover:bg-blue-50', label: 'Twitter' },
    { icon: <YoutubeOutlined />, color: 'hover:text-red-600 hover:bg-red-50', label: 'YouTube' },
    { icon: <LinkedinOutlined />, color: 'hover:text-blue-700 hover:bg-blue-50', label: 'LinkedIn' },
  ];

  const productCategories = [
    'Tất cả sản phẩm', 'Sofa', 'Bàn', 'Ghế', 'Giường', 'Tủ', 'Đèn', 'Phụ kiện'
  ];

  const customerService = [
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Vận chuyển & Giao hàng', path: '/shipping' },
    { name: 'Đổi trả & Hoàn tiền', path: '/returns' },
    { name: 'Câu hỏi thường gặp', path: '/faq' },
    { name: 'Hướng dẫn mua hàng', path: '/guide' },
    { name: 'Chính sách bảo mật', path: '/privacy' },
    { name: 'Điều khoản & Điều kiện', path: '/terms' }
  ];

  return (
    <footer className="bg-gradient-to-br from-stone-50 to-stone-100 border-t border-stone-200">
      <div className="container mx-auto px-4 py-16">
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-xl shadow-lg"
                >
                  <HomeOutlined className="text-white text-xl" />
                </motion.div>
                <div>
                  <Title level={3} className="!mb-0 !text-stone-800 font-serif">Eco Decore</Title>
                  <Text className="text-stone-500 text-sm font-medium">Nội Thất Cao Cấp</Text>
                </div>
              </div>
              <Paragraph className="text-stone-600 !mb-6 leading-relaxed">
                Kiến tạo không gian sống đẳng cấp với nội thất cao cấp từ năm 2010. 
                Chúng tôi mang đến những sản phẩm chất lượng với thiết kế tinh tế và dịch vụ tận tâm.
              </Paragraph>
              <Space size="middle" wrap>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="text" 
                      icon={social.icon} 
                      className={`text-stone-600 ${social.color} rounded-xl w-12 h-12 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md`}
                      aria-label={social.label}
                    />
                  </motion.div>
                ))}
              </Space>
            </motion.div>
          </Col>

          {/* Product Categories */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <Title level={4} className="!text-stone-800 !mb-6">Danh mục sản phẩm</Title>
              <div className="space-y-3">
                {productCategories.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to="#" 
                      className="block text-stone-600 hover:text-amber-600 transition-colors duration-300 py-1 hover:pl-2 transition-all"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Title level={4} className="!text-stone-800 !mb-6">Hỗ trợ khách hàng</Title>
              <div className="space-y-3">
                {customerService.map((item, index) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      to={item.path} 
                      className="block text-stone-600 hover:text-amber-600 transition-colors duration-300 py-1 hover:pl-2 transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Title level={4} className="!text-stone-800 !mb-6">Thông tin liên hệ</Title>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors duration-300"
                >
                  <EnvironmentOutlined className="text-amber-600 text-lg mt-1" />
                  <Text className="text-stone-600 leading-relaxed">
                    123 Đường Nội Thất, Quận 1, TP.HCM
                  </Text>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors duration-300"
                >
                  <PhoneOutlined className="text-amber-600 text-lg" />
                  <Text className="text-stone-600 font-medium">(028) 1234-5678</Text>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors duration-300"
                >
                  <MailOutlined className="text-amber-600 text-lg" />
                  <Text className="text-stone-600 font-medium">info@ecodecore.com</Text>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors duration-300"
                >
                  <WechatOutlined className="text-amber-600 text-lg" />
                  <Text className="text-stone-600 font-medium">Chat với chúng tôi</Text>
                </motion.div>
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Newsletter */}
        <Divider className="my-12 border-stone-300" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg"
        >
          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} md={12}>
              <div className="space-y-4">
                <Title level={3} className="!text-stone-800 !mb-3">Đăng ký nhận tin</Title>
                <Paragraph className="text-stone-600 !mb-0 leading-relaxed text-lg">
                  Nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và ý tưởng trang trí nội thất mỗi tuần.
                </Paragraph>
                <div className="flex items-center space-x-2 text-stone-500 text-sm">
                  <span>✓ Không spam</span>
                  <span>✓ Hủy đăng ký bất cứ lúc nào</span>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space.Compact size="large" className="w-full">
                <Input
                  placeholder="Địa chỉ email của bạn"
                  className="rounded-l-xl border-amber-200 focus:border-amber-400 h-12"
                  size="large"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-r-xl px-8 shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                    size="large"
                  >
                    Đăng ký
                  </Button>
                </motion.div>
              </Space.Compact>
            </Col>
          </Row>
        </motion.div>

        {/* Bottom Section */}
        <Divider className="my-12 border-stone-300" />
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Text className="text-stone-500">
              &copy; {currentYear} Eco Decore. Đã đăng ký bản quyền. 
            </Text>
          </Col>
          <Col xs={24} md={12} className="text-right">
            <Space size="large" wrap>
              <Link to="/privacy" className="text-stone-500 hover:text-amber-600 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="text-stone-500 hover:text-amber-600 transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/sitemap" className="text-stone-500 hover:text-amber-600 transition-colors">
                Sơ đồ trang web
              </Link>
            </Space>
          </Col>
        </Row>

        {/* Design Credit */}
        <div className="text-center mt-8 pt-6 border-t border-stone-200">
          <Text className="text-stone-400 text-sm">
            Thiết kế bởi 
            <span className="text-amber-600 font-semibold ml-1">Eco Decore Design Team</span>
            {" "} với ❤️
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;