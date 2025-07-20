import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/hooks/categories/useCategory'

const SelectCategory = () => {
	const { data } = useGetCategories()

	return (
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Chọn danh mục sản phẩm" />
			</SelectTrigger>
			<SelectContent className="w-full">
				{data?.metadata.categories.map((category) => (
					<SelectItem key={category._id} value={category._id}>
						{category.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default SelectCategory
