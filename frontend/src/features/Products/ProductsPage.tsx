import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Home, Sofa, Bed, Table, Armchair, Lamp } from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  // Categories with furniture icons
  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: 24, icon: Home },
    { id: 'sofa', name: 'Sofa & Ghế', count: 8, icon: Sofa },
    { id: 'bed', name: 'Giường ngủ', count: 6, icon: Bed },
    { id: 'table', name: 'Bàn làm việc', count: 5, icon: Table },
    { id: 'Armchair', name: 'Ghế & Tủ', count: 3, icon: Armchair },
    { id: 'lighting', name: 'Đèn trang trí', count: 2, icon: Lamp }
  ];

  // Furniture products data
  const products = [
    { 
      id: 1, 
      name: 'Sofa Góc Hiện Đại', 
      category: 'sofa', 
      price: 15000000, 
      originalPrice: 18000000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
      rating: 4.2, 
      reviews: 124, 
      discount: 17 
    },
    { 
      id: 2, 
      name: 'Bàn Ăn Gỗ Sồi', 
      category: 'table', 
      price: 10500000, 
      originalPrice: 12000000,
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop', 
      rating: 4.5, 
      reviews: 89, 
      discount: 12 
    },
    { 
      id: 3, 
      name: 'Giường Ngủ Cao Cấp', 
      category: 'bed', 
      price: 22000000, 
      originalPrice: 26000000,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop', 
      rating: 4.7, 
      reviews: 156, 
      discount: 15 
    },
    { 
      id: 4, 
      name: 'Tủ Quần Áo 4 Cánh', 
      category: 'Armchair', 
      price: 17500000, 
      originalPrice: 20000000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
      rating: 4.4, 
      reviews: 73, 
      discount: 12 
    },
    { 
      id: 5, 
      name: 'Đèn Trang Trí Phòng Khách', 
      category: 'lighting', 
      price: 2800000, 
      originalPrice: 3500000,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop', 
      rating: 4.6, 
      reviews: 45, 
      discount: 20 
    },
    { 
      id: 6, 
      name: 'Ghế Làm Việc Ergonomic', 
      category: 'Armchair', 
      price: 4200000, 
      originalPrice: 5000000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
      rating: 4.3, 
      reviews: 67, 
      discount: 16 
    },
    { 
      id: 7, 
      name: 'Bàn Coffee Mặt Kính', 
      category: 'table', 
      price: 6800000, 
      originalPrice: 8000000,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', 
      rating: 4.5, 
      reviews: 92, 
      discount: 15 
    },
    { 
      id: 8, 
      name: 'Sofa Đơn Thư Giãn', 
      category: 'sofa', 
      price: 8900000, 
      originalPrice: 11000000,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop', 
      rating: 4.1, 
      reviews: 38, 
      discount: 19 
    },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
          <Heart size={16} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="mb-4">
          <div className="text-lg font-bold text-red-600 mb-1">
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={18} />
                Danh mục sản phẩm
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-sm ${
                        selectedCategory === category.id
                          ? 'bg-orange-50 text-orange-600 border border-orange-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={16} />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Khoảng giá</h3>
              <div className="space-y-3">
                {[
                  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
                  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
                  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
                  { label: 'Trên 20 triệu', min: 20000000, max: 50000000 }
                ].map((range, index) => (
                  <button
                    key={index}
                    onClick={() => setPriceRange([range.min, range.max])}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-gray-600 text-sm">
                  Hiển thị {filteredProducts.length} sản phẩm
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="name">Tên A-Z</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-200 rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Home size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500">Thử thay đổi bộ lọc để xem thêm sản phẩm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;