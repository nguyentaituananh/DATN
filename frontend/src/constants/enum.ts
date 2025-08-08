export const LayoutType = {
	DEFAULT: 'default',
	DASHBOARD: 'dashboard'
} as const

export const RouteStatus = {
	PUBLIC: 'public',
	PRIVATE: 'private',
	PROTECTED: 'protected'
} as const

export const ThemeMode = {
	LIGHT: 'light',
	DARK: 'dark',
	SYSTEM: 'system'
} as const

export type LayoutType = (typeof LayoutType)[keyof typeof LayoutType]
export type RouteStatus = (typeof RouteStatus)[keyof typeof RouteStatus]
export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode]
