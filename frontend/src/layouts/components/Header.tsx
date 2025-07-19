import { UserMenu } from '@/components/shared/UserMenu'
import { useAuth } from '@/hooks/accounts'
import { Link } from 'react-router-dom'

export const Header = () => {
	const { isAuthenticated } = useAuth()

	return (
		<header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center justify-between">
				<div className="flex items-center gap-4">
					<Link to="/" className="flex items-center space-x-2">
						<span className="font-bold text-xl">DATN</span>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					{isAuthenticated ? (
						<UserMenu />
					) : (
						<Link
							to="/login"
							className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						>
							Đăng nhập
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
