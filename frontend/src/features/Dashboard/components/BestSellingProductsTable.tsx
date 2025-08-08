'use client'

import { useBestsellingProducts } from '@/hooks/stats/useStats'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BestSellingProduct {
	_id: string
	name: string
	thumb: string
	totalQuantitySold: number
	stock: number
	price: number
}

const BestSellingProductsTable = () => {
	const { data, isLoading } = useBestsellingProducts(5)
	if (isLoading) return <div>Loading...</div>
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sản phẩm bán chạy</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Sản phẩm</TableHead>
							<TableHead>Số lượng bán</TableHead>
							<TableHead>Tồn kho</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.metadata.map((product: BestSellingProduct) => (
							<TableRow key={product._id}>
								<TableCell>
									<div className='flex items-center gap-2'>
										<img
											src={product.thumb}
											alt={product.name}
											className='w-10 h-10 object-cover rounded-md'
										/>
										<span>{product.name}</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant='outline'>{product.totalQuantitySold}</Badge>
								</TableCell>
								<TableCell>
									<Badge variant='destructive'>{product.stock}</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

export default BestSellingProductsTable
