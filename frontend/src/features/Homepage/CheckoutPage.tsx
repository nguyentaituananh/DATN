import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User,Home, Shield, Truck, CheckCircle, Clock, Package } from 'lucide-react';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Info
    fullName: '',
    phone: '',
    email: '',
    
    // Shipping Address
    address: '',
    ward: '',
    district: '',
    city: '',
    note: '',
    
    // Payment
    paymentMethod: 'cod',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Delivery
    deliveryMethod: 'standard',
    deliveryTime: 'morning'
  });

  const [orderItems] = useState([
    {
      id: 1,
      name: 'Sofa Góc Hiện Đại',
      price: 12500000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=80&fit=crop'
    },
    {
      id: 2,
      name: 'Bàn Ăn Gỗ Sồi',
      price: 8900000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=100&h=80&fit=crop'
    }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = formData.deliveryMethod === 'express' ? 300000 : 200000;
  const total = subtotal + shippingFee;

  const cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];
  const districts = ['Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên'];
  const wards = ['Phường Phúc Xá', 'Phường Trúc Bạch', 'Phường Vĩnh Phúc', 'Phường Cống Vị'];

  const steps = [
    { id: 1, title: 'Thông tin', icon: User },
    { id: 2, title: 'Thanh toán', icon: CreditCard },
    { id: 3, title: 'Xác nhận', icon: CheckCircle }
  ];

  const StepIndicator = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        {steps.map((stepItem, index) => {
          const IconComponent = stepItem.icon;
          return (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepItem.id 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <IconComponent size={18} />
                </div>
                <span className={`font-medium ${
                  step >= stepItem.id ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step > stepItem.id ? 'bg-orange-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const CustomerInfoStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <User className="text-orange-500" size={24} />
          Thông tin khách hàng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="0901234567"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <MapPin className="text-orange-500" size={24} />
          Địa chỉ giao hàng
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ chi tiết *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Số nhà, tên đường"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tỉnh/Thành phố *
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Chọn tỉnh/thành</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quận/Huyện *
              </label>
              <select
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phường/Xã *
              </label>
              <select
                value={formData.ward}
                onChange={(e) => handleInputChange('ward', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Chọn phường/xã</option>
                {wards.map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú thêm
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ghi chú cho đơn hàng (tùy chọn)"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Truck className="text-orange-500" size={24} />
          Phương thức giao hàng
        </h2>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="delivery"
              value="standard"
              checked={formData.deliveryMethod === 'standard'}
              onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
              className="text-orange-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Giao hàng tiêu chuẩn</span>
                <span className="text-gray-600">{formatPrice(200000)}</span>
              </div>
              <p className="text-sm text-gray-500">3-5 ngày làm việc</p>
            </div>
          </label>
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="delivery"
              value="express"
              checked={formData.deliveryMethod === 'express'}
              onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
              className="text-orange-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Giao hàng nhanh</span>
                <span className="text-gray-600">{formatPrice(300000)}</span>
              </div>
              <p className="text-sm text-gray-500">1-2 ngày làm việc</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <CreditCard className="text-orange-500" size={24} />
          Phương thức thanh toán
        </h2>
        
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-orange-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-3">
                <Package className="text-green-500" size={20} />
                <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Thanh toán bằng tiền mặt khi nhận hàng</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-orange-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-500" size={20} />
                <span className="font-medium">Thẻ tín dụng/ghi nợ</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Visa, Mastercard, JCB</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={formData.paymentMethod === 'bank'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-orange-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-3">
                <Home className="text-purple-500" size={20} />
                <span className="font-medium">Chuyển khoản ngân hàng</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Chuyển khoản qua ATM/Internet Banking</p>
            </div>
          </label>
        </div>

        {formData.paymentMethod === 'card' && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-medium text-gray-800 mb-4">Thông tin thẻ</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số thẻ *
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ thẻ *
                </label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="NGUYEN VAN A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MM/YY *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="12/25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === 'bank' && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
            <h3 className="font-medium text-gray-800 mb-3">Thông tin chuyển khoản</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Ngân hàng:</strong> Vietcombank</p>
              <p><strong>Số tài khoản:</strong> 0123456789</p>
              <p><strong>Chủ tài khoản:</strong> CÔNG TY ECODECOR</p>
              <p><strong>Nội dung:</strong> Thanh toán đơn hàng #12345</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const ConfirmationStep = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={24} />
          Xác nhận đơn hàng
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Thông tin khách hàng</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <p><strong>Họ tên:</strong> {formData.fullName}</p>
              <p><strong>Điện thoại:</strong> {formData.phone}</p>
              <p><strong>Email:</strong> {formData.email}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Địa chỉ giao hàng</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <p>{formData.address}</p>
              <p>{formData.ward}, {formData.district}, {formData.city}</p>
              {formData.note && <p><strong>Ghi chú:</strong> {formData.note}</p>}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Phương thức thanh toán</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <p>
                {formData.paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                {formData.paymentMethod === 'card' && 'Thẻ tín dụng/ghi nợ'}
                {formData.paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <Shield size={20} />
              <span className="font-medium">Cam kết của chúng tôi</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Giao hàng đúng thời gian cam kết</li>
              <li>• Sản phẩm chính hãng, chất lượng cao</li>
              <li>• Hỗ trợ đổi trả trong 30 ngày</li>
              <li>• Bảo hành theo chính sách nhà sản xuất</li>
            </ul>
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
            <span>Quay lại giỏ hàng</span>
          </button>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && <CustomerInfoStep />}
            {step === 2 && <PaymentStep />}
            {step === 3 && <ConfirmationStep />}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Quay lại
              </button>
              <button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    alert('Đặt hàng thành công!');
                  }
                }}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                {step === 3 ? 'Đặt hàng' : 'Tiếp tục'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Đơn hàng của bạn</h2>
              
              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">x{item.quantity}</span>
                        <span className="font-medium text-red-600">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 border-t pt-3">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <Clock size={16} />
                  <span className="font-medium text-sm">Dự kiến giao hàng</span>
                </div>
                <p className="text-blue-700 text-sm">
                  {formData.deliveryMethod === 'express' ? '1-2 ngày làm việc' : '3-5 ngày làm việc'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;