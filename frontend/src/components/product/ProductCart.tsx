import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Heart } from 'lucide-react';
import { Badge } from 'antd';

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
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 aspect-[4/3]">
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
          
          {/* Badge */}
          {isNew && (
            <div className="absolute top-3 left-3">
              <Badge.Ribbon text="New" color="#B45309" />
            </div>
          )}
          
          {isBestseller && !isNew && (
            <div className="absolute top-3 left-3">
              <Badge.Ribbon text="Bestseller" color="#047857" />
            </div>
          )}
          
          {/* Wishlist button */}
          <button 
            className="absolute top-3 right-3 rounded-full bg-white p-2 text-gray-900 shadow-md transition-all duration-300 hover:bg-amber-700 hover:text-white opacity-80 hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>
        </div>
        
        <div className="text-left">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">{shortDescription}</p>
          <div className="flex items-center">
            {salePrice ? (
              <>
                <span className="text-lg font-medium text-amber-800">${salePrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-900">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;