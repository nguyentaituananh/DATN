import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'

const ProductManagerPage = () => {
	return (
		<div>
			<div className="flex items-center justify-end">
				<Button>
					<CirclePlus />
					Thêm mới sản phẩm
				</Button>
			</div>
			<div className=""></div>
		</div>
	)
}

export default ProductManagerPage
