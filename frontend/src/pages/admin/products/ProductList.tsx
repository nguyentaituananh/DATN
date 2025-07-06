import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

type Variant = {
  _id: string;
  sku: string;
  attributes: {
    size: string;
    color: string;
    dimensions: string;
  };
  price: number;
  stock_quantity: number;
};

type Product = {
  _id: string;
  name: string;
  images: string[];
  category_id: { name: string };
  createdAt: string;
  variants: Variant[];
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await instanceAxios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải sản phẩm.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      try {
        await instanceAxios.delete(`/api/products/${id}`);
        fetchProducts();
        alert("Đã xoá sản phẩm.");
      } catch (err) {
        console.error(err);
        alert("Xoá thất bại.");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">📦 Danh sách sản phẩm</h2>
        <Link
          to="/admin/product/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3 w-24 text-center">Ảnh</th>
              <th className="border p-3">Tên sản phẩm</th>
              <th className="border p-3">Danh mục</th>
              <th className="border p-3">Biến thể</th>
              <th className="border p-3">Ngày tạo</th>
              <th className="border p-3 w-44 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 align-top">
                <td className="border p-2 text-center">
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt=""
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 mx-auto rounded">
                      No Image
                    </div>
                  )}
                </td>
                <td className="border p-3 font-medium">{item.name}</td>
                <td className="border p-3">{item.category_id?.name}</td>

                <td className="border p-3">
                  {item.variants.length > 0 ? (
                    <div className="space-y-1">
                      {item.variants.map((v) => (
                        <div
                          key={v._id}
                          className="p-2 border rounded bg-gray-50 text-xs"
                        >
                          <div>
                            <strong>SKU:</strong> {v.sku}
                          </div>
                          <div>
                            <strong>Size:</strong> {v.attributes.size} |{" "}
                            <strong>Màu:</strong> {v.attributes.color}
                          </div>
                          <div>
                            <strong>Giá:</strong> {v.price.toLocaleString()} đ
                          </div>
                          <div>
                            <strong>Tồn kho:</strong> {v.stock_quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Không có</span>
                  )}
                </td>

                <td className="border p-3">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="border p-2 flex gap-2 justify-center">
                  <Link
                    to={`/admin/product/edit/${item._id}`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            Chưa có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
