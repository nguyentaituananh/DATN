import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorDialog } from '@/components/ui/error-dialog';
import { useRemoveCartItem, useGetCartByUser, useUpdateCartItem, useOneGetCartItems } from '@/hooks/cart/useCart';
import { useCreateOrder } from '@/hooks/orders';
import { useValidateCoupon } from '@/hooks/coupon/useCoupon';
import { useAuth } from '@/hooks/accounts';
import { formatPrice } from '@/utils/format';
import type { ICoupon } from '@/types/coupons';
import type { ICartItem } from '@/types/cart';
import {
    CartItemsList,
    ShippingForm,
    OrderSummary,
    OrderConfirmationDialog,
    OrderPageLayout
} from './components';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const LoadingState: React.FC = () => (
    <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
        <div className="flex justify-end">
            <Skeleton className="h-12 w-32" />
        </div>
    </div>
);

const EmptyState: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm nhé!</p>
            <Button onClick={() => navigate('/products')}>Tiếp tục mua sắm</Button>
        </div>
    );
};

export const OrderPage: React.FC = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [unavailableProducts, setUnavailableProducts] = useState<string[]>([]);
    const [validatedCoupon, setValidatedCoupon] = useState<ICoupon | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);
    const [localCartItems, setLocalCartItems] = useState<ICartItem[]>([]);

    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: cartData, isLoading: isCartLoading } = useGetCartByUser();
    const cartId = cartData?.metadata?._id;
    const { data: cartItemsData, isLoading: isCartItemsLoading } = useOneGetCartItems(cartId);
    const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
    const { mutate: validateCoupon, isPending: isValidatingCoupon } = useValidateCoupon();
    const { mutate: updateCartItem } = useUpdateCartItem();
    const { mutate: removeCartItem } = useRemoveCartItem();

    useEffect(() => {
        if (cartItemsData) {
            setLocalCartItems(cartItemsData);
            const initialSelectedItems = new Set(cartItemsData.map((item: ICartItem) => item._id));
            setSelectedItems(initialSelectedItems);
        }
    }, [cartItemsData]);

    const handleItemSelect = (itemId: string, checked: boolean) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (checked) newSet.add(itemId);
            else newSet.delete(itemId);
            return newSet;
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(new Set(localCartItems.map((item: ICartItem) => item._id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
        updateCartItem({ productId: cartItemId, quantity: newQuantity });
    };

    const handleImmediateUpdateQuantity = (cartItemId: string, newQuantity: number) => {
        setLocalCartItems(prevItems =>
            prevItems.map(item =>
                item._id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (cartItemId: string) => {
        removeCartItem(cartItemId);
        setLocalCartItems(prevItems => prevItems.filter(item => item._id !== cartItemId));
    };

    const selectedCartItems = localCartItems.filter((item: ICartItem) => selectedItems.has(item._id));

    const handleValidateCoupon = () => {
        if (!couponCode.trim()) return;
        setValidatedCoupon(null);
        setCouponError(null);
        validateCoupon(couponCode.trim(), {
            onSuccess: (response) => {
                setValidatedCoupon(response.metadata);
                setCouponError(null);
            },
            onError: () => {
                setValidatedCoupon(null);
                setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn');
            }
        });
    };

    const handleCouponCodeChange = (code: string) => {
        setCouponCode(code);
        if (!code.trim()) {
            setValidatedCoupon(null);
            setCouponError(null);
        }
    };

    const calculateSubtotal = () => {
        return selectedCartItems.reduce((total, item) => {
            const product = typeof item.product_id === 'object' ? item.product_id : null;
            if (product) {
                return total + (Number(product.price) || 0) * item.quantity;
            }
            return total;
        }, 0);
    };

    const handleSubmitOrder = () => {
        if (selectedCartItems.length === 0 || !shippingAddress.trim()) {
            setErrorMessage('Vui lòng chọn sản phẩm và nhập địa chỉ giao hàng.');
            setShowErrorDialog(true);
            return;
        }
        setShowConfirmDialog(true);
    };

    const confirmOrder = () => {
        const orderData = {
            cart_item_ids: selectedCartItems.map((item: ICartItem) => item._id),
            shipping_address: shippingAddress,
            coupon_code: validatedCoupon?.code || undefined,
        };
        createOrder(orderData, {
            onSuccess: (data) => {
                setShowConfirmDialog(false);
                const orderCode = data?.metadata?.order_code;
                if (orderCode) {
                    navigate(`/order/${orderCode}`, { state: { isNewOrder: true } });
                }
            },
            onError: (error: any) => {
                setShowConfirmDialog(false);
                setErrorMessage(error?.response?.data?.message || 'Đã có lỗi xảy ra khi tạo đơn hàng.');
                setShowErrorDialog(true);
            }
        });
    };

    if (isCartLoading || isCartItemsLoading) {
        return <LoadingState />;
    }

    if (!user || !cartItemsData || cartItemsData.length === 0) {
        return <EmptyState />;
    }

    return (
        <OrderPageLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <CartItemsList
                        cartItems={localCartItems}
                        selectedItems={selectedItems}
                        onItemSelect={handleItemSelect}
                        onSelectAll={handleSelectAll}
                        onUpdateQuantity={handleUpdateQuantity}
                        onImmediateUpdateQuantity={handleImmediateUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        formatPrice={formatPrice}
                        calculateTotalPrice={calculateSubtotal}
                    />
                    <ShippingForm
                        shippingAddress={shippingAddress}
                        setShippingAddress={setShippingAddress}
                        couponCode={couponCode}
                        setCouponCode={handleCouponCodeChange}
                        onValidateCoupon={handleValidateCoupon}
                        isValidatingCoupon={isValidatingCoupon}
                        validatedCoupon={validatedCoupon}
                        couponError={couponError}
                    />
                </div>
                <div className="md:col-span-1">
                    <OrderSummary
                        totalPrice={calculateSubtotal()}
                        selectedItemsCount={selectedItems.size}
                        shippingAddress={shippingAddress}
                        isCreatingOrder={isCreatingOrder}
                        onSubmitOrder={handleSubmitOrder}
                        formatPrice={formatPrice}
                        validatedCoupon={validatedCoupon}
                    />
                </div>
            </div>
            <OrderConfirmationDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                selectedItemsCount={selectedItems.size}
                totalPrice={calculateSubtotal()}
                shippingAddress={shippingAddress}
                isCreatingOrder={isCreatingOrder}
                onConfirm={confirmOrder}
                formatPrice={formatPrice}
                validatedCoupon={validatedCoupon}
            />
            <ErrorDialog
                open={showErrorDialog}
                onOpenChange={setShowErrorDialog}
                title="Lỗi"
                description={errorMessage}
                unavailableProducts={unavailableProducts}
            />
        </OrderPageLayout>
    );
};

export default OrderPage;
