import React, { useEffect, useState } from "react";
import axios from "axios";
import instanceAxios from "../../../utils/instanceAxios";
import { Link } from "react-router";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  images: string[];
  category_id: {
    _id: string;
    name: string;
  };
  related_products: {
    _id: string;
    name: string;
  }[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await instanceAxios.get(`/api/products`);
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await instanceAxios.delete(`api/products/${id}`);
        alert("Đã xóa sản phẩm!");
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Danh sách sản phẩm
          </h2>
          <Link to={`add`}>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-md">
              + Thêm sản phẩm
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Tên</th>
                  <th className="p-3 border">Mô tả</th>
                  <th className="p-3 border">Giá</th>
                  <th className="p-3 border">Giá KM</th>
                  <th className="p-3 border">Ảnh</th>
                  <th className="p-3 border">Danh mục</th>
                  <th className="p-3 border">Liên quan</th>
                  <th className="p-3 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border font-semibold">{product.name}</td>
                    <td className="p-3 border">{product.description}</td>
                    <td className="p-3 border text-blue-600 font-medium">
                      {product.price.toLocaleString()}₫
                    </td>
                    <td className="p-3 border text-red-500">
                      {product.discount_price
                        ? product.discount_price.toLocaleString() + "₫"
                        : "—"}
                    </td>
                    <td className="p-3 border flex gap-2 justify-center flex-wrap">
                      {product.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "https://via.placeholder.com/60"}
                          alt="product"
                          className="w-12 h-12 rounded object-cover border"
                        />
                      ))}
                    </td>
                    <td className="p-3 border">{product.category_id.name}</td>
                    <td className="p-3 border">
                      {product.related_products.length > 0
                        ? product.related_products.map((p) => p.name).join(", ")
                        : "—"}
                    </td>
                    <td className="p-3 border flex gap-2 justify-center">
                      <Link to={`edit/${product._id}`}>
                        <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
                          Sửa
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
