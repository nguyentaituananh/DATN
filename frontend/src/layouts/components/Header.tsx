import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, User, Bed, Armchair, Table, Archive, Lamp, ChevronDown } from 'lucide-react'
import UserMenu from '@/components/shared/UserMenu'
import { useAuth } from '@/hooks/accounts'

export const Header = () => {
	const { isAuthenticated } = useAuth()
// 	const productMenuItems = [
//     {
//       key: "beds",
//       label: (
//         <Link to="" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//             <Bed size={16} className="text-green-600" />
//           </div>
//           <div>
//             <div className="font-medium text-stone-700">Giường</div>
//             <div className="text-xs text-stone-500">60+ sản phẩm</div>
//           </div>
//         </Link>
//       ),
//     },
//     {
//       key: "chairs",
//       label: (
//         <Link to="" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//             <Armchair size={16} className="text-purple-600" />
//           </div>
//           <div>
//             <div className="font-medium text-stone-700">Ghế</div>
//             <div className="text-xs text-stone-500">95+ sản phẩm</div>
//           </div>
//         </Link>
//       ),
//     },
//     {
//       key: "tables",
//       label: (
//         <Link to="" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
//             <Table size={16} className="text-orange-600" />
//           </div>
//           <div>
//             <div className="font-medium text-stone-700">Bàn</div>
//             <div className="text-xs text-stone-500">85+ sản phẩm</div>
//           </div>
//         </Link>
//       ),
//     },
//     {
//       key: "cabinets",
//       label: (
//         <Link to="" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//             <Archive size={16} className="text-red-600" />
//           </div>
//           <div>
//             <div className="font-medium text-stone-700">Tủ</div>
//             <div className="text-xs text-stone-500">75+ sản phẩm</div>
//           </div>
//         </Link>
//       ),
//     },
//     {
//       key: "lighting",
//       label: (
//         <Link to="" className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
//             <Lamp size={16} className="text-yellow-600" />
//           </div>
//           <div>
//             <div className="font-medium text-stone-700">Đèn</div>
//             <div className="text-xs text-stone-500">40+ sản phẩm</div>
//           </div>
//         </Link>
//       ),
//     },
//   ];
	return (
		<header className="sticky top-0 z-50 bg-white shadow-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				
				<Link to="/" className="font-serif text-2xl font-bold tracking-tight text-slate-800">
            Eco Decore
                </Link>
				<nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
					<Link to="/" className="hover:text-primary transition-colors">
						Trang chủ
					</Link>
              <div className="flex items-center cursor-pointer font-medium text-slate-700 hover:text-amber-700 space-x-1">
                <span>Sản phẩm</span>
                <ChevronDown size={16} />
              </div>
					<Link to="" className="hover:text-primary transition-colors">
						Giới thiệu
					</Link>
					<Link to="" className="hover:text-primary transition-colors">
						Liên hệ
					</Link>
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-4">
					<Link to="" className="text-gray-600 hover:text-primary transition-colors">
						<Heart className="w-5 h-5" />
					</Link>

					<Link to="" className="relative text-gray-600 hover:text-primary transition-colors">
						<ShoppingBag className="w-5 h-5" />
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
							2
						</span>
					</Link>

					{isAuthenticated ? (
						<UserMenu />
					) : (
						<Link
							to="/login"
							className="text-gray-600 hover:text-primary transition-colors"
						>
							<User className="w-5 h-5" />
						</Link>
					)}
				
				</div>
			</div>
		</header>
	)
}

export default Header
