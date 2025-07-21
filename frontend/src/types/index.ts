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

export interface IModelProps {
	isOpen: boolean
	onClose: () => void
}

export interface IResponseData<T> {
	message: string
	status: number
	metadata: T
}

export interface IPaginationMetadata {
	page: number
	limit: number
	total: number
	pages: number
}

export interface IUploadResponse {
	url: string
	asset_id: string
	public_id: string
}

export interface IObjectFilter {
	isPublish?: boolean
	isDraft?: boolean
	[key: string]: string | boolean | undefined
}
