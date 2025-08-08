import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routes } from '@/constants'
import { useAuth } from '@/hooks/accounts'

interface AuthGuardProps {
	children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		// Nếu người dùng chưa đăng nhập và không ở trang đăng nhập, chuyển hướng đến trang đăng nhập
		if (!isAuthenticated && location.pathname !== routes.login) {
			navigate(routes.login, {
				replace: true,
				state: { from: location.pathname } // Lưu đường dẫn hiện tại để chuyển hướng sau khi đăng nhập
			})
		}
	}, [navigate, location.pathname, isAuthenticated])

	// Nếu không được xác thực và không ở trang đăng nhập, không hiển thị children
	if (!isAuthenticated && location.pathname !== routes.login) return null

	return <>{children}</>
}

export default AuthGuard
