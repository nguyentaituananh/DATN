// import React, { useEffect, useState } from "react";
// import instanceAxios from "../../../utils/instanceAxios";
// import { Link } from "react-router-dom";

// interface Variant {
//   _id: string;
//   size?: string;
//   color?: string;
//   stock: number;
//   price: number;
// }

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   discount_price?: number;
//   images: string[];
//   category_id: {
//     _id: string;
//     name: string;
//   };
//   related_products: {
//     _id: string;
//     name: string;
//   }[];
//   variants?: Variant[];
// }

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await instanceAxios.get(`/api/products`);
//       setProducts(data);
//     } catch (error) {
//       console.error("Lỗi khi lấy sản phẩm:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
//       try {
//         await instanceAxios.delete(`api/products/${id}`);
//         alert("Đã xóa sản phẩm!");
//         fetchProducts();
//       } catch (error) {
//         console.error("Lỗi khi xóa sản phẩm:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Danh sách sản phẩm
//           </h2>
//           <Link to={`add`}>
//             <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 shadow-md">
//               + Thêm sản phẩm
//             </button>
//           </Link>
//         </div>

//         {loading ? (
//           <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-3 border">Tên</th>
//                   <th className="p-3 border">Giá</th>
//                   <th className="p-3 border">Giá KM</th>
//                   <th className="p-3 border">Ảnh</th>
//                   <th className="p-3 border">Danh mục</th>
//                   <th className="p-3 border">Liên quan</th>
//                   <th className="p-3 border">Biến thể</th>
//                   <th className="p-3 border">Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product._id} className="text-center">
//                     <td className="p-3 border font-semibold">{product.name}</td>
//                     <td className="p-3 border text-blue-600 font-medium">
//                       {product.price.toLocaleString()}₫
//                     </td>
//                     <td className="p-3 border text-red-500">
//                       {product.discount_price
//                         ? product.discount_price.toLocaleString() + "₫"
//                         : "—"}
//                     </td>
//                     <td className="p-3 border flex gap-2 justify-center flex-wrap">
//                       {product.images.map((img, idx) => (
//                         <img
//                           key={idx}
//                           src={img || "https://via.placeholder.com/60"}
//                           alt="product"
//                           className="w-12 h-12 rounded object-cover border"
//                         />
//                       ))}
//                     </td>
//                     <td className="p-3 border">{product.category_id.name}</td>
//                     <td className="p-3 border">
//                       {product.related_products.length > 0
//                         ? product.related_products.map((p) => p.name).join(", ")
//                         : "—"}
//                     </td>
//                     <td className="p-3 border text-left">
//                       {product.variants && product.variants.length > 0
//                         ? product.variants.map((v) => (
//                             <div key={v._id} className="mb-1">
//                               <span className="font-semibold">Size:</span>{" "}
//                               {v.size || "—"},
//                               <span className="font-semibold ml-1">Màu:</span>{" "}
//                               {v.color || "—"},
//                               <span className="font-semibold ml-1">Giá:</span>{" "}
//                               {v.price.toLocaleString()}₫,
//                               <span className="font-semibold ml-1">
//                                 Kho:
//                               </span>{" "}
//                               {v.stock}
//                             </div>
//                           ))
//                         : "Không có"}
//                     </td>
//                     <td className="p-3 border flex gap-2 justify-center">
//                       <Link to={`edit/${product._id}`}>
//                         <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
//                           Sửa
//                         </button>
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                       >
//                         Xóa
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//                 {products.length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="p-4 text-center text-gray-500">
//                       Không có sản phẩm nào.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from "react";
import instanceAxios from "../../../utils/instanceAxios";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Variant {
  _id: string;
  size?: string;
  color?: string;
  stock: number;
  price: number;
}

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
  variants?: Variant[];
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
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            📦 Danh sách sản phẩm
          </h2>
          <Link to={`add`}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-md">
              <Plus size={18} />
              Thêm sản phẩm
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10 text-lg">
            ⏳ Đang tải dữ liệu...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-4 border">Tên</th>
                  <th className="p-4 border">Giá</th>
                  <th className="p-4 border">Giá KM</th>
                  <th className="p-4 border">Ảnh</th>
                  <th className="p-4 border">Danh mục</th>
                  <th className="p-4 border">Liên quan</th>
                  <th className="p-4 border">Biến thể</th>
                  <th className="p-4 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-400">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white hover:bg-gray-50 transition"
                    >
                      <td className="p-4 border font-medium">{product.name}</td>
                      <td className="p-4 border text-blue-600 font-semibold">
                        {product.price.toLocaleString()}₫
                      </td>
                      <td className="p-4 border text-red-500 font-medium">
                        {product.discount_price
                          ? product.discount_price.toLocaleString() + "₫"
                          : "—"}
                      </td>
                      <td className="p-4 border">
                        <div className="flex gap-2 flex-wrap justify-center">
                          {product.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img || "https://via.placeholder.com/60"}
                              alt="product"
                              className="w-12 h-12 object-cover rounded border"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        {product.category_id?.name || "—"}
                      </td>
                      <td className="p-4 border text-sm text-gray-700">
                        {product.related_products.length > 0
                          ? product.related_products.map((p) => p.name).join(", ")
                          : "—"}
                      </td>
                      <td className="p-4 border text-left text-sm">
                        {product.variants && product.variants.length > 0 ? (
                          <div className="space-y-1">
                            {product.variants.map((v) => (
                              <div key={v._id}>
                                <span className="font-semibold">Size:</span>{" "}
                                {v.size || "—"},{" "}
                                <span className="font-semibold">Màu:</span>{" "}
                                {v.color || "—"},{" "}
                                <span className="font-semibold">Giá:</span>{" "}
                                {v.price.toLocaleString()}₫,{" "}
                                <span className="font-semibold">Kho:</span>{" "}
                                {v.stock}
                              </div>
                            ))}
                          </div>
                        ) : (
                          "Không có"
                        )}
                      </td>
                      <td className="p-4 border">
                        <div className="flex gap-2 justify-center">
                          <Link to={`edit/${product._id}`}>
                            <button className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-sm">
                              <Pencil size={14} />
                              Sửa
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                          >
                            <Trash2 size={14} />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
