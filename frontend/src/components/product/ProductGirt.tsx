import React from "react";
import { Product } from "../../types";
import { Link } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 3 }) => {
  if (!products || products.length === 0) {
    return <p>Không có sản phẩm nào.</p>;
  }

  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {products.map((product) => {
        const price =
          product.variants?.[0]?.discount_price ??
          product.variants?.[0]?.price ??
          product.salePrice ??
          product.price ??
          0;

        const originalPrice =
          product.variants?.[0]?.price ?? product.price ?? 0;

        return (
          <div
            key={product._id} 
            className="border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white"
          >
            <Link to={`/product/${product._id}`}>
              <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                <img
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-amber-800">
                    {price.toLocaleString()} đ
                  </span>
                  {product.variants?.[0]?.discount_price && (
                    <span className="text-sm line-through text-gray-400">
                      {originalPrice.toLocaleString()} đ
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
