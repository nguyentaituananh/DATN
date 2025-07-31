import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  Award, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      title: "Phòng Khách Hiện Đại",
      subtitle: "Tạo không gian sống lý tưởng",
      description: "Khám phá bộ sưu tập sofa và bàn ghế cao cấp"
    },
    {
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
      title: "Phòng Ngủ Sang Trọng",
      subtitle: "Nghỉ ngơi trong không gian hoàn hảo",
      description: "Giường ngủ và tủ quần áo thiết kế độc đáo"
    },
    {
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200",
      title: "Phòng Ăn Ấm Cúng",
      subtitle: "Nơi gia đình sum họp",
      description: "Bàn ăn và ghế ngồi chất lượng cao"
    }
  ];

  const categories = [
    { name: "Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300", count: "120+ sản phẩm" },
    { name: "Bàn Ghế", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300", count: "85+ sản phẩm" },
    { name: "Giường Ngủ", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300", count: "95+ sản phẩm" },
    { name: "Tủ Kệ", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300", count: "150+ sản phẩm" },
    { name: "Đèn Trang Trí", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", count: "75+ sản phẩm" },
    { name: "Phụ Kiện", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300", count: "200+ sản phẩm" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Sofa Góc Hiện Đại",
      price: "12,500,000",
      originalPrice: "15,000,000",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      rating: 4.8,
      reviews: 124,
      discount: 17
    },
    {
      id: 2,
      name: "Bàn Ăn Gỗ Sồi",
      price: "8,900,000",
      originalPrice: "10,500,000",
      image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400",
      rating: 4.9,
      reviews: 89,
      discount: 15
    },
    {
      id: 3,
      name: "Giường Ngủ Cao Cấp",
      price: "18,200,000",
      originalPrice: "22,000,000",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
      rating: 4.7,
      reviews: 156,
      discount: 17
    },
    {
      id: 4,
      name: "Tủ Quần Áo 4 Cánh",
      price: "14,800,000",
      originalPrice: "17,500,000",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
      rating: 4.6,
      reviews: 73,
      discount: 15
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-6xl font-bold mb-4 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h2>
            <p className="text-2xl mb-2 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-orange-600 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
                Khám Phá Ngay
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all">
                Xem Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Miễn Phí Vận Chuyển</h3>
              <p className="text-gray-600">Giao hàng miễn phí cho đơn hàng trên 5 triệu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bảo Hành 5 Năm</h3>
              <p className="text-gray-600">Cam kết chất lượng với bảo hành dài hạn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chất Lượng Cao</h3>
              <p className="text-gray-600">Sản phẩm được chọn lọc kỹ càng từ các thương hiệu uy tín</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Danh Mục Sản Phẩm</h2>
            <p className="text-lg text-gray-600">Khám phá các sản phẩm nội thất chất lượng cao</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 text-center">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sản Phẩm Nổi Bật</h2>
              <p className="text-lg text-gray-600">Những món đồ nội thất được yêu thích nhất</p>
            </div>
            <button className="flex items-center text-orange-600 hover:text-red-600 font-semibold">
              Xem tất cả <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{product.price}đ</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}đ</span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-orange-600 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Đăng Ký Nhận Tin Khuyến Mãi</h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt qua email
          </p>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            />
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors">
              Đăng Ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;