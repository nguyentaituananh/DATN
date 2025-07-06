import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getCart,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
} from '../api/cartApi';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  fetchCart: () => void;
  addToCart: (product: Product, quantity: number, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, color: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [userId] = useState('1'); // hoặc lấy từ localStorage, token

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
      0
    );
    const shipping = items.length > 0 ? 15 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateTotals();

  const fetchCart = async () => {
  try {
    const res = await getCart(userId);
    const items = res.data?.items ?? [];
    setItems(
      items.map((item: any) => ({
        product: item.product_id,
        quantity: item.quantity,
        color: item.color || 'default',
      }))
    );
  } catch (err) {
    console.error('Lỗi fetch giỏ hàng:', err);
    setItems([]);  // fallback rỗng khi lỗi
  }
};


  const addToCart = async (product: Product, quantity: number, color: string) => {
    try {
      await addToCartApi({
        user_id: userId,
        product_id: product.id,
        quantity,
      });
      fetchCart();
    } catch (err) {
      console.error('Lỗi thêm giỏ hàng:', err);
    }
  };

  const updateQuantity = async (
    productId: string,
    color: string,
    quantity: number
  ) => {
    try {
      await updateCartItemApi(userId, productId, quantity);
      fetchCart();
    } catch (err) {
      console.error('Lỗi cập nhật số lượng:', err);
    }
  };

  const removeFromCart = async (productId: string, color: string) => {
    try {
      await removeCartItemApi(userId, productId);
      fetchCart();
    } catch (err) {
      console.error('Lỗi xóa sản phẩm:', err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi(userId);
      fetchCart();
    } catch (err) {
      console.error('Lỗi xóa toàn bộ giỏ:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        shipping,
        tax,
        total,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
