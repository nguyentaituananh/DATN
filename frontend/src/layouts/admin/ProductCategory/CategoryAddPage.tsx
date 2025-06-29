import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CategoryAddPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    console.log('Thêm danh mục:', name);
    navigate('/admin/categories');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thêm danh mục</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Tên danh mục"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Thêm
      </button>
    </div>
  );
};
