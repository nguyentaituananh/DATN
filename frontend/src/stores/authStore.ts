import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IUser } from '@/types/auth'

interface AuthState {
	user: IUser | null
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	setUser: (user: IUser | null) => void
	setAccessToken: (token: string | null) => void
	setRefreshToken: (token: string | null) => void
	setAuthenticated: (isAuthenticated: boolean) => void
	updateUser: (userData: Partial<IUser>) => void
	clearAuth: () => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			// Initial state
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,

			// Actions
			setUser: (user) => set({ user }),

			setAccessToken: (token) => set({ accessToken: token }),
			setRefreshToken: (token) => set({ refreshToken: token }),

			setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

			updateUser: (userData) => {
				const currentUser = get().user
				if (currentUser) {
					set({ user: { ...currentUser, ...userData } })
				}
			},

			clearAuth: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false
				}),
			logout: () => {
				get().clearAuth()
				set({ isAuthenticated: false })
			}
		}),
		{
			name: 'auth-storage'
		}
	)
)
