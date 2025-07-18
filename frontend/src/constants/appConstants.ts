import { routes } from '@/constants/routes'
import type { ISidebarItem } from '@/types'
import { LayoutDashboard } from 'lucide-react'

export const appSidebar: ISidebarItem = {
	versions: ['1.0.1'],
	nav: [
		{
			title: 'Dashboard',
			url: routes.dashboard,
			icon: LayoutDashboard
		}
	]
}
