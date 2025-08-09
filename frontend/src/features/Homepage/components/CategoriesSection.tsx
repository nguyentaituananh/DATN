import { useNavigate } from 'react-router-dom';
import { useGetCategories } from '@/hooks/categories/useCategory';
import { useGetAllPublished } from '@/hooks/products/useProducts';
import type { ICategory } from '@/types/categories';

import placeholderImage from '@/assets/images/placeholder-image.png';

const CategoriesSection = () => {
    const navigate = useNavigate();
    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories();
    const { data: productsData } = useGetAllPublished();

    const categories = categoriesData?.metadata?.categories || [];
    const allProducts = productsData?.metadata || [];

    const getCategoryImage = (category: ICategory) => {
        return category.images ?? placeholderImage;
    };


    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Danh Mục Sản Phẩm
                        <span className="block text-2xl md:text-3xl font-medium text-blue-600 mt-2">
                            Nội Thất Chất Lượng
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Khám phá bộ sưu tập nội thất đa dạng với thiết kế hiện đại và chất lượng vượt trội
                    </p>
                </div>

                {categoriesLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="animate-pulse bg-white rounded-2xl p-4 shadow-lg">
                                <div className="bg-gray-300 h-40 rounded-xl mb-4"></div>
                                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                                <div className="bg-gray-300 h-3 rounded w-3/4 mx-auto"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {categories.map((category) => {
                            const categoryProductCount = allProducts.filter(p => p.category_id._id === category._id).length;
                            return (
                                <div
                                    key={category._id}
                                    className="group cursor-pointer bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                                    onClick={() => navigate(`/products?category=${category._id}`)}
                                >
                                    <div className="relative overflow-hidden rounded-xl mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                        <img
                                            src={getCategoryImage(category)}
                                            alt={category.name}
                                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-xs font-medium text-gray-700">{categoryProductCount}</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {categoryProductCount} sản phẩm
                                        </p>
                                    </div>
                                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoriesSection;
