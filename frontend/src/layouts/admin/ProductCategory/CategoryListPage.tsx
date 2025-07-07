import { Link } from 'react-router-dom';

const mockData = [
  { id: 1, name: 'Bàn' },
  { id: 2, name: 'Ghế' },
];

export const CategoryListPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách danh mục</h1>

      <Link
        to="/admin/categories/add"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Thêm danh mục
      </Link>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên danh mục</th>
            <th className="border p-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(cat => (
            <tr key={cat.id}>
              <td className="border p-2">{cat.id}</td>
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2 space-x-2">
                <Link
                  to={`/admin/categories/edit/${cat.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </Link>
                <Link
                  to={`/admin/categories/delete/${cat.id}`}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xoá
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
