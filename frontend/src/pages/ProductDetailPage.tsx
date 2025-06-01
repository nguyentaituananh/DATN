import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Rate, InputNumber, Radio, message } from 'antd';
import { ShoppingBag, Heart, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ProductGrid from '../components/product/ProductGirt';

const { TabPane } = Tabs;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(id as string);
  const relatedProducts = getRelatedProducts(id as string);
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const {
    name,
    price,
    salePrice,
    description,
    images,
    features,
    dimensions,
    colors,
    materials,
    rating,
    reviews,
    inStock
  } = product as Product;

  const handleAddToCart = () => {
    if (!selectedColor) {
      message.warning('Please select a color');
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart(product, quantity, selectedColor);
      message.success(`${name} added to cart`);
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="lg:w-3/5">
            <div className="sticky top-24">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={images[activeImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-24 h-24 rounded overflow-hidden flex-shrink-0 ${
                      activeImage === index
                        ? 'ring-2 ring-amber-700'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-2/5">
            <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">{name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Rate disabled defaultValue={rating} allowHalf />
                <span className="ml-2 text-gray-500">{reviews} reviews</span>
              </div>
            </div>
            
            <div className="mb-6">
              {salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-medium text-amber-800">${salePrice.toFixed(2)}</span>
                  <span className="ml-3 text-lg text-gray-500 line-through">${price.toFixed(2)}</span>
                  <span className="ml-3 bg-amber-100 text-amber-800 px-2 py-1 text-sm font-medium rounded">
                    Save ${(price - salePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-medium text-gray-900">${price.toFixed(2)}</span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{description.split('.')[0]}.</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <Radio.Group value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {colors.map((color) => (
                  <Radio.Button key={color} value={color} className="mr-2 mb-2">
                    {color}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value as number)}
                className="w-32"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<ShoppingBag size={18} />}
                disabled={!inStock}
                isLoading={isAddingToCart}
                onClick={handleAddToCart}
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Heart size={18} />}
                className="flex-shrink-0"
              >
                Wishlist
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex">
                <Truck size={20} className="text-amber-700 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $999</p>
                </div>
              </div>
              <div className="flex">
                <RotateCcw size={20} className="text-amber-700 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-500">Shop with confidence</p>
                </div>
              </div>
              <div className="flex">
                <Shield size={20} className="text-amber-700 flex-shrink-0 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium">5-Year Warranty</h4>
                  <p className="text-sm text-gray-500">Durability guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultActiveKey="1" size="large">
            <TabPane
              tab={
                <span className="px-2 py-1 text-base">
                  Description
                </span>
              }
              key="1"
            >
              <div className="py-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-3">Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Star size={16} className="text-amber-700 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-3">Dimensions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-24 text-gray-600">Width:</span>
                        <span>{dimensions.width} cm</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24 text-gray-600">Height:</span>
                        <span>{dimensions.height} cm</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24 text-gray-600">Depth:</span>
                        <span>{dimensions.depth} cm</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-3">Materials</h3>
                    <ul className="space-y-2">
                      {materials.map((material, index) => (
                        <li key={index} className="flex items-center">
                          <Star size={16} className="text-amber-700 mr-2 flex-shrink-0" />
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span className="px-2 py-1 text-base">
                  Reviews ({reviews})
                </span>
              }
              key="2"
            >
              <div className="py-6">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <h3 className="text-3xl font-medium">{rating}</h3>
                    <div className="flex items-center">
                      <Rate disabled defaultValue={rating} allowHalf />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{reviews} reviews</p>
                  </div>
                  <div className="flex-grow">
                    {/* Rating distribution bars would go here in a real implementation */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-12">5 stars</span>
                        <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">75%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-12">4 stars</span>
                        <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">20%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-12">3 stars</span>
                        <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">5%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-12">2 stars</span>
                        <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">0%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-12">1 star</span>
                        <div className="flex-grow mx-2 bg-gray-200 h-2 rounded-full">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-500">0%</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button variant="outline">Write a Review</Button>
                  </div>
                </div>
                
                {/* Sample reviews - in a real app these would come from an API */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <img
                          src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <p className="text-sm text-gray-500">Verified Buyer</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Rate disabled defaultValue={5} />
                        <p className="text-sm text-gray-500">2 months ago</p>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">Absolute perfection!</h3>
                    <p className="text-gray-700">
                      I am absolutely in love with this piece! The quality is exceptional, and it fits perfectly in my living room. The color is exactly as shown in the photos, and it arrived well ahead of the estimated delivery date. Highly recommend!
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <img
                          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">Michael Chen</h4>
                          <p className="text-sm text-gray-500">Verified Buyer</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Rate disabled defaultValue={4.5} />
                        <p className="text-sm text-gray-500">3 weeks ago</p>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">Great quality, as described</h3>
                    <p className="text-gray-700">
                      The craftsmanship is excellent, and it looks even better in person than in the photos. Assembly was straightforward, and the included instructions were clear. Took off half a star because delivery was delayed by a few days, but customer service was responsive and helpful.
                    </p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span className="px-2 py-1 text-base">
                  Shipping & Returns
                </span>
              }
              key="3"
            >
              <div className="py-6">
                <h3 className="font-medium text-lg mb-4">Shipping Information</h3>
                <p className="mb-4">We offer the following shipping options for all orders:</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Standard Shipping (5-7 business days): $15.00</li>
                  <li>Expedited Shipping (3-5 business days): $25.00</li>
                  <li>Premium Shipping (1-2 business days): $35.00</li>
                  <li>Free shipping on all orders over $999</li>
                </ul>
                
                <h3 className="font-medium text-lg mb-4">Return Policy</h3>
                <p className="mb-4">We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.</p>
                <p className="mb-4">Please note the following conditions:</p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Items must be in their original condition and packaging</li>
                  <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
                  <li>Custom or personalized orders cannot be returned unless defective</li>
                  <li>Please contact our customer service team before initiating a return</li>
                </ul>
              </div>
            </TabPane>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <SectionHeading
            title="You May Also Like"
            subtitle="Explore more products that complement your style"
          />
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;