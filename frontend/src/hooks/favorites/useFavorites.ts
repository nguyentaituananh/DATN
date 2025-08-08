import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { favoriteApis } from '@/services/favorites/favorites'
import { useAuth } from '../accounts'

export const useGetFavorites = () => {
	const { isAuthenticated } = useAuth()
	return useQuery({
		queryKey: ['favorites'],
		queryFn: favoriteApis.getFavorites,
		refetchOnWindowFocus: false, // Disable refetch on window focus
		enabled: isAuthenticated, // Only run if the user is authenticated
	})
}

export const useAddFavorite = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (productId: string) => favoriteApis.addFavorite(productId),
		onSuccess: () => {
			toast.success('Đã thêm vào danh sách yêu thích')
			queryClient.invalidateQueries({ queryKey: ['favorites'] })
		}
	})
}

export const useRemoveFavorite = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (productId: string) => favoriteApis.removeFavorite(productId),
		onSuccess: () => {
			toast.success('Đã xóa khỏi danh sách yêu thích')
			queryClient.invalidateQueries({ queryKey: ['favorites'] })
		}
	})
}
