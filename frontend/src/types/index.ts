<<<<<<< HEAD
export interface ProductVariant {
  _id: string;
  sku: string;
  price: number;
  discount_price?: number;
  stock_quantity: number;
  attributes?: {
    color?: string;
    material?: string;
  };
  images?: string[];
  is_active?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category_id?: { _id: string; name: string } | string;
  price?: number;
  salePrice?: number;
  images: string[];
  features?: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  colors?: string[];
  materials?: string[];
  inStock?: boolean;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  variants?: ProductVariant[];
}

export interface FetchProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string;
  materials?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface FetchProductsResponse {
  total: number;
  page: number;
  limit: number;
  data: Product[];
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
  role: 'Customer' | 'Admin';
  createdAt: string;
  is_active: boolean;
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

export interface Store {
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  mapEmbedUrl: string;
}
=======
import type { LayoutType } from '@/constants/enum'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

// Route types
export interface ICustomRouteObjectParams {
	layout?: LayoutType
}

export interface ICustomIndexRouteObject extends IndexRouteObject, ICustomRouteObjectParams {}

export type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
	ICustomRouteObjectParams & {
		children?: (ICustomIndexRouteObject | CustomNonIndexRouteObject)[]
	}

export type CustomRouteConfig = ICustomIndexRouteObject | CustomNonIndexRouteObject

// Layout types
export interface LayoutProps {
	children: React.ReactNode
}

// Common component props
export interface BaseComponentProps {
	className?: string
	children?: React.ReactNode
}

export interface ISidebar {
	title: string
	url: string
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
	items?: ISidebar[]
}

export interface ISidebarItem {
	versions: string[]
	nav: ISidebar[]
}
>>>>>>> tuananh
