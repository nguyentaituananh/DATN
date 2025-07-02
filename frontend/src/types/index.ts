export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  colors: string[];
  materials: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}