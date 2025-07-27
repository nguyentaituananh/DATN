import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface ModalConfirmDeleteProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

export function ModalConfirmDelete({ isOpen, onClose, onConfirm }: ModalConfirmDeleteProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
					<AlertDialogDescription>
						Bạn có chắc chắn muốn xóa không? Hành động này không thể hoàn tác.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>Xóa</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}