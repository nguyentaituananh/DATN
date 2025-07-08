import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Typography, Space, Carousel, Statistic } from 'antd';
import { motion } from "framer-motion";
import {
  ArrowRightOutlined,
  TruckOutlined,
  SafetyOutlined,
  SyncOutlined,
  CustomerServiceOutlined,
  StarFilled,
  PlayCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const heroBackgrounds = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
  "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
];

const textContent = [
  {
    heading: "Nâng Tầm Không Gian Sống",
    subheading: "Khám phá nội thất cao cấp kết hợp nghệ thuật thủ công tinh xảo và sự thoải mái bền vững cho ngôi nhà mơ ước của bạn.",
  },
  {
    heading: "Thiết Kế Ngôi Nhà Bạn Yêu Thích",
    subheading: "Khám phá nội thất vượt thời gian được chế tác với độ chính xác, vẻ đẹp và sự thoải mái cho không gian sống lý tưởng.",
  },
  {
    heading: "Cuộc Sống Sang Trọng Bắt Đầu Từ Đây",
    subheading: "Trải nghiệm nội thất sang trọng kết hợp chất lượng thủ công, thiết kế hiện đại và sự thoải mái bền vững.",
  },
  {
    heading: "Chế Tác Cho Mọi Góc Nhà",
    subheading: "Từ những góc nhỏ ấm cúng đến phòng khách rộng lớn, chúng tôi đều có giải pháp hoàn hảo.",
  },
];

const categories = [
  {
    name: "Sofa",
    image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
    link: "/products/sofas",
    description: "Bộ sưu tập sofa cao cấp",
    count: "120+ sản phẩm"
  },
  {
    name: "Bàn",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
    link: "/products/tables",
    description: "Bàn làm việc & ăn uống",
    count: "85+ sản phẩm"
  },
  {
    name: "Ghế",
    image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg",
    link: "/products/chairs",
    description: "Ghế ngồi ergonomic",
    count: "95+ sản phẩm"
  },
  {
    name: "Giường",
    image: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
    link: "/products/beds",
    description: "Giường ngủ thư giãn",
    count: "60+ sản phẩm"
  },
  {
    name: "Tủ",
    image: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg",
    link: "/products/cabinets",
    description: "Tủ lưu trữ thông minh",
    count: "75+ sản phẩm"
  },
  {
    name: "Đèn",
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    link: "/products/lighting",
    description: "Đèn trang trí hiện đại",
    count: "40+ sản phẩm"
  }
];

const features = [
  {
    icon: <TruckOutlined className="text-4xl text-amber-600" />,
    title: "Miễn Phí Vận Chuyển",
    description: "Miễn phí giao hàng cho đơn hàng trên 20 triệu đồng",
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    hoverColor: "hover:border-blue-300"
  },
  {
    icon: <SafetyOutlined className="text-4xl text-amber-600" />,
    title: "Bảo Hành 5 Năm",
    description: "Nội thất của chúng tôi được chế tác để tồn tại lâu dài",
    color: "from-green-50 to-green-100",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-300"
  },
  {
    icon: <SyncOutlined className="text-4xl text-amber-600" />,
    title: "Đổi Trả 30 Ngày",
    description: "Mua sắm với sự tự tin và an tâm tuyệt đối",
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    hoverColor: "hover:border-purple-300"
  },
  {
    icon: <CustomerServiceOutlined className="text-4xl text-amber-600" />,
    title: "Hỗ Trợ Chuyên Gia",
    description: "Đội ngũ tư vấn thiết kế luôn sẵn sàng hỗ trợ bạn",
    color: "from-orange-50 to-orange-100",
    borderColor: "border-orange-200",
    hoverColor: "hover:border-orange-300"
  }
];

const stats = [
  { title: "Khách Hàng Hài Lòng", value: 15000, suffix: "+" },
  { title: "Sản Phẩm Chất Lượng", value: 500, suffix: "+" },
  { title: "Năm Kinh Nghiệm", value: 15, suffix: "" },
  { title: "Showroom Toàn Quốc", value: 25, suffix: "+" }
];

