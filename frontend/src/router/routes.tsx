import { routes } from '@/constants'
import { LayoutType } from '@/constants/enum'
import { DashboardPage } from '@/features'
import type { CustomRouteConfig } from '@/types'

export const routeConfigs: CustomRouteConfig[] = [
	{
		path: routes.dashboard,
		element: <DashboardPage />,
		layout: LayoutType.DASHBOARD
	}
]
