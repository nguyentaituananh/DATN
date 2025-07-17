import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variantName: string;
  variantSku: string;
  variantAttributes: {
    size?: string;
    color?: string;
    dimensions?: string;
    [key: string]: string | undefined;
  };
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      let updatedItems = [...state.items];
      if (existingIndex !== -1) {
        updatedItems[existingIndex].quantity += newItem.quantity;
      } else {
        updatedItems.push(newItem);
      }

      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, variantId } = action.payload;
      const updatedItems = state.items.filter(
        item => !(item.productId === productId && item.variantId === variantId)
      );
      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantId, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        ...calculateCartTotals(updatedItems),
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
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } });
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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
