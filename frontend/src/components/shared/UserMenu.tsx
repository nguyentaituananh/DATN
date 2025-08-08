import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuth, useLogout } from '@/hooks/accounts'
import { User, LogOut, Settings } from 'lucide-react'

export const UserMenu = () => {
	const { user, isAuthenticated } = useAuth()
	const logout = useLogout()

	if (!isAuthenticated || !user) {
		return null
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex items-center gap-2">
					<User className="h-4 w-4" />
					<span className="hidden sm:inline">{user.name}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{user.name}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>Cài đặt</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Đăng xuất</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserMenu
