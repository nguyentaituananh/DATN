import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputNumber, Divider, Empty } from 'antd';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const { items= [], subtotal, shipping, tax, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, color: string, quantity: number) => {
    updateQuantity(productId, color, quantity);
  };

  const handleRemoveItem = (productId: string, color: string) => {
    removeFromCart(productId, color);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-medium mb-6">Giỏ hàng</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-500">Giỏ hàng của bạn trống</span>
              }
            >
            </Empty>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="hidden md:flex font-sans text-gray-500 pb-4 border-b">
                  <div className="w-1/2">Sản phẩm</div>
                  <div className="w-1/6 text-center">Giá</div>
                  <div className="w-1/6 text-center">Số lượng</div>
                  <div className="w-1/6 text-right">Tổng cộng</div>
                </div>

                {items.map((item) => (
                  <div key={`${item.product.id}-${item.color}`} className="py-6 border-b last:border-b-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                      {/* Product Info */}
                      <div className="w-full md:w-1/2 flex mb-4 md:mb-0">
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link to={`/product/${item.product.id}`} className="font-sans text-gray-800 hover:text-amber-700">
                            {item.product.name}
                          </Link>
                          <p className="text-gray-500 text-sm mt-1">Màu sắc: {item.color}</p>
                          <button
                            className="text-rose-600 text-sm mt-2 flex items-center md:hidden"
                            onClick={() => handleRemoveItem(item.product.id, item.color)}
                          >
                            <Trash2 size={14} className="mr-1" />
                            Xóa
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center mb-3 md:mb-0">
                        <span className="md:hidden text-gray-500">Giá:</span>
                        <span className="font-font-sans">
                          ${(item.product.salePrice || item.product.price).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center mb-3 md:mb-0">
                        <span className="md:hidden text-gray-500">Số lượng:</span>
                        <InputNumber
                          min={1}
                          max={10}
                          value={item.quantity}
                          onChange={(value) => handleQuantityChange(item.product.id, item.color, value as number)}
                          className="w-20"
                        />
                      </div>

                      {/* Total */}
                      <div className="w-full md:w-1/6 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-gray-500">Tổng cộng:</span>
                        <div className="flex items-center">
                          <span className="font-sans- text-amber-800">  
                            ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            className="text-gray-400 hover:text-rose-600 ml-4 hidden md:block"
                            onClick={() => handleRemoveItem(item.product.id, item.color)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between">
                  <Link to="/products">
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-sans mb-4">Tóm tắt đơn hàng
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="font-sans text-gray-600">
                    Tổng phụ</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-gray-600">Vận chuyển
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="font-sans flex justify-between">
                    <span className="text-gray-600">Thuế</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <Divider />
                <div className="flex justify-between font-sans text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span className="text-amber-800">${total.toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận</h3>
                  <div className="flex space-x-2">
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;