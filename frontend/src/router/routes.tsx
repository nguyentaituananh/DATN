import { routes } from '@/constants'
import { LayoutType } from '@/constants/enum'
import { CategoryManagerPage, DashboardPage, ProductManagerPage, HomePage, LoginPage, CartPage, CheckoutPage } from '@/features'
import UserProfilePage from '@/features/Auth/UserProfile'
import { DetailProduct, ProductsPage } from '@/features/Products'
import type { CustomRouteConfig } from '@/types'

export const routeConfigs: CustomRouteConfig[] = [
	{
		path: routes.home,
		element: <HomePage />,
		layout: LayoutType.DEFAULT,
		protected: true
	},
	{
		path: routes.login,
		element: <LoginPage />,
		layout: LayoutType.DEFAULT,
		protected: false
	},
	{
		path: routes.dashboard,
		element: <DashboardPage />,
		layout: LayoutType.DASHBOARD,
		protected: true
	},
	{
		path: routes.categoryManagement,
		element: <CategoryManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true
	},
	{
		path: routes.productManagement,
		element: <ProductManagerPage />,
		layout: LayoutType.DASHBOARD,
		protected: true
	},
	{path: '/products/:id',
         element: <DetailProduct />,
         layout: LayoutType.DEFAULT,
         protected: false
		},
	{path: '/profile',
         element: <UserProfilePage />,
         layout: LayoutType.DEFAULT,
         protected: false
		},
	{path: '/productsPage',
         element: <ProductsPage />,
         layout: LayoutType.DEFAULT,
         protected: false
		},
	{path: '/cartPage',
         element: <CartPage />,
         layout: LayoutType.DEFAULT,
         protected: false
		},
	{path: '/checkoutPage',
         element: <CheckoutPage />,
         layout: LayoutType.DEFAULT,
         protected: false
		},
]
