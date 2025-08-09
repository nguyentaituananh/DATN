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
			// Placeholder for send verification email action
		},
		onResetPasswordLink: () => {
			// Placeholder for reset password link action
		},
		onRevokeSessions: () => {
			// Placeholder for revoke sessions action
		},
		onToggleStatus: () => {
			// Placeholder for toggle status action
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
