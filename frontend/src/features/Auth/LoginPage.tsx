import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
		<div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
					<CardDescription className="text-center">
						Nhập thông tin của bạn để đăng nhập vào hệ thống
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Input
							type="email"
							placeholder="Nhập email của bạn"
							disabled={isSubmitting}
							error={errors.email?.message}
							label="Email"
							{...register('email')}
						/>

						<Input
							id="password"
							type="password"
							placeholder="Nhập mật khẩu của bạn"
							{...register('password')}
							disabled={isSubmitting}
							error={errors.password?.message}
							label="Mật khẩu"
						/>

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
						</Button>

						{/* Development helper */}
						<div className="mt-4 p-3  border rounded-md">
							<p className="text-xs mb-1">Để test (chỉ trong môi trường dev):</p>
							<p className="text-xs">Email: admin@example.com</p>
							<p className="text-xs">Password: admin123</p>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
