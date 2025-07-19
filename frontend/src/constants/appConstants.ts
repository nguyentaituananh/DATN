import { routes } from '@/constants/routes'
import type { ISidebarItem } from '@/types'
import { BookPlus, LayoutDashboard, PackageSearch } from 'lucide-react'

export const appSidebar: ISidebarItem = {
	versions: ['1.0.1'],
	nav: [
		{
			title: 'Dashboard',
			url: routes.dashboard,
			icon: LayoutDashboard
		},
		{
			title: 'Quản lý danh mục',
			url: routes.categoryManagement,
			icon: BookPlus
		},
		{
			title: 'Quản lý sản phẩm',
			url: routes.productManagement,
			icon: PackageSearch
		}
	]
}
