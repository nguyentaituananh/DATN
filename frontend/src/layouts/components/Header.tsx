import { UserMenu } from '@/components/shared/UserMenu'
import { useAuth } from '@/hooks/accounts'
import { useGetFavorites } from '@/hooks/favorites/useFavorites'
import { useGetCart, useGetCartItems } from '@/hooks/cart/useCart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Sofa,
    ShoppingCart,
    Search,
    Heart,
    Menu,
    Phone,
    MapPin,
    Clock
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export const Header = () => {
    // Check authentication using token from localStorage
    const { isAuthenticated } = useAuth() // Assuming useAuth hook checks localStorage token
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Get data from APIs - chỉ khi đã đăng nhập
    const { data: cartData } = useGetCart()
    const { data: cartItemsData } = useGetCartItems(cartData?.metadata?._id)
    const { data: favoritesData } = useGetFavorites()

    // Calculate counts
    const favoritesCount = isAuthenticated ? (favoritesData?.metadata?.length || 0) : 0
    const cartCount = isAuthenticated ? (cartItemsData?.metadata?.length || 0) : 0

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white text-sm">
                <div className="container max-w-screen-2xl mx-auto px-4">
                    <div className="flex items-center justify-between h-10">
                        <div className="hidden md:flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                <span>Hotline: 1900 1234</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>Hà Nội - TP.HCM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>8:00 - 22:00 hàng ngày</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-amber-200">Miễn phí vận chuyển đơn từ 5 triệu</span>
                            <div className="hidden md:block">
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                    Sale 50%
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/95">
                <div className="container max-w-screen-2xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-3 group">
                                <div className="p-2 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                                    <Sofa className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        EcoDecor
                                    </span>
                                    <div className="text-xs text-gray-500 -mt-1">Nội thất cao cấp</div>
                                </div>
                            </Link>

                            {/* Navigation - Desktop */}
                            <nav className="hidden lg:flex items-center gap-8">
                                <Link
                                    to="/products"
                                    className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative group"
                                >
                                    Sản phẩm
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    to="/collections"
                                    className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative group"
                                >
                                    Bộ sưu tập
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative group"
                                >
                                    Về chúng tôi
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
                                </Link>
                            </nav>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm nội thất..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Mobile Search */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                            >
                                <Search className="w-5 h-5" />
                            </Button>

                            {/* Wishlist */}
                            <Link to="/favorites">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:flex p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 relative"
                                >
                                    <Heart className="w-5 h-5" />
                                    {favoritesCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                            {favoritesCount}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>

                            {/* Cart */}
                            <Link to="/order">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 relative"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-amber-600 text-white text-xs">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            </Link>

                            <Separator orientation="vertical" className="h-6 hidden sm:block" />

                            {/* Auth Section */}
                            {isAuthenticated ? (
                                <UserMenu />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login">
                                        <Button
                                            variant="outline"
                                            className="hidden sm:flex border-amber-600 text-amber-600 hover:bg-amber-50 font-medium"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                                            Đăng ký
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="container max-w-screen-2xl mx-auto px-4 py-4">
                            {/* Mobile Search */}
                            <div className="md:hidden mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm nội thất..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Mobile Nav Links */}
                            <nav className="space-y-3">
                                <Link
                                    to="/products"
                                    className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sản phẩm
                                </Link>
                                <Link
                                    to="/collections"
                                    className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Bộ sưu tập
                                </Link>
                                <Link
                                    to="/about"
                                    className="block py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Về chúng tôi
                                </Link>
                                {isAuthenticated ? (
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="py-2">
                                            <UserMenu />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pt-3 border-t border-gray-200 space-y-2">
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="outline" className="w-full border-amber-600 text-amber-600 hover:bg-amber-50">
                                                Đăng nhập
                                            </Button>
                                        </Link>
                                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                            <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                                                Đăng ký
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header