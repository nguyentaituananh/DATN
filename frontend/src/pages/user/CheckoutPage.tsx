import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { Form, Input, Select, Checkbox, Steps, Radio, Divider, message } from 'antd';
import { CreditCard, ShoppingBag, Truck, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Address } from '../../types';

const { Option } = Select;
const { Step } = Steps;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { createOrder } = useOrders();
  // console.log(user);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'USA'
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'USA'
  });
  const [useShippingForBilling, setUseShippingForBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated && currentStep === 0) {
    return (
      <div className="py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">Vui lòng đăng nhập để Tiếp tục</h2>
            <p className="text-gray-600 mb-6">
Bạn cần phải đăng nhập để tiến hành quá trình thanh toán.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/login', { state: { returnTo: '/checkout' } })}
              >
Đăng nhập
</Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/register', { state: { returnTo: '/checkout' } })}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">
            Giỏ hàng của bạn trống</h2>
            <p className="text-gray-600 mb-6">
            Thêm một số sản phẩm vào giỏ hàng trước khi tiến hành thanh toán.
            </p>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<ShoppingBag size={18} />}
              onClick={() => navigate('/products')}
            >
              Duyệt sản phẩm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleShippingSubmit = (values: any) => {
    setShippingAddress(values);
    if (useShippingForBilling) {
      setBillingAddress(values);
    }
    nextStep();
  };

  const handleBillingSubmit = (values: any) => {
    setBillingAddress(values);
    nextStep();
  };

  const handlePaymentSubmit = async () => {
    setIsPlacingOrder(true);
    
    try {
      // In a real app, this would also handle payment processing
      await createOrder(
        items,
        shippingAddress,
        billingAddress,
        paymentMethod
      );
      notification.success({
      message: '🎉 Đặt hàng thành công!',
      description: 'Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.',
      placement: 'topRight',
      duration: 2,
    });

    setTimeout(() => {
      nextStep();
    }, 300);

    clearCart();
    nextStep();
  } catch (error) {
    notification.error({
      message: 'Đặt hàng thất bại',
      description: 'Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.',
    });
  } finally {
    setIsPlacingOrder(false);
  }
};

  const renderAddressForm = (
    type: 'shipping' | 'billing',
    initialValues: Address,
    onSubmit: (values: any) => void
  ) => {
    return (
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
        requiredMark={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="street"
            label="Địa chỉ thành phố"
            rules={[{ required: true, message: 'Please enter your street address' }]}
            className="md:col-span-2"
          >
            <Input placeholder="123 Example St." size="large" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Thành phố"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input placeholder="City" size="large" />
          </Form.Item>

          <Form.Item
            name="state"
            label="Thành Phố"
            rules={[{ required: true, message: 'Please select your state' }]}
          >
            <Select placeholder="Select state" size="large">
              <Option value="AL">Hà Nội</Option>
              <Option value="AK">Hồ Chí Minh</Option>
              <Option value="AZ">Thanh Hóa</Option>
              <Option value="CA">Hải Dương</Option>
              <Option value="CO">Thái Bình</Option>
              <Option value="FL">Nam Định</Option>
              <Option value="GA">Quảng Ninh</Option>
              <Option value="HI">Bình Dương</Option>
              <Option value="IL">Sông Lam Nghệ An</Option>
              <Option value="NY">Bắc Ninh</Option>
              <Option value="TX">Huế</Option>
              <Option value="WA">Hà Tĩnh</Option>
              {/* More states would be added in a real implementation */}
            </Select>
          </Form.Item>

          <Form.Item
            name="zipCode"
            label="Mã zip"
            rules={[{ required: true, message: 'Please enter your zip code' }]}
          >
            <Input placeholder="12345" size="large" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Quốc gia"
            rules={[{ required: true, message: 'Please select your country' }]}
          >
            <Select placeholder="Select country" size="large">
              <Option value="USA">United States</Option>
              <Option value="VN">Viet Nam</Option>
              {/* More countries would be added in a real implementation */}
            </Select>
          </Form.Item>
        </div>

        {type === 'shipping' && (
          <Form.Item className="mt-4">
            <Checkbox
              checked={useShippingForBilling}
              onChange={(e) => setUseShippingForBilling(e.target.checked)}
            >
              
Sử dụng địa chỉ giao hàng làm địa chỉ thanh toán
            </Checkbox>
          </Form.Item>
        )}

        <div className="flex justify-between mt-8">
          {type === 'billing' && (
            <Button variant="outline" onClick={prevStep}>
              Quay lại Vận chuyển
            </Button>
          )}
          <Button type="submit" variant="primary">
            {type === 'shipping' 
              ? useShippingForBilling ? 'Continue to Payment' : 'Continue to Billing'
              : 'Continue to Payment'}
          </Button>
        </div>
      </Form>
    );
  };

  const steps = [
    {
      title: 'Shipping',
      icon: <Truck size={20} />,
      content: renderAddressForm('shipping', shippingAddress, handleShippingSubmit)
    },
    {
      title: 'Billing',
      icon: <ShoppingBag size={20} />,
      content: useShippingForBilling 
        ? null // Skip billing step if using shipping address
        : renderAddressForm('billing', billingAddress, handleBillingSubmit)
    },
    {
      title: 'Payment',
      icon: <CreditCard size={20} />,
      content: (
        <div>
          <h3 className="font-medium-x text-lg mb-4">Phương thức thanh toán</h3>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="space-y-3 block"
          >
            <Radio value="credit_card" className="w-full p-3 border rounded-md mb-2">
              <div className="flex items-center">
                <CreditCard size={20} className="mr-2" />
                <span className='font-sans'>
                Thẻ tín dụng/ghi nợ</span>
              </div>
            </Radio>
            <Radio value="paypal" className="w-full p-3 border rounded-md mb-2">
              <div className="flex items-center">
                <span className='font-sans'>PayPal</span>
              </div>
            </Radio>
          </Radio.Group>

          {paymentMethod === 'credit_card' && (
            <div className="mt-6 bg-gray-50 p-4 rounded-md font-sans ">
              <Form layout="vertical">
                <Form.Item label="Số thẻ" required>
                  <Input placeholder="0000 0000 0000 0000" size="large" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item className='text-medium' label="Ngày hết hạn" required>
                    <Input placeholder="MM/YY" size="large" />
                  </Form.Item>
                  <Form.Item label="CVC" required>
                    <Input placeholder="CVC" size="large" />
                  </Form.Item>
                </div>
                <Form.Item label="Tên trên thẻ" required>
                  <Input placeholder="John Doe" size="large" />
                </Form.Item>
              </Form>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep}>
              {useShippingForBilling ? 'Quay lại mua hàng' : 'Back to Billing'}
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePaymentSubmit}
              isLoading={isPlacingOrder}
            >
              
Đặt hàng
            </Button>
          </div>
        </div>
      )
    },
    {
      title: 'Confirmation',
      icon: <Check size={20} />,
      content: (
        <div className="text-center py-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <Check size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-medium mb-4">Cảm ơn bạn đã đặt hàng!</h2>
          <p className="text-gray-600 mb-8">
          Đơn hàng của bạn đã được đặt thành công. Bạn sẽ sớm nhận được email xác nhận
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/account/orders')}
            >
              Xem đơn hàng
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      )
    }
  ];

  // Adjust current step for when shipping address is used as billing
  let adjustedStep = currentStep;
  if (useShippingForBilling && currentStep === 1) {
    adjustedStep = 2; // Skip billing step
  }
  
  // Create visible steps (hiding billing when using shipping address for billing)
  const visibleSteps = useShippingForBilling
    ? steps.filter((_, index) => index !== 1)
    : steps;

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-medium mb-8 text-center">Thanh toán</h1>
        
        <div className="mb-8">
          <Steps
            current={useShippingForBilling ? (currentStep > 0 ? currentStep - 1 : 0) : currentStep}
            labelPlacement="vertical"
          >
            {visibleSteps.map((step) => (
              <Step key={step.title} title={step.title} icon={step.icon} />
            ))}
          </Steps>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {visibleSteps[useShippingForBilling ? (currentStep > 0 ? currentStep - 1 : 0) : currentStep].content}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-medium-x mb-4">Tóm tắt đơn hàng</h2>
              
              <div className="mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.color}`} className="flex py-3 border-b last:border-b-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">Color: {item.color}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium">
                          ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Divider />
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Tổng phụ
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Mua sắm</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Thuế</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <Divider />
              
              <div className="flex justify-between font-medium-x text-lg mb-6">
                <span>Tổng cộng</span>
                <span className="text-amber-800">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;