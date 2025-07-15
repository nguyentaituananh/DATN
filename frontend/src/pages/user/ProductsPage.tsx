import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/productApi";
import { Product } from "../../types";
import ProductGrid from "../../components/product/ProductGirt";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();

        console.log("✅ Fetched products (array):", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("⚠️ API did not return an array:", data);
        }
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>Không có sản phẩm.</p>
      )}
    </div>
  );
};

export default ProductsPage;
