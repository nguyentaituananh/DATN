import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Badge } from '@/components/ui/badge'
import {
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Edit,
	Save,
	X,
	Camera,
	Shield,
	History,
	Heart,
	ShoppingBag,
	Bell,
	Lock,
	Trash2
} from 'lucide-react'

// Validation schema
const profileSchema = z.object({
	fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
	email: z.string().email('Email không hợp lệ'),
	phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
	address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
	dateOfBirth: z.string().optional(),
	bio: z.string().max(200, 'Mô tả không được quá 200 ký tự').optional()
})

type ProfileFormData = z.infer<typeof profileSchema>

const UserProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [activeTab, setActiveTab] = useState('profile')

	// Mock user data
	const [userData, setUserData] = useState({
		id: 'user123',
		fullName: 'Nguyễn Văn An',
		email: 'nguyenvanan@email.com',
		phone: '0123456789',
		address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
		dateOfBirth: '1990-01-15',
		bio: 'Yêu thích nội thất hiện đại và phong cách tối giản',
		avatar: null,
		joinDate: '2023-01-15',
		status: 'active',
		totalOrders: 12,
		totalSpent: 45600000,
		favoriteItems: 8
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: userData
	})

	const onSubmit = async (data: ProfileFormData) => {
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000))
			setUserData(prev => ({ ...prev, ...data }))
			setIsEditing(false)
			console.log('Profile updated:', data)
		} catch (error) {
			console.error('Update failed:', error)
		}
	}

	const handleCancel = () => {
		reset(userData)
		setIsEditing(false)
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND'
		}).format(amount)
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('vi-VN')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
			<div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Thông tin cá nhân</h1>
					<p className="text-gray-600">Quản lý thông tin tài khoản và tùy chỉnh trải nghiệm của bạn</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
							<CardContent className="p-6">
								{/* Avatar */}
								<div className="text-center mb-6">
									<div className="relative inline-block">
										<div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
											{userData.avatar ? (
												<img src={userData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
											) : (
												userData.fullName.charAt(0).toUpperCase()
											)}
										</div>
										<Button
											size="sm"
											className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-amber-600 hover:bg-amber-700"
										>
											<Camera className="w-4 h-4" />
										</Button>
									</div>
									<h3 className="font-semibold text-lg text-gray-900">{userData.fullName}</h3>
									<p className="text-sm text-gray-600">{userData.email}</p>
									<Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
										<Shield className="w-3 h-3 mr-1" />
										Đã xác thực
									</Badge>
								</div>

								{/* Stats */}
								<div className="space-y-4">
									<div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
										<div className="flex items-center gap-2">
											<ShoppingBag className="w-4 h-4 text-blue-600" />
											<span className="text-sm font-medium text-blue-900">Đơn hàng</span>
										</div>
										<span className="font-bold text-blue-700">{userData.totalOrders}</span>
									</div>
									<div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
										<div className="flex items-center gap-2">
											<Heart className="w-4 h-4 text-green-600" />
											<span className="text-sm font-medium text-green-900">Yêu thích</span>
										</div>
										<span className="font-bold text-green-700">{userData.favoriteItems}</span>
									</div>
									<div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4 text-amber-600" />
											<span className="text-sm font-medium text-amber-900">Tham gia</span>
										</div>
										<span className="font-bold text-amber-700">{formatDate(userData.joinDate)}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
							<TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex bg-white/80 backdrop-blur-sm">
								<TabsTrigger value="profile" className="flex items-center gap-2">
									<User className="w-4 h-4" />
									<span className="hidden sm:inline">Hồ sơ</span>
								</TabsTrigger>
								<TabsTrigger value="orders" className="flex items-center gap-2">
									<ShoppingBag className="w-4 h-4" />
									<span className="hidden sm:inline">Đơn hàng</span>
								</TabsTrigger>
								<TabsTrigger value="favorites" className="flex items-center gap-2">
									<Heart className="w-4 h-4" />
									<span className="hidden sm:inline">Yêu thích</span>
								</TabsTrigger>
								<TabsTrigger value="settings" className="flex items-center gap-2">
									<Lock className="w-4 h-4" />
									<span className="hidden sm:inline">Cài đặt</span>
								</TabsTrigger>
							</TabsList>

							{/* Profile Tab */}
							<TabsContent value="profile" className="space-y-6">
								<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
									<CardHeader className="flex flex-row items-center justify-between">
										<div>
											<CardTitle className="flex items-center gap-2">
												<User className="w-5 h-5 text-amber-600" />
												Thông tin cá nhân
											</CardTitle>
											<CardDescription>
												Cập nhật thông tin của bạn để có trải nghiệm tốt nhất
											</CardDescription>
										</div>
										{!isEditing ? (
											<Button
												variant="outline"
												onClick={() => setIsEditing(true)}
												className="border-amber-600 text-amber-600 hover:bg-amber-50"
											>
												<Edit className="w-4 h-4 mr-2" />
												Chỉnh sửa
											</Button>
										) : (
											<div className="flex gap-2">
												<Button
													variant="outline"
													onClick={handleCancel}
													disabled={isSubmitting}
												>
													<X className="w-4 h-4 mr-2" />
													Hủy
												</Button>
												<Button
													onClick={handleSubmit(onSubmit)}
													disabled={isSubmitting}
													className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
												>
													{isSubmitting ? (
														<div className="flex items-center gap-2">
															<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
															Đang lưu...
														</div>
													) : (
														<>
															<Save className="w-4 h-4 mr-2" />
															Lưu thay đổi
														</>
													)}
												</Button>
											</div>
										)}
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="space-y-2">
												<Label htmlFor="fullName" className="flex items-center gap-2">
													<User className="w-4 h-4 text-amber-600" />
													Họ và tên
												</Label>
												<Input
													id="fullName"
													disabled={!isEditing}
													className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'focus-visible:ring-amber-500'}`}
													{...register('fullName')}
												/>
												{errors.fullName && (
													<p className="text-sm text-red-600">{errors.fullName.message}</p>
												)}
											</div>

											<div className="space-y-2">
												<Label htmlFor="email" className="flex items-center gap-2">
													<Mail className="w-4 h-4 text-amber-600" />
													Email
												</Label>
												<Input
													id="email"
													type="email"
													disabled={!isEditing}
													className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'focus-visible:ring-amber-500'}`}
													{...register('email')}
												/>
												{errors.email && (
													<p className="text-sm text-red-600">{errors.email.message}</p>
												)}
											</div>

											<div className="space-y-2">
												<Label htmlFor="phone" className="flex items-center gap-2">
													<Phone className="w-4 h-4 text-amber-600" />
													Số điện thoại
												</Label>
												<Input
													id="phone"
													disabled={!isEditing}
													className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'focus-visible:ring-amber-500'}`}
													{...register('phone')}
												/>
												{errors.phone && (
													<p className="text-sm text-red-600">{errors.phone.message}</p>
												)}
											</div>

											<div className="space-y-2">
												<Label htmlFor="dateOfBirth" className="flex items-center gap-2">
													<Calendar className="w-4 h-4 text-amber-600" />
													Ngày sinh
												</Label>
												<Input
													id="dateOfBirth"
													type="date"
													disabled={!isEditing}
													className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'focus-visible:ring-amber-500'}`}
													{...register('dateOfBirth')}
												/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="address" className="flex items-center gap-2">
												<MapPin className="w-4 h-4 text-amber-600" />
												Địa chỉ
											</Label>
											<Input
												id="address"
												disabled={!isEditing}
												className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'focus-visible:ring-amber-500'}`}
												{...register('address')}
											/>
											{errors.address && (
												<p className="text-sm text-red-600">{errors.address.message}</p>
											)}
										</div>

										<div className="space-y-2">
											<Label htmlFor="bio" className="flex items-center gap-2">
												<Edit className="w-4 h-4 text-amber-600" />
												Mô tả bản thân
											</Label>
											<textarea
												id="bio"
												rows={3}
												disabled={!isEditing}
												className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
												placeholder="Chia sẻ về sở thích nội thất của bạn..."
												{...register('bio')}
											/>
											{errors.bio && (
												<p className="text-sm text-red-600">{errors.bio.message}</p>
											)}
										</div>
									</CardContent>
								</Card>

								{/* Account Summary */}
								<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<History className="w-5 h-5 text-amber-600" />
											Tổng quan tài khoản
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
											<div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
												<ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
												<div className="text-2xl font-bold text-blue-700">{userData.totalOrders}</div>
												<div className="text-sm text-blue-600">Tổng đơn hàng</div>
											</div>
											<div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
												<div className="text-2xl font-bold text-green-700">{formatCurrency(userData.totalSpent)}</div>
												<div className="text-sm text-green-600">Tổng chi tiêu</div>
											</div>
											<div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
												<Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
												<div className="text-2xl font-bold text-purple-700">{userData.favoriteItems}</div>
												<div className="text-sm text-purple-600">Sản phẩm yêu thích</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Orders Tab */}
							<TabsContent value="orders">
								<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<ShoppingBag className="w-5 h-5 text-amber-600" />
											Lịch sử đơn hàng
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-center py-12">
											<ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
											<p className="text-gray-500">Chức năng đang phát triển</p>
											<p className="text-sm text-gray-400">Lịch sử đơn hàng sẽ hiển thị ở đây</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Favorites Tab */}
							<TabsContent value="favorites">
								<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Heart className="w-5 h-5 text-amber-600" />
											Sản phẩm yêu thích
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-center py-12">
											<Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
											<p className="text-gray-500">Chưa có sản phẩm yêu thích</p>
											<p className="text-sm text-gray-400">Thêm sản phẩm vào danh sách yêu thích để xem ở đây</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Settings Tab */}
							<TabsContent value="settings">
								<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Lock className="w-5 h-5 text-amber-600" />
											Cài đặt bảo mật
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
											<div className="flex items-center gap-3">
												<Lock className="w-5 h-5 text-gray-600" />
												<div>
													<h4 className="font-medium">Đổi mật khẩu</h4>
													<p className="text-sm text-gray-600">Cập nhật mật khẩu bảo mật</p>
												</div>
											</div>
											<Button variant="outline">Đổi mật khẩu</Button>
										</div>

										<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
											<div className="flex items-center gap-3">
												<Bell className="w-5 h-5 text-gray-600" />
												<div>
													<h4 className="font-medium">Thông báo</h4>
													<p className="text-sm text-gray-600">Quản lý thông báo email</p>
												</div>
											</div>
											<Button variant="outline">Cài đặt</Button>
										</div>

										<div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
											<div className="flex items-center gap-3">
												<Trash2 className="w-5 h-5 text-red-600" />
												<div>
													<h4 className="font-medium text-red-800">Xóa tài khoản</h4>
													<p className="text-sm text-red-600">Xóa vĩnh viễn tài khoản của bạn</p>
												</div>
											</div>
											<Button variant="destructive">Xóa tài khoản</Button>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfilePage