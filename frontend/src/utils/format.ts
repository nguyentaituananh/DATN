export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export const formatCurrency = (amount: number, currency = 'VND'): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: currency
	}).format(amount)
}

export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat('vi-VN').format(num)
}

export const formatDate = (date: string | Date): string => {
	return new Date(date).toLocaleDateString('vi-VN')
}

export const formatDateTime = (date: string | Date): string => {
	return new Date(date).toLocaleString('vi-VN')
}
