import { createBrowserRouter } from 'react-router-dom'
import { LayoutType } from '@/constants/enum'
import type { CustomRouteConfig } from '@/types'
import { BaseLayout, DashboardLayout } from '@/layouts'
import LayoutChangeTitle from '@/context/LayoutChangeTitle'
import AuthGuard from '@/components/shared/AuthGuard'
import { routeConfigs } from '@/router/routes'

const checkLayout = (route: CustomRouteConfig): React.ReactNode => {
	const layoutContent = (() => {
		if (route?.layout) {
			switch (route.layout) {
				case LayoutType.DASHBOARD:
					return (
						<LayoutChangeTitle>
							<DashboardLayout>{route.element}</DashboardLayout>
						</LayoutChangeTitle>
					)
				case LayoutType.DEFAULT:
					return (
						<LayoutChangeTitle>
							<BaseLayout>{route.element}</BaseLayout>
						</LayoutChangeTitle>
					)
				default:
					return (
						<LayoutChangeTitle>
							<BaseLayout>{route.element}</BaseLayout>
						</LayoutChangeTitle>
					)
			}
		}

		return (
			<LayoutChangeTitle>
				<BaseLayout>{route.element}</BaseLayout>
			</LayoutChangeTitle>
		)
	})()

	const isProtected = route.protected !== false
	if (isProtected) {
		return <AuthGuard>{layoutContent}</AuthGuard>
	}

	return layoutContent
}

const finalRoutes = routeConfigs.map((route) => {
	return {
		path: route.path,
		element: checkLayout(route),
		...(route.index && { index: route.index })
	}
})

const router = createBrowserRouter(finalRoutes)

export default router
