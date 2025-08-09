import { routes } from '@/constants/routes'
import type { ISidebarItem } from '@/types'
import { BookPlus, LayoutDashboard, PackageSearch, BadgeDollarSign, CircleUser, ScanBarcode } from 'lucide-react'

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
		},
		{
			title: 'Quản lý mã giảm giá',
			url: routes.couponManagement,
			icon: BadgeDollarSign
		},
		{
			title: 'Quản lý khách hàng',
			url: routes.customerManagement,
			icon: CircleUser
		},
		{
			title: 'Quản lý đơn hàng',
			url: routes.orderManagement,
			icon: ScanBarcode
		}
	]
}
