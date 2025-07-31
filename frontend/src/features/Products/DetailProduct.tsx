import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, Share2, Minus, Plus, Shield, Truck, RefreshCw, Star } from 'lucide-react';
import type { IProduct } from '../../types/products';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tab, setTab] = useState<"details" | "warranty">("details");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        const data = response.data.metadata;
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-4xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-4xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-600">Trang chủ</a>
            <span>/</span>
            <a href="/products" className="hover:text-orange-600">Sản phẩm</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* LEFT: Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative group">
                <img
                  src={selectedImage || '/default-image.jpg'}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`flex-shrink-0 w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                      selectedImage === img 
                        ? 'ring-4 ring-orange-600 ring-opacity-50 scale-105' 
                        : 'hover:scale-105 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.8)</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">156 đánh giá</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl font-bold text-orange-600">
                    {Number(product.price).toLocaleString('vi-VN')}₫
                  </span>
                  {product.discount_price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {Number(product.discount_price).toLocaleString('vi-VN')}₫
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{Math.round((1 - product.price / product.discount_price) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-600 text-sm">Giá đã bao gồm VAT</p>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm block">Vật liệu</span>
                  <span className="font-semibold text-gray-900">{product.material}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-gray-500 text-sm block">Kích thước</span>
                  <span className="font-semibold text-gray-900">{product.size}</span>
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Danh mục:</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category_name || product.category_id}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold">Số lượng:</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-600">sản phẩm có sẵn</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button className="flex-1 bg-orange-600 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors transform hover:scale-105">
                    MUA NGAY
                  </button>
                  <button
                    onClick={() => alert('Đã thêm vào giỏ hàng!')}
                    className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>THÊM VÀO GIỎ</span>
                  </button>
                </div>

                {/* Member Offer */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">%</span>
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Ưu đãi thành viên</p>
                        <p className="text-green-700 text-sm">Giảm 5% khi đăng ký thành viên</p>
                      </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      ĐĂNG KÝ
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Miễn phí vận chuyển</p>
                    <p className="text-xs text-gray-600">Đơn hàng lớn hơn 5 triệu</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Bảo hành 1 năm</p>
                    <p className="text-xs text-gray-600">Chính hãng</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Đổi trả 7 ngày</p>
                    <p className="text-xs text-gray-600">Miễn phí</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200 p-8">
            <div className="max-w-4xl">
              {/* Tab Navigation */}
              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                <button
                  className={`pb-4 px-2 font-semibold text-lg transition-colors relative ${
                    tab === "details"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setTab("details")}
                >
                  Chi tiết sản phẩm
                </button>
                <button
                  className={`pb-4 px-2 font-semibold text-lg transition-colors relative ${
                    tab === "warranty"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setTab("warranty")}
                >
                  Chính sách bảo hành
                </button>
              </div>

              {/* Tab Content */}
              <div className="prose prose-gray max-w-none">
                {tab === "details" ? (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-gray-700 leading-7 space-y-4">
                      <p>
                        Các sản phẩm nội thất tại chúng tôi đa số đều được sản xuất tại nhà
                        máy của công ty cổ phần xây dựng kiến trúc AA với đội ngũ nhân viên
                        và công nhân ưu tú cùng cơ sở vật chất hiện đại (
                        <a
                          href=""
                          target="_blank"
                          className="text-orange-600 hover:text-red-600 underline font-medium"
                          rel="noopener noreferrer"
                        >
                          Xem chi tiết nhà máy
                        </a>
                        ).
                      </p>
                      <p>
                        Chúng tôi đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm
                        hoàn thiện cuối cùng.
                      </p>
                      <p>
                        Chúng tôi bảo hành một năm cho các trường hợp có lỗi về kỹ thuật
                        trong quá trình sản xuất hay lắp đặt.
                      </p>
                      <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                        <p className="font-semibold text-orange-800 mb-1">Lưu ý quan trọng:</p>
                        <p>
                          Quý khách không nên tự sửa chữa mà hãy báo ngay cho chúng tôi qua
                          hotline: <strong className="text-orange-600">1800 7200</strong>.
                        </p>
                      </div>
                      <p>
                        Sau thời gian hết hạn bảo hành, nếu quý khách có bất kỳ yêu cầu hay
                        thắc mắc thì vui lòng liên hệ với chúng tôi để được hướng dẫn và giải
                        quyết các vấn đề gặp phải.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Chính sách bảo hành
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Sản phẩm được bảo hành chính hãng từ nhà cung cấp.</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Đổi trả trong 7 ngày nếu lỗi từ nhà sản xuất.</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>Vận chuyển toàn quốc, hỗ trợ lắp đặt nội thành TP.HCM.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Hotline hỗ trợ</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Tư vấn:</strong> 1800 7200</p>
                          <p><strong>Kỹ thuật:</strong> 1800 7201</p>
                          <p><strong>Email:</strong> support@furnihome.vn</p>
                          <p><strong>Thời gian:</strong> 8:00 - 18:00 (T2-T7)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;