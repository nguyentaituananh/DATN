import React from 'react'

interface OrderPageLayoutProps {
    children: React.ReactNode
    title?: string
}

export const OrderPageLayout: React.FC<OrderPageLayoutProps> = ({
    children,
    title = "Đặt Hàng Của Bạn"
}) => {
    return (
        <div className="container max-w-screen-xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{title}</h1>
            {children}
        </div>
    )
}

interface LoadingStateProps {
    message?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    message = "Đang tải giỏ hàng..."
}) => {
    return (
        <OrderPageLayout>
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{message}</p>
            </div>
        </OrderPageLayout>
    )
}

interface EmptyStateProps {
    message?: string
    actionText?: string
    onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    message = "Vui lòng đăng nhập để xem giỏ hàng.",
    actionText,
    onAction
}) => {
    return (
        <OrderPageLayout>
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4">{message}</p>
                {actionText && onAction && (
                    <button
                        onClick={onAction}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </OrderPageLayout>
    )
}

export default OrderPageLayout
