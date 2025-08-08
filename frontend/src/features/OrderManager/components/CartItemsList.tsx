
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { ICartItem } from '@/types/cart';
import { QuantityInput } from './QuantityInput';

interface CartItemsListProps {
    cartItems: ICartItem[];
    selectedItems: Set<string>;
    onItemSelect: (itemId: string, checked: boolean) => void;
    onSelectAll: (checked: boolean) => void;
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    formatPrice: (price: number) => string;
    calculateTotalPrice: () => number;
    onImmediateUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

export const CartItemsList: React.FC<CartItemsListProps> = ({
    cartItems,
    selectedItems,
    onItemSelect,
    onSelectAll,
    onUpdateQuantity,
    onRemoveItem,
    formatPrice,
    calculateTotalPrice,
    onImmediateUpdateQuantity,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 pb-2 border-b">
                            <Checkbox
                                checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                                onCheckedChange={(checked) => onSelectAll(!!checked)}
                            />
                            <label className="text-sm font-medium">Chọn tất cả ({cartItems.length} sản phẩm)</label>
                        </div>

                        {cartItems.map((item) => {
                            const product = typeof item.product_id === 'object' ? item.product_id : null;
                            if (!product) return null;

                            const maxQuantity = product.quantity || 1;

                            return (
                                <div key={item._id} className="flex items-start space-x-3 border-b pb-4">
                                    <Checkbox
                                        className="mt-2"
                                        checked={selectedItems.has(item._id)}
                                        onCheckedChange={(checked) => onItemSelect(item._id, !!checked)}
                                    />
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium">{product.name}</h3>
                                            <p className="text-sm text-gray-600">{formatPrice(Number(product.price))}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <QuantityInput
                                                initialValue={item.quantity}
                                                maxValue={maxQuantity}
                                                onUpdate={(newQuantity) => onUpdateQuantity(item._id, newQuantity)}
                                                onImmediateUpdate={(newQuantity) => onImmediateUpdateQuantity(item._id, newQuantity)}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-500 hover:text-red-500"
                                                onClick={() => onRemoveItem(item._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="w-32 text-right font-semibold text-lg">
                                        {formatPrice(Number(product.price) * item.quantity)}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex justify-between items-center pt-4 font-bold text-lg">
                            <span>Tổng cộng ({selectedItems.size} sản phẩm):</span>
                            <span>{formatPrice(calculateTotalPrice())}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CartItemsList;
