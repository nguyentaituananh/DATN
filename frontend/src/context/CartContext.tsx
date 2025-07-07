import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge, Button, Typography } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Text, Title } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  shortDescription: string;
  images: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id,
    name,
    price,
    salePrice,
    shortDescription,
    images,
    isNew,
    isBestseller
  } = product;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card
        hoverable
        className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden h-full"
        cover={
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4">
              {isNew && (
                <Badge.Ribbon text="Mới" color="#d97706" className="font-semibold" />
              )}
              {isBestseller && !isNew && (
                <Badge.Ribbon text="Bán Chạy" color="#059669" className="font-semibold" />
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <Button 
                type="text"
                icon={<HeartOutlined />}
                className="bg-white/90 backdrop-blur-sm text-stone-600 hover:text-red-500 hover:bg-white rounded-xl w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Add to wishlist"
              />
              <Button 
                type="text"
                icon={<ShoppingCartOutlined />}
                className="bg-white/90 backdrop-blur-sm text-stone-600 hover:text-amber-600 hover:bg-white rounded-xl w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Add to cart"
              />
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Link to={`/product/${id}`}>
                <Button 
                  type="primary"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 border-0 rounded-xl px-6 py-2 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Xem Chi Tiết
                </Button>
              </Link>
            </div>
          </div>
        }
        bodyStyle={{ padding: '1.5rem' }}
      >
        <Link to={`/product/${id}`} className="block">
          <div className="space-y-3">
            <Title level={4} className="!text-stone-800 !mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
              {name}
            </Title>
            <Text className="text-stone-500 text-sm leading-relaxed line-clamp-2">
              {shortDescription}
            </Text>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                {salePrice ? (
                  <>
                    <Text className="text-xl font-bold text-amber-600">
                      {salePrice.toLocaleString('vi-VN')}đ
                    </Text>
                    <Text className="text-sm text-stone-400 line-through">
                      {price.toLocaleString('vi-VN')}đ
                    </Text>
                  </>
                ) : (
                  <Text className="text-xl font-bold text-stone-800">
                    {price.toLocaleString('vi-VN')}đ
                  </Text>
                )}
              </div>
              {salePrice && (
                <div className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-semibold">
                  -{Math.round(((price - salePrice) / price) * 100)}%
                </div>
              )}
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ProductCard;