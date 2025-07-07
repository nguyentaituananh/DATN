import { useParams, useNavigate } from 'react-router-dom';

export const CategoryDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log('Đã xoá danh mục:', id);
    navigate('/admin/categories');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-red-600">Xoá danh mục #{id}</h1>
      <p>Bạn có chắc chắn muốn xoá danh mục này?</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Xoá
        </button>
        <button
          onClick={() => navigate('/admin/categories')}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Huỷ
        </button>
      </div>
    </div>
  );
};
