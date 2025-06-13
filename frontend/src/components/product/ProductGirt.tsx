import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCart';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  columns = 3 
}) => {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 md:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;