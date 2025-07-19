import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IUser } from '@/types/auth'

interface AuthState {
	user: IUser | null
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	setUser: (user: IUser | null) => void
	setTokens: (accessToken: string | null, refreshToken: string | null) => void
	setAuthenticated: (isAuthenticated: boolean) => void
	updateUser: (userData: Partial<IUser>) => void
	clearAuth: () => void
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

			setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

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
				})
		}),
		{
			name: 'auth-storage'
		}
	)
)
