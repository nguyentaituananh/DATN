import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Home, Mail, Lock, Sofa, Shield, Clock, Sparkles } from 'lucide-react'
import { useLogin } from '@/hooks/accounts/useAuth'


const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
})


type LoginFormFields = z.infer<typeof loginSchema>


const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<LoginFormFields>({ resolver: zodResolver(loginSchema) })


    const { mutate } = useLogin()


    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        mutate(data)
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <div className="grid lg:grid-cols-2 min-h-screen">
                {/* Left Panel - Branding */}
                <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-amber-900 via-orange-800 to-amber-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 max-w-md">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Sofa className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">EcoDecor</h1>
                                <p className="text-amber-100">Nội thất cao cấp</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-white mb-4">
                                    Chào mừng trở lại!
                                </h2>
                                <p className="text-amber-100 leading-relaxed">
                                    Quản lý cửa hàng nội thất của bạn một cách dễ dàng và hiệu quả với hệ thống quản lý toàn diện.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Shield className="w-5 h-5 text-amber-200" />
                                    <div>
                                        <p className="text-white font-medium">Bảo mật cao</p>
                                        <p className="text-amber-200 text-sm">Mã hóa end-to-end</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <Clock className="w-5 h-5 text-amber-200" />
                                    <div>
                                        <p className="text-white font-medium">Hỗ trợ 24/7</p>
                                        <p className="text-amber-200 text-sm">Luôn sẵn sàng hỗ trợ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Right Panel - Login Form */}
                <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-md space-y-6">
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl mb-4">
                                <Sofa className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">FurniHome</h1>
                            <p className="text-muted-foreground">Nội thất cao cấp</p>
                        </div>


                        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                            <CardHeader className="space-y-4 text-center">
                                <div className="mx-auto p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full w-fit">
                                    <Home className="w-6 h-6 text-amber-700" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
                                    <CardDescription className="mt-2">
                                        Nhập thông tin của bạn để đăng nhập vào hệ thống
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                                                <Mail className="w-4 h-4 text-amber-600" />
                                                Email
                                            </Label>
                                            <Input
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                disabled={isSubmitting}
                                                className="h-11 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                                                {...register('email')}
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-destructive">{errors.email.message}</p>
                                            )}
                                        </div>


                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                                                <Lock className="w-4 h-4 text-amber-600" />
                                                Mật khẩu
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Nhập mật khẩu của bạn"
                                                disabled={isSubmitting}
                                                className="h-11 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                                                {...register('password')}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-destructive">{errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>


                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 focus:ring-2"
                                            />
                                            <Label htmlFor="remember" className="text-sm font-medium leading-none">
                                                Ghi nhớ đăng nhập
                                            </Label>
                                        </div>
                                        <Button variant="link" className="px-0 font-normal text-amber-600 hover:text-amber-700">
                                            Quên mật khẩu?
                                        </Button>
                                    </div>


                                    <Button
                                        type="submit"
                                        className="w-full h-11 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Đang đăng nhập...
                                            </div>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                                    </Button>


                                    <div className="w-full h-px bg-gray-200 my-4"></div>


                                    {/* Development helper */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Dev Mode
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg space-y-2">
                                            <p className="text-xs font-semibold text-blue-700 mb-2">
                                                Để test (chỉ trong môi trường dev):
                                            </p>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-blue-600 font-medium">Email:</span>
                                                    <span className="text-blue-700 font-mono">admin@example.com</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-blue-600 font-medium">Password:</span>
                                                    <span className="text-blue-700 font-mono">admin123</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Chưa có tài khoản?{' '}
                                            <Button variant="link" className="px-0 font-normal text-amber-600 hover:text-amber-700">
                                                Liên hệ quản trị viên
                                            </Button>
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>


                        {/* Footer Features */}
                        <div className="grid grid-cols-3 gap-3 text-center">
                            {[
                                { icon: Shield, label: 'Bảo mật', color: 'bg-green-100 text-green-700' },
                                { icon: Clock, label: 'Hỗ trợ 24/7', color: 'bg-blue-100 text-blue-700' },
                                { icon: Sparkles, label: 'Hiện đại', color: 'bg-purple-100 text-purple-700' }
                            ].map((feature, index) => (
                                <Card key={index} className="p-3 border-0 shadow-sm bg-white/60 backdrop-blur-sm">
                                    <feature.icon className={`w-5 h-5 mx-auto mb-2 ${feature.color.split(' ')[1]}`} />
                                    <p className="text-xs font-medium text-muted-foreground">{feature.label}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage
