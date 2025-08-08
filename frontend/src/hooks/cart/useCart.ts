import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApis } from '@/services/cart/cart'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/accounts'

interface ApiError {
	response?: {
		data?: {
			message?: string
		}
	}
}

interface AddToCartParams {
	productId: string
	quantity: number
}

interface UpdateCartItemParams {
	productId: string
	quantity: number
}

export const useGetCart = () => {
	const { user } = useAuth();
	return useQuery({
		queryKey: ['cart'],
		queryFn: cartApis.getCart,
		enabled: !!user?._id,
	})
}

export const useGetCartByUser = () => {
	const { user } = useAuth();
	return useQuery({
	  queryKey: ['cart', 'user', user?._id],
	  queryFn: () => cartApis.getCartByUser(user!._id),
	  enabled: !!user?._id, 
	});
  };
  
  export const useGetCartItems = (cartId?: string) => {
	return useQuery({
	  queryKey: ['cartItems', cartId],
	  queryFn: () => cartApis.getCartItems(cartId!),
	  enabled: !!cartId, 
	});
  };
  
  export const useOneGetCartItems = (cartId?: string) => {
	return useQuery({
	  queryKey: ['cartItems', cartId],
	  queryFn: () => cartApis.getCartItems(cartId!),
	  enabled: !!cartId,
	  select: (data) => data.metadata,
	});
  };

export const useAddToCart = () => {
	const queryClient = useQueryClient()
	const { user } = useAuth()
	const { data: cartData } = useGetCartByUser()
	return useMutation({
		mutationFn: async ({ productId, quantity }: AddToCartParams) => {
			if (!user) {
				throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
			}

			let cartId = cartData?.metadata?._id

			if (!cartId) {
				const newCartResponse = await cartApis.createCart({ user_id: user._id })
				cartId = newCartResponse.metadata._id
				queryClient.invalidateQueries({ queryKey: ['cart', 'user', user._id] })
			}

			return cartApis.addToCart({
				cart_id: cartId,
				product_id: productId,
				quantity: quantity
			})
		},
		onSuccess: () => {
			toast.success('Đã thêm sản phẩm vào giỏ hàng!')
			queryClient.invalidateQueries({ queryKey: ['cartItems'] })
		},
		onError: (error: unknown) => {
			const apiError = error as ApiError
			const message =
				apiError?.response?.data?.message || (error as Error)?.message || 'Không thể thêm sản phẩm vào giỏ hàng'
			toast.error(message)
		}
	})
}

export const useUpdateCartItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ productId, quantity }: UpdateCartItemParams) =>
			cartApis.updateCartItemQuantity(productId, { quantity }),
		onSuccess: () => {
			toast.success('Số lượng sản phẩm đã được cập nhật')
			queryClient.invalidateQueries({ queryKey: ['cartItems'] })
		},
		onError: (error: unknown) => {
			const apiError = error as ApiError
			const message =
				apiError?.response?.data?.message || (error as Error)?.message || 'Không thể cập nhật số lượng'
			toast.error(message)
		}
	})
}

export const useRemoveCartItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (productId: string) => cartApis.removeCartItem(productId),
		onSuccess: () => {
			toast.success('Đã xóa sản phẩm khỏi giỏ hàng!')
			queryClient.invalidateQueries({ queryKey: ['cartItems'] })
		},
		onError: (error: unknown) => {
			const apiError = error as ApiError
			const message =
				apiError?.response?.data?.message || (error as Error)?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng'
			toast.error(message)
		}
	})
}
