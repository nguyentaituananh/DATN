import { routes } from '@/constants'
import { LayoutType } from '@/constants/enum'
import { CategoryManagerPage, DashboardPage, ProductManagerPage, HomePage, LoginPage } from '@/features'
import type { CustomRouteConfig } from '@/types'
import DetailProduct from '@/features/Homepage/DetailProduct'
export const routeConfigs: CustomRouteConfig[] = [
	{
		path: routes.home,
		element: <HomePage />,
		layout: LayoutType.DEFAULT,
		protected: false
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
         path: '/products/:id',
         element: <DetailProduct />,
         layout: LayoutType.DEFAULT,
         protected: false
}
]
