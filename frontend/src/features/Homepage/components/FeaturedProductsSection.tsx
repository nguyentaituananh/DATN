import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPublished } from '@/hooks/products/useProducts';
import type { IProduct } from '@/types/products';

const FeaturedProductsSection = () => {
    const navigate = useNavigate();
    const { data: productsData } = useGetAllPublished();

    const allProducts = productsData?.metadata || [];
    const featuredProducts = allProducts.slice(0, 4);

    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price);

    const getProductImage = (product: IProduct) => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400";
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Sản Phẩm Nổi Bật
                        <span className="block text-2xl md:text-3xl font-medium text-orange-600 mt-2">
                            Được Yêu Thích Nhất
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Khám phá những món đồ nội thất chất lượng cao với thiết kế tinh tế và tính năng vượt trội
                    </p>
                    <button
                        className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => navigate('/products')}
                    >
                        Xem tất cả sản phẩm <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
                            onClick={() => navigate(`/products/${product._id}`)}
                        >
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                <img
                                    src={getProductImage(product)}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <button
                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle add to favorites
                                    }}
                                >
                                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                                </button>

                                {/* Sale badge */}
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Hot
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating_average)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">(0 đánh giá)</span>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                            {formatPrice(product.price)}đ
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Thêm vào giỏ
                                </button>

                                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedProductsSection;
