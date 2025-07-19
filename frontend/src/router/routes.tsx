import { routes } from '@/constants'
import { LayoutType } from '@/constants/enum'
import { CategoryManagerPage, DashboardPage, ProductManagerPage, HomePage } from '@/features'
import type { CustomRouteConfig } from '@/types'

export const routeConfigs: CustomRouteConfig[] = [
	{
		path: routes.home,
		element: <HomePage />,
		layout: LayoutType.DEFAULT
	},
	{
		path: routes.dashboard,
		element: <DashboardPage />,
		layout: LayoutType.DASHBOARD
	},
	{
		path: routes.categoryManagement,
		element: <CategoryManagerPage />,
		layout: LayoutType.DASHBOARD
	},
	{
		path: routes.productManagement,
		element: <ProductManagerPage />,
		layout: LayoutType.DASHBOARD
	}
]
