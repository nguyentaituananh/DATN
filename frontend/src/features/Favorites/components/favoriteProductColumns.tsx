import type { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import placeholderImage from '@/assets/images/placeholder-image.png'

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface FavoriteProductColumnsProps {
  onRemove?: (productId: string) => void;
}

export const createFavoriteProductColumns = ({ onRemove }: FavoriteProductColumnsProps): ColumnDef<FavoriteProduct>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Hình ảnh',
    cell: ({ row }) => (
      <img
        src={row.getValue('imageUrl') || placeholderImage}
        alt={row.original.name}
        className="w-16 h-16 object-cover rounded-md"
        onError={(e) => {
          e.currentTarget.src = placeholderImage
        }}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Tên sản phẩm',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Giá',
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Hành động',
    cell: ({ row }) => {
      const product = row.original;
      const handleRemove = () => {
        onRemove?.(product.id);
      };
      return (
        <Button
          onClick={handleRemove}
          size="icon"
          variant="destructive"
          title="Xóa khỏi yêu thích"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
