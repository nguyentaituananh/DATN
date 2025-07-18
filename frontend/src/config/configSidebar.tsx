import { FaCog } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { routes } from '@/constants'

export interface configItemSidebar {
	path: string
	title: string
	isHeader?: boolean
	icon?: IconType
	isDisabled?: boolean
}

export interface configSidebarType extends configItemSidebar {
	children?: configItemSidebar[]
}

export const configSidebar: configSidebarType[] = [
	{
		path: routes.dashboard,
		title: 'Vận hành',
		icon: FaCog
	}
]
