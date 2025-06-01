import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGroup {
  category: string;
  sofas?: Product[];
  cabinet?: Product[];
  chairs?: Product[];
  tables?: Product[];
  // ... có thể mở rộng nếu có nhóm khác
}

const Products = () => {
  const [productData, setProductData] = useState<ProductGroup[]>([]);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get<ProductGroup[]>(
          "http://localhost:5000/products"
        );
        setProductData(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetch();
  }, []);

  const scrollLeft = (index: number) => {
    const el = scrollRefs.current[index];
    if (el) el.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (index: number) => {
    const el = scrollRefs.current[index];
    if (el) el.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-[1300px] mx-auto">
      <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">
        Sản Phẩm Chính
      </h2>

      {productData.map((group, index) => {
        // Lấy danh sách sản phẩm của nhóm (dữ liệu trong group có thể là sofas, cabinet, chairs, tables)
        // Chúng ta cần lấy array nào đó có sản phẩm
        const products =
          group.sofas || group.cabinet || group.chairs || group.tables || [];

        return (
          <div key={index} className="mb-12">
            <div className="flex items-center justify-between mb-5 px-2">
              <h3 className="text-2xl font-semibold text-gray-800">
                {group.category}
              </h3>
              <div className="space-x-2">
                <button
                  onClick={() => scrollLeft(index)}
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-xl"
                  aria-label={`Scroll left ${group.category}`}
                >
                  ‹
                </button>
                <button
                  onClick={() => scrollRight(index)}
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-xl"
                  aria-label={`Scroll right ${group.category}`}
                >
                  ›
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                ref={(el) => {
                  scrollRefs.current[index] = el;
                }}
                className="flex overflow-x-auto space-x-6 pl-4 pr-4 pb-2 scroll-smooth no-scrollbar"
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="relative w-[270px] flex-shrink-0 bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        NEW
                      </span>
                    )}
                    {product.isSale && (
                      <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        SALE
                      </span>
                    )}

                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 font-bold text-base">
                          {product.price.toLocaleString()} đ
                        </span>
                        {product.oldPrice && (
                          <span className="line-through text-gray-400 text-sm">
                            {product.oldPrice.toLocaleString()} đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <div className="text-center mt-8">
        <button className="text-gray-600 hover:text-pink-600 font-medium underline">
          Xem thêm các sản phẩm khác
        </button>
      </div>
    </div>
  );
};

export default Products;
