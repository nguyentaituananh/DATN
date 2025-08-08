import React, { useMemo, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { HeartCrack } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetFavorites, useRemoveFavorite } from '@/hooks/favorites/useFavorites'
import { useAddToCart } from '@/hooks/cart/useCart'
import type { FavoriteProduct, IFavoriteItem } from '@/types/favorites'
import FavoriteCard from './components/FavoriteCard'

const transformToFavoriteProduct = (favoriteItem: IFavoriteItem): FavoriteProduct => ({
  id: favoriteItem.product_id._id,
  name: favoriteItem.product_id.name,
  price: favoriteItem.product_id.price,
  imageUrl: favoriteItem.product_id.images?.[0] || 'https://via.placeholder.com/150',
});


export const FavoritesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: favoritesData, isLoading } = useGetFavorites();
  const { mutate: removeFavorite } = useRemoveFavorite();
  const { mutate: addToCart } = useAddToCart();

  const handleRemoveFromFavorites = useCallback((productId: string) => {
    removeFavorite(productId);
  }, [removeFavorite]);

  const handleAddToCart = useCallback((productId: string) => {
    addToCart({ productId, quantity: 1 });
  }, [addToCart]);

  const favoriteProducts = useMemo(() => {
    if (!favoritesData?.metadata) return [];
    return favoritesData.metadata.map(transformToFavoriteProduct);
  }, [favoritesData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return favoriteProducts;
    }
    return favoriteProducts.filter((product: FavoriteProduct) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favoriteProducts, searchTerm]);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sản phẩm yêu thích của bạn</h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg shadow-sm">
          <HeartCrack className="w-20 h-20 text-gray-400 mb-6" />
          <p className="text-xl text-gray-600 font-medium mb-2">Bạn chưa có sản phẩm yêu thích nào.</p>
          <p className="text-gray-500 mb-6">Hãy khám phá các sản phẩm của chúng tôi và thêm những món đồ bạn thích!</p>
          <Button
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => window.location.href = '/products'}
          >
            Khám phá sản phẩm
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HeartCrack className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Tìm kiếm sản phẩm yêu thích..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-gray-500">
              {filteredData.length} sản phẩm
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredData.map((product) => (
              <FavoriteCard
                key={product.id}
                product={product}
                onRemove={handleRemoveFromFavorites}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredData.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy sản phẩm nào với từ khóa "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
