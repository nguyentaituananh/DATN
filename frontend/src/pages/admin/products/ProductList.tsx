import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

// Kiểu dữ liệu cho Biến thể
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

// Kiểu dữ liệu cho Sản phẩm
type Product = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  discount_price?: number;
  category_id: { name: string };
  related_products?: { _id: string; name: string }[];
  variants: Variant[];
  createdAt: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await instanceAxios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm xoá sản phẩm
  const deleteProduct = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
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
                  <th className="p-3 border">Giá bán</th>
                  <th className="p-3 border">Giá KM</th>
                  <th className="p-3 border">Ảnh</th>
                  <th className="p-3 border">Danh mục</th>
                  <th className="p-3 border">Liên quan</th>
                  <th className="p-3 border">Biến thể</th>
                  <th className="p-3 border">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="text-center">
                    {/* Tên sản phẩm */}
                    <td className="p-3 border font-semibold">{product.name}</td>

                    {/* Giá bán */}
                    <td className="p-3 border text-blue-600 font-medium">
                      {product.price !== undefined
                        ? product.price.toLocaleString() + "₫"
                        : "—"}
                    </td>

                    {/* Giá khuyến mãi */}
                    <td className="p-3 border text-red-500">
                      {product.discount_price !== undefined
                        ? product.discount_price.toLocaleString() + "₫"
                        : "—"}
                    </td>

                    {/* Ảnh */}
                    <td className="p-3 border flex gap-2 justify-center flex-wrap">
                      {product.images.length > 0 ? (
                        product.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img || "https://via.placeholder.com/60"}
                            alt="product"
                            className="w-12 h-12 rounded object-cover border"
                          />
                        ))
                      ) : (
                        <span className="text-gray-400 italic">
                          Không có ảnh
                        </span>
                      )}
                    </td>

                    {/* Danh mục */}
                    <td className="p-3 border">{product.category_id.name}</td>

                    {/* Sản phẩm liên quan */}
                    <td className="p-3 border">
                      {product.related_products &&
                      product.related_products.length > 0
                        ? product.related_products.map((p) => p.name).join(", ")
                        : "—"}
                    </td>

                    {/* Biến thể */}
                    <td className="p-3 border text-left">
                      {product.variants.length > 0 ? (
                        product.variants.map((v) => (
                          <div key={v._id} className="mb-2 text-sm">
                            <div>
                              <span className="font-semibold">SKU:</span>{" "}
                              {v.sku}
                            </div>
                            <div>
                              <span className="font-semibold">Size:</span>{" "}
                              {v.attributes.size || "—"}
                              <span className="font-semibold ml-2">
                                Màu:
                              </span>{" "}
                              {v.attributes.color || "—"}
                              <span className="font-semibold ml-2">
                                Kích thước:
                              </span>{" "}
                              {v.attributes.dimensions || "—"}
                            </div>
                            <div>
                              <span className="font-semibold">Giá:</span>{" "}
                              {v.price !== undefined
                                ? v.price.toLocaleString() + "₫"
                                : "Chưa có giá"}
                              <span className="font-semibold ml-2">Kho:</span>{" "}
                              {v.stock_quantity}
                            </div>
                            <hr className="my-1 border-gray-300" />
                          </div>
                        ))
                      ) : (
                        <span className="italic text-gray-400">Không có</span>
                      )}
                    </td>

                    {/* Hành động */}
                    <td className="p-3 border flex gap-2 justify-center">
                      <Link to={`edit/${product._id}`}>
                        <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
                          Sửa
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Nếu không có sản phẩm */}
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
