import { createHashRouter } from 'react-router-dom'

import { LayoutType } from '@/constants/enum'
import type { CustomRouteConfig } from '@/types'
import { BaseLayout, DashboardLayout } from '@/layouts'
import LayoutChangeTitle from '@/context/LayoutChangeTitle'
import { routeConfigs } from '@/router/routes'

const checkLayout = (route: CustomRouteConfig): React.ReactNode => {
	if (route?.layout) {
		switch (route.layout) {
			case LayoutType.DASHBOARD:
				return (
					<LayoutChangeTitle>
						<DashboardLayout>{route.element}</DashboardLayout>
					</LayoutChangeTitle>
				)
			case LayoutType.DEFAULT:
			default:
				return null
		}
	}

	return (
		<LayoutChangeTitle>
			<BaseLayout>{route.element}</BaseLayout>
		</LayoutChangeTitle>
	)
}

const finalRoutes = routeConfigs.map((route) => {
	return {
		...route,
		element: checkLayout(route)
	}
})

const router = createHashRouter(finalRoutes)

export default router
