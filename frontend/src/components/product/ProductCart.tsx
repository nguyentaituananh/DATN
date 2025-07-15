import React from "react";
import { Product } from "../../types";
import { Heart } from "lucide-react";
import { Badge } from "antd";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const price =
    product.variants?.[0]?.discount_price ??
    product.variants?.[0]?.price ??
    product.salePrice ??
    product.price ??
    0;

  const oldPrice =
    product.variants?.[0]?.discount_price
      ? product.variants?.[0]?.price
      : product.price;

  return (
    <div className="group relative">
      <Link to={`/product/${product._id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4 aspect-[4/3]">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badge */}
          {product.isNew && (
            <Badge.Ribbon text="New" color="#B45309" className="absolute top-3 left-3" />
          )}
          {product.isBestseller && !product.isNew && (
            <Badge.Ribbon
              text="Bestseller"
              color="#047857"
              className="absolute top-3 left-3"
            />
          )}

          {/* Wishlist */}
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 rounded-full bg-white p-2 shadow hover:bg-amber-700 hover:text-white transition"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* Info */}
        <h3 className="text-lg font-medium mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-amber-800">
            {price.toLocaleString()} đ
          </span>
          {oldPrice && oldPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              {oldPrice.toLocaleString()} đ
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
