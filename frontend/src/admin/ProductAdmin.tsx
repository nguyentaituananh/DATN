import React, { useState, useEffect } from "react";
import instanceAxios from "../utils/instanceAxios";
import { Link } from "react-router";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  parent_category_id: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IProductApi {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  images: string[];
  category_id: ICategory;
  related_products: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IProductDisplay {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  promotionPrice: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

const ProductAdmin: React.FC = () => {
  const [products, setProducts] = useState<IProductDisplay[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await instanceAxios.get<IProductApi[]>(
          "/api/products"
        );
        const formattedProducts: IProductDisplay[] = data.map((product) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          originalPrice: product.price,
          promotionPrice: product.discount_price,
          imageUrl:
            product.images && product.images.length > 0
              ? product.images[0]
              : "placeholder.jpg",
          category: product.category_id ? product.category_id.name : "N/A",
          createdAt: product.createdAt,
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleEdit = (id: string) => {
    console.log("Sửa sản phẩm với id:", id);
    // Ví dụ: chuyển trang hoặc mở modal edit
  };

  const handleDelete = (id: string) => {
    console.log("Xóa sản phẩm với id:", id);
    // Ví dụ: gọi API xóa hoặc confirm dialog
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Đang tải sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Lỗi: {error}
      </div>
    );
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Quản Lý Sản Phẩm
      </h2>

      <table
        border={1}
        cellPadding={10}
        cellSpacing={0}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá gốc</th>
            <th>Giá khuyến mãi</th>
            <th>Ảnh sản phẩm</th>
            <th>Danh mục</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.originalPrice)}
                </td>
                <td>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.promotionPrice)}
                </td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width="100"
                    style={{
                      display: "block",
                      margin: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    }}
                  />
                </td>
                <td>{product.category}</td>
                <td>{new Date(product.createdAt).toLocaleString("vi-VN")}</td>
                <td>
                  <Link to={`edit/${product.id}`}>
                    <button
                      onClick={() => handleEdit(product.id)}
                      style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Sửa
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                Hiện chưa có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductAdmin;
