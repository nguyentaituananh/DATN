import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield, Tag } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sofa Góc Hiện Đại',
      price: 12500000,
      originalPrice: 15000000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      color: 'Xanh lá',
      size: 'L 200cm x W 150cm',
      discount: 17
    },
    {
      id: 2,
      name: 'Bàn Ăn Gỗ Sồi',
      price: 8900000,
      originalPrice: 10500000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=200&fit=crop',
      color: 'Nâu gỗ tự nhiên',
      size: '160cm x 80cm',
      discount: 15
    },
    {
      id: 3,
      name: 'Đèn Trang Trí Phòng Khách',
      price: 2800000,
      originalPrice: 3500000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
      color: 'Vàng ánh kim',
      size: 'Cao 45cm',
      discount: 20
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo({ code: 'SAVE10', discount: 10, amount: subtotal * 0.1 });
    } else if (promoCode.toLowerCase() === 'freeship') {
      setAppliedPromo({ code: 'FREESHIP', discount: 0, amount: shippingFee });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 10000000 ? 0 : 200000;
  const promoDiscount = appliedPromo ? appliedPromo.amount : 0;
  const total = subtotal + shippingFee - promoDiscount;

  const CartItem = ({ item }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex gap-4">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          {item.discount > 0 && (
            <div className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{item.discount}%
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <p>Màu sắc: <span className="font-medium">{item.color}</span></p>
            <p>Kích thước: <span className="font-medium">{item.size}</span></p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus size={14} />
              </button>
              <span className="font-medium text-lg min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="text-right">
              {item.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(item.originalPrice * item.quantity)}
                </div>
              )}
              <div className="text-xl font-bold text-red-600">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
            <span>Tiếp tục mua sắm</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <ShoppingBag className="text-orange-500" size={28} />
                Giỏ hàng của bạn ({cartItems.length} sản phẩm)
              </h1>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Tag className="text-orange-500" size={20} />
                Mã giảm giá
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  Áp dụng
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✓ Đã áp dụng mã <strong>{appliedPromo.code}</strong> - Tiết kiệm {formatPrice(appliedPromo.amount)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá ({appliedPromo.code}):</span>
                    <span>-{formatPrice(appliedPromo.amount)}</span>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors mb-4 flex items-center justify-center gap-2">
                <CreditCard size={20} />
                Thanh toán ngay
              </button>

              {/* Trust badges */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="text-green-500" size={16} />
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="text-blue-500" size={16} />
                  <span>Miễn phí vận chuyển đơn từ 10 triệu</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Tag className="text-orange-500" size={16} />
                  <span>Đổi trả trong 30 ngày</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">Phương thức thanh toán:</p>
                <div className="flex gap-2">
                  <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div className="w-12 h-8 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div className="w-12 h-8 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">ATM</div>
                  <div className="w-12 h-8 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">COD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Có thể bạn quan tâm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={`https://images.unsplash.com/photo-${1555041469 + i}-a586c61ea9bc?w=300&h=200&fit=crop`}
                  alt="Sản phẩm"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Sản phẩm nội thất {i}</h3>
                  <div className="text-red-600 font-bold">{formatPrice(2000000 + i * 500000)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;