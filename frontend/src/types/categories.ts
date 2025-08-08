import type { IPaginationMetadata } from '@/types'

export interface ICategoryData {
	name: string
	description: string
	images?: string | null
}

export interface ICategory {
	_id: string
	name: string
	description: string
	parent_category_id?: string | null
	images?: string | null
	createdAt: string
	updatedAt: string
}

export interface ICategoriesResponse {
	categories: ICategory[]
	pagination: IPaginationMetadata
}
