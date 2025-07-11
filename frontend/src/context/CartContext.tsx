import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';
import {
  addToCartApi,
  removeCartItemApi,
  updateCartItemApi,
  getCart,
  clearCartApi
} from '../api/cartApi';

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, color: string) => Promise<void>;
  removeFromCart: (productId: string, color: string) => Promise<void>;
  updateQuantity: (productId: string, color: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 15 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
};

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        ...calculateCartTotals(action.payload)
      };

    case 'ADD_ITEM': {
      const { product, quantity, color } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.product.id === product.id && item.color === color
      );
      const newItems = [...state.items];

      if (existingIndex >= 0) {
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems.push({ product, quantity, color });
      }

      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems)
      };
    }

    case 'REMOVE_ITEM':
      const { productId, color } = action.payload;
      const filteredItems = state.items.filter(
        item => !(item.product.id === productId && item.color === color)
      );
      return {
        ...state,
        items: filteredItems,
        ...calculateCartTotals(filteredItems)
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.productId && item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems)
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const response = await getCart(userId);
        const data = response.data;

        // map data into CartItem[] format
        const cartItems: CartItem[] = data.map((item: any) => ({
          product: item.product, // ensure populated in backend or fetch separately
          quantity: item.quantity,
          color: item.color || 'default'
        }));

        dispatch({ type: 'SET_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to fetch cart from server:', error);
      }
    };

    fetchCart();
  }, [userId]);

  const addToCart = async (product: Product, quantity: number, color: string) => {
    if (!userId) return;

    try {
      await addToCartApi({
        user_id: userId,
        product_id: product.id,
        quantity
      });

      dispatch({ type: 'ADD_ITEM', payload: { product, quantity, color } });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = async (productId: string, color: string) => {
    if (!userId) return;

    try {
      await removeCartItemApi(userId, productId);
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, color } });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, color: string, quantity: number) => {
    if (!userId) return;

    try {
      await updateCartItemApi(userId, productId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, quantity } });
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    try {
      await clearCartApi(userId);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
