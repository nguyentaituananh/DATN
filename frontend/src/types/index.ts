import type { LayoutType } from '@/constants/enum'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

// Route types
export interface ICustomRouteObjectParams {
	layout?: LayoutType
	protected?: boolean
}

export interface ICustomIndexRouteObject extends IndexRouteObject, ICustomRouteObjectParams {}

export type CustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'children'> &
	ICustomRouteObjectParams & {
		children?: (ICustomIndexRouteObject | CustomNonIndexRouteObject)[]
	}

export type CustomRouteConfig = ICustomIndexRouteObject | CustomNonIndexRouteObject

// Layout types
export interface LayoutProps {
	children: React.ReactNode
}

// Common component props
export interface BaseComponentProps {
	className?: string
	children?: React.ReactNode
}

export interface ISidebar {
	title: string
	url: string
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
	items?: ISidebar[]
}

export interface ISidebarItem {
	versions: string[]
	nav: ISidebar[]
}

export interface IResponseData<T> {
	message: string
	status: number
	metadata: T
}
