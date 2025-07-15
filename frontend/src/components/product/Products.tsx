import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import instanceAxios from "../../utils/instanceAxios";
import { Product } from "../../types";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}

interface ProductGroup {
  category: string;
  products: ProductCard[];
}

const Products = () => {
  const [productData, setProductData] = useState<ProductGroup[]>([]);
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data }: { data: Product[] } = await instanceAxios.get("/api/products");

        const groupedData: ProductGroup[] = [];

        data.forEach((product) => {
          const category =
            typeof product.category_id === "object" && product.category_id?.name
              ? product.category_id.name
              : "Khác";

          let group = groupedData.find((g) => g.category === category);
          if (!group) {
            group = { category, products: [] };
            groupedData.push(group);
          }

          const variant = product.variants?.[0];
          const price = variant?.discount_price ?? variant?.price ?? product.salePrice ?? product.price ?? 0;
          const oldPrice = variant?.discount_price ? variant?.price : undefined;
          const image = product.images?.[0] ?? "/placeholder.jpg";

          group.products.push({
            id: product._id,
            name: product.name,
            price,
            oldPrice,
            image,
          });
        });

        setProductData(groupedData);
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
      <h2 className="text-3xl font-bold text-center text-amber-900 mb-6">Sản Phẩm Chính</h2>

      {productData.map((group, index) => (
        <div key={index} className="mb-12">
          <div className="flex items-center justify-between mb-5 px-2">
            <h3 className="text-2xl font-semibold text-gray-800">{group.category}</h3>
            <div className="space-x-2">
              <button onClick={() => scrollLeft(index)}> ‹ </button>
              <button onClick={() => scrollRight(index)}> › </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={(el) => (scrollRefs.current[index] = el)}
              className="flex overflow-x-auto space-x-6 pl-4 pr-4 pb-2 scroll-smooth no-scrollbar"
            >
              {group.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="relative w-[270px] flex-shrink-0 bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h4>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button className="text-gray-600 hover:text-pink-600 font-medium underline">
          Xem thêm các sản phẩm khác
        </button>
      </div>
    </div>
  );
};

export default Products;
