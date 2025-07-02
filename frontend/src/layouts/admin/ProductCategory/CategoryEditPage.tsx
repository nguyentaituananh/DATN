import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const CategoryEditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('Tên cũ'); // Giả lập dữ liệu
  const navigate = useNavigate();

  const handleUpdate = () => {
    console.log('Cập nhật danh mục:', id, name);
    navigate('/admin/categories');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sửa danh mục #{id}</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Cập nhật
      </button>
    </div>
  );
};
