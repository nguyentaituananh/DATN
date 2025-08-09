import { LayoutDashboard, Package, Tickets, Settings, Box, ClipboardList, CircleUser } from 'lucide-react'
import { routes } from './routes'

export const SIDEBAR_LINKS = [
	{
		title: 'Dashboard',
		href: routes.dashboard,
		icon: LayoutDashboard
	},
	{
		title: 'Quản lý danh mục',
		href: routes.categoryManagement,
		icon: Box
	},
	{
		title: 'Quản lý sản phẩm',
		href: routes.productManagement,
		icon: Package
	},
	{
		title: 'Quản lý đơn hàng',
		href: routes.orderManagement,
		icon: ClipboardList
	},
	{
		title: 'Quản lý khách hàng',
		href: routes.customerManagement,
		icon: CircleUser
	},

	{
		title: 'Quản lý mã giảm giá',
		href: routes.couponManagement,
		icon: Tickets
	},
	{
		title: 'Cài đặt',
		href: '#',
		icon: Settings
	}
]