const testimonials = [
  {
    name: "Nguyễn Thị Lan",
    role: "Khách hàng VIP",
    content: "Chất lượng sản phẩm tuyệt vời, thiết kế đẹp và dịch vụ khách hàng xuất sắc. Tôi rất hài lòng với việc mua sắm tại đây.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    name: "Trần Văn Minh",
    role: "Kiến trúc sư",
    content: "Eco Decore luôn là lựa chọn hàng đầu cho các dự án của tôi. Sản phẩm đa dạng, chất lượng cao và giao hàng đúng hẹn.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
  },
  {
    name: "Lê Thị Hương",
    role: "Chủ nhà",
    content: "Không gian nhà tôi trở nên sang trọng và ấm cúng hơn rất nhiều sau khi sử dụng nội thất từ Eco Decore.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  }
];

const HomePage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center">
        <div className="absolute inset-0">
          <Carousel 
            autoplay 
            autoplaySpeed={5000} 
            effect="fade" 
            dots={false}
            className="h-full"
          >
            {heroBackgrounds.map((bg, index) => (
              <div key={index} className="h-screen">
                <div 
                  className="h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${bg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-white">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="inline-block"
                >
                  <div className="bg-amber-600/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-2 mb-6">
                    <Text className="text-amber-300 font-semibold">✨ Bộ sưu tập mới 2024</Text>
                  </div>
                </motion.div>
                
                <Title level={1} className="!text-white !mb-0 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  {textContent[current]?.heading}
                </Title>
                <Paragraph className="!text-white/90 text-xl md:text-2xl leading-relaxed !mb-0 max-w-3xl">
                  {textContent[current]?.subheading}
                </Paragraph>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Space size="large" wrap className="mt-8">
                  <Link to="/products">
                    <Button 
                      type="primary" 
                      size="large" 
                      className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-xl px-10 py-6 h-auto text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-amber-700"
                      icon={<ArrowRightOutlined />}
                    >
                      Khám Phá Bộ Sưu Tập
                    </Button>
                  </Link>
                  <Button 
                    size="large" 
                    className="border-2 border-white/50 text-white hover:bg-white hover:text-stone-800 rounded-xl px-10 py-6 h-auto text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
                    icon={<PlayCircleOutlined />}
                  >
                    Xem Video Giới Thiệu
                  </Button>
                </Space>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Custom Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === current ? "w-12 bg-amber-500" : "w-3 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center text-white"
                >
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ 
                      color: 'white', 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold',
                      fontFamily: 'serif'
                    }}
                  />
                  <Text className="text-amber-100 text-lg font-medium">{stat.title}</Text>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-white to-stone-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Title level={2} className="!text-stone-800 font-serif !mb-4 text-4xl">Mua Sắm Theo Danh Mục</Title>
            <Paragraph className="text-stone-600 text-xl max-w-3xl mx-auto !mb-0 leading-relaxed">
              Duyệt qua bộ sưu tập nội thất cao cấp đa dạng của chúng tôi cho mọi không gian trong nhà
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {categories.map((category, index) => (
              <Col xs={24} sm={12} lg={8} xl={4} key={category.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={category.link}>
                    <Card
                      hoverable
                      className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden h-full"
                      cover={
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                              <Text className="text-stone-700 text-sm font-medium">{category.count}</Text>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center justify-between">
                              <div>
                                <Title level={4} className="!text-white !mb-1">{category.name}</Title>
                                <Text className="text-white/80 text-sm">{category.description}</Text>
                              </div>
                              <ArrowRightOutlined className="text-amber-400 text-lg transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Title level={2} className="!text-stone-800 font-serif !mb-4 text-4xl">Sản Phẩm Nổi Bật</Title>
            <Paragraph className="text-stone-600 text-xl max-w-3xl mx-auto !mb-12 leading-relaxed">
              Khám phá bộ sưu tập mới nhất của chúng tôi với những món nội thất cao cấp được yêu thích nhất
            </Paragraph>

            <Space size="large" wrap>
              <Link to="/products">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-xl px-10 py-6 h-auto text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  icon={<ArrowRightOutlined />}
                >
                  Xem Tất Cả Sản Phẩm
                </Button>
              </Link>
              <Button 
                size="large"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-xl px-10 py-6 h-auto text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Tư Vấn Thiết Kế
              </Button>
            </Space>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Title level={2} className="!text-stone-800 font-serif !mb-4 text-4xl">Tại Sao Chọn Chúng Tôi</Title>
            <Paragraph className="text-stone-600 text-xl max-w-3xl mx-auto !mb-0 leading-relaxed">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất với những ưu điểm vượt trội
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className={`text-center border-2 bg-gradient-to-br ${feature.color} ${feature.borderColor} ${feature.hoverColor} hover:shadow-2xl transition-all duration-500 rounded-2xl h-full hover:scale-105 group`}
                    bodyStyle={{ padding: '2.5rem' }}
                  >
                    <div className="flex justify-center mb-6">
                      <div className="bg-white p-5 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                    </div>
                    <Title level={4} className="!text-stone-800 !mb-4 text-xl">
                      {feature.title}
                    </Title>
                    <Paragraph className="!text-stone-600 !mb-0 leading-relaxed text-base">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Title level={2} className="!text-stone-800 font-serif !mb-4 text-4xl">Khách Hàng Nói Gì</Title>
            <Paragraph className="text-stone-600 text-xl max-w-3xl mx-auto !mb-0 leading-relaxed">
              Hàng nghìn khách hàng đã tin tưởng và hài lòng với sản phẩm của chúng tôi
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl h-full group">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center mb-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-amber-100"
                        />
                      </div>
                      <div className="flex justify-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarFilled key={i} className="text-amber-400 text-xl" />
                        ))}
                      </div>
                      <Paragraph className="!text-stone-600 italic text-lg leading-relaxed !mb-6">
                        "{testimonial.content}"
                      </Paragraph>
                      <div>
                        <Title level={5} className="!text-stone-800 !mb-1">{testimonial.name}</Title>
                        <Text className="text-stone-500">{testimonial.role}</Text>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Title level={2} className="!text-white font-serif !mb-6 text-4xl">
              Sẵn Sàng Biến Đổi Không Gian Của Bạn?
            </Title>
            <Paragraph className="!text-white/90 text-xl max-w-3xl mx-auto !mb-10 leading-relaxed">
              Hãy để chúng tôi giúp bạn tạo ra ngôi nhà mơ ước với những món nội thất cao cấp và dịch vụ tư vấn chuyên nghiệp
            </Paragraph>
            <Space size="large" wrap>
              <Link to="/contact">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-xl px-10 py-6 h-auto text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Liên Hệ Tư Vấn
                </Button>
              </Link>
              <Link to="/products">
                <Button 
                  size="large"
                  className="border-2 border-white text-white hover:bg-white hover:text-stone-800 rounded-xl px-10 py-6 h-auto text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  Xem Showroom
                </Button>
              </Link>
            </Space>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;