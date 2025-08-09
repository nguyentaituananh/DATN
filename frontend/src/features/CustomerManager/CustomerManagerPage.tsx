import { DataTable } from '@/components/shared/DataTable'
import { Input } from '@/components/ui/input'
import { useGetUsers } from '@/hooks/accounts/useCustomers'
import { useMemo, useState } from 'react'
import { createUserColumns } from '../CustomerManager/components/customerColumns'

const UserManagerPage = () => {
	const { data, isFetching } = useGetUsers({ role: 'customer' })
	const [searchTerm, setSearchTerm] = useState('')

	const columns = createUserColumns({
		onSendVerificationEmail: () => {
			// Chức năng gửi email xác minh (chưa triển khai)
		},
		onResetPasswordLink: () => {
			//Chức năng gửi liên kết đặt lại mật khẩu (chưa triển khai)
		},
		onRevokeSessions: () => {
			// Chức năng thu hồi phiên đăng nhập (chưa triển khai)
		},
		onToggleStatus: () => {
			// Chức năng chuyển đổi trạng thái hoạt động của người dùng (chưa triển khai)
		}
	})

	const filteredData = useMemo(() => {
		let users = data?.metadata?.users ?? []

		if (searchTerm) {
			users = users.filter(
				(user) =>
					user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		return users
	}, [data, searchTerm])

	return (
		<>
			<div className="flex flex-col gap-4 h-full">
				<div className="flex items-center justify-between">
					<Input
						placeholder="Tìm kiếm theo tên hoặc email..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-[300px]"
					/>
				</div>
				<DataTable columns={columns} data={filteredData} isLoading={isFetching} />
			</div>
		</>
	)
}

export default UserManagerPage
