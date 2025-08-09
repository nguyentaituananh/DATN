import { ModalConfirmDelete } from '@/components/modals/ModalConfirmDelete'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDeleteCoupon, useGetAllCoupons } from '@/hooks/coupon/useCoupon'
import type { ICoupon } from '@/types/coupons'
import { useMemo, useState } from 'react'
import ModalCoupon from './components/ModalCoupon'
import { createCouponColumns } from './components/couponColumns'

const CouponManagerPage = () => {
	const [openModal, setOpenModal] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null)
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')

	const { data: couponData, isFetching: isFetchingCoupons } = useGetAllCoupons()
	const { mutate: deleteCoupon, isPending } = useDeleteCoupon()

	const filteredData = useMemo(() => {
		let coupons = couponData?.metadata ?? []

		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase()
			coupons = coupons.filter((coupon) =>
				coupon.code.toLowerCase().includes(searchLower) ||
				coupon.name.toLowerCase().includes(searchLower) ||
				(coupon.description && coupon.description.toLowerCase().includes(searchLower))
			)
		}

		return coupons
	}, [couponData, searchTerm])

	const columns = createCouponColumns({
		onEdit: (coupon) => {
			setSelectedCoupon(coupon)
			setModalMode('edit')
			setOpenModal(true)
		},
		onDelete: (couponId) => {
			setOpenDeleteDialog(true)
			setSelectedCouponId(couponId)
		}
	})

	return (
		<>
			<div className="flex flex-col gap-4 h-full">
				<div className="flex items-center justify-between">
					<Input
						placeholder="Tìm kiếm theo mã, tên hoặc mô tả..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-[300px]"
					/>
					<Button
						onClick={() => {
							setModalMode('create')
							setSelectedCoupon(null)
							setOpenModal(true)
						}}
					>
						Thêm mới mã giảm giá
					</Button>
				</div>

				<DataTable columns={columns} data={filteredData} isLoading={isFetchingCoupons || isPending} />
			</div>

			{openModal && (
				<ModalCoupon
					isOpen={openModal}
					onClose={() => {
						setOpenModal(false)
						setSelectedCoupon(null)
						setModalMode('create')
					}}
					couponData={selectedCoupon}
					mode={modalMode}
				/>
			)}

			{openDeleteDialog && (
				<ModalConfirmDelete
					isOpen={openDeleteDialog}
					onClose={() => {
						setOpenDeleteDialog(false)
						setSelectedCouponId(null)
					}}
					onConfirm={() => {
						if (selectedCouponId) deleteCoupon(selectedCouponId)
					}}
				/>
			)}
		</>
	)
}

export default CouponManagerPage
