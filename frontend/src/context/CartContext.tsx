import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product, quantity: number, color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string, color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string, color: string, quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number, color: string) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 
    0
  );
  const shipping = items.length > 0 ? 15 : 0;
  const tax = subtotal * 0.1; // 10% tax
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
    case 'ADD_ITEM': {
      const { product, quantity, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.color === color
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        newItems = [...state.items, { product, quantity, color }];
      }

      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, color } = action.payload;
      const newItems = state.items.filter(
        item => !(item.product.id === productId && item.color === color)
      );

      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, color, quantity } = action.payload;
      const newItems = state.items.map(item => 
        item.product.id === productId && item.color === color
          ? { ...item, quantity }
          : item
      );

      return {
        ...state,
        items: newItems,
        ...calculateCartTotals(newItems)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product, quantity: number, color: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, color } });
  };

  const removeFromCart = (productId: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, color } });
  };

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
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
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};