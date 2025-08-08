import { routes } from '@/constants'
import { LayoutType } from '@/constants/enum'
import {
	CategoryManagerPage,
	DashboardPage,
	ProductManagerPage,
	HomePage,
	LoginPage,
	OrderPage,
	FavoritesPage,
	CollectionsPage,
	AboutPage,
	OrderManagerPage,
} from '@/features'
import CustomerManagerPage from '@/features/CustomerManager/CustomerManagerPage'
import UserProfilePage from '@/features/Auth/UserProfile'
import CouponManagerPage from '@/features/CouponManager/CouponManagerPage'
import { DetailProduct, ProductsPage } from '@/features/Products'
import { OrderDetailPage } from '@/features/OrderManager/OrderDetailPage'
import type { CustomRouteConfig } from '@/types'

export const routeConfigs: CustomRouteConfig[] = [
	{
		path: routes.home,
		element: <HomePage />,
		layout: LayoutType.DEFAULT,
		protected: true,
	},
	{
		path: routes.login,
		element: <LoginPage />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
	{
		path: routes.dashboard,
		element: <DashboardPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.categoryManagement,
		element: <CategoryManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.productManagement,
		element: <ProductManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.couponManagement,
		element: <CouponManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.customerManagement,
		element: <CustomerManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.orderManagement,
		element: <OrderManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: routes.orderDetail,
		element: <OrderDetailPage />,
		layout: LayoutType.DASHBOARD,
		protected: true,
	},
	{
		path: '/product/:id',
		element: <DetailProduct />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
	{
		path: '/profile',
		element: <UserProfilePage />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
	{
		path: '/products',
		element: <ProductsPage />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
	{
		path: '/order',
		element: <OrderPage />,
		layout: LayoutType.DEFAULT,
		protected: true,
	},
	{
		path: '/order/:orderCode',
		element: <OrderDetailPage />,
		layout: LayoutType.DEFAULT,
		protected: true,
	},
	{
		path: '/favorites',
		element: <FavoritesPage />,
		layout: LayoutType.DEFAULT,
		protected: true,
	},
	{
		path: '/collections',
		element: <CollectionsPage />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
	{
		path: '/about',
		element: <AboutPage />,
		layout: LayoutType.DEFAULT,
		protected: false,
	},
]
