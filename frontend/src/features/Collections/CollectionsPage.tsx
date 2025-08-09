import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const CollectionsPage: React.FC = () => {
  // Mock collections data
  const collections: Collection[] = [
    {
      id: 'col001',
      name: 'Bộ Sưu Tập Mùa Hè',
      description: 'Mang đến không gian sống tươi mới và đầy năng lượng cho mùa hè của bạn.',
      imageUrl: 'https://via.placeholder.com/400x250',
    },
    {
      id: 'col002',
      name: 'Nội Thất Tối Giản',
      description: 'Sự kết hợp hoàn hảo giữa công năng và thẩm mỹ trong từng chi tiết.',
      imageUrl: 'https://via.placeholder.com/400x250',
    },
    {
        id: 'col003',
        name: 'Phong Cách Rustic',
        description: 'Vẻ đẹp mộc mạc, gần gũi với thiên nhiên, mang lại cảm giác bình yên.',
        imageUrl: 'https://via.placeholder.com/400x250',
      },
  ];

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Các Bộ Sưu Tập</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(collection => (
          <Card key={collection.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <img src={collection.imageUrl} alt={collection.name} className="w-full h-56 object-cover" />
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{collection.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
