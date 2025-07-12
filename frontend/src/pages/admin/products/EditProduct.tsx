import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

type Category = {
  _id: string;
  name: string;
};

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    images: [] as string[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Tải dữ liệu khi vào trang
  useEffect(() => {
    fetchCategories();
    fetchProductDetail();
  }, []);

  const fetchCategories = async () => {
    const res = await instanceAxios.get("/api/categories");
    setCategories(res.data);
  };

  const fetchProductDetail = async () => {
    const res = await instanceAxios.get(`/api/products/${id}`);
    const product = res.data;

    setFormData({
      name: product.name,
      description: product.description,
      category_id: product.category_id?._id || "",
      images: product.images,
    });

    setImagePreviews(product.images);
    setVariants(product.variants);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update product
      await instanceAxios.put(`/api/products/${id}`, {
        name: formData.name,
        description: formData.description,
        category_id: formData.category_id,
      });

      // Update variants
      for (const variant of variants) {
        await instanceAxios.put(`/api/product-variant/${variant._id}`, {
          price: variant.price,
          import_price: variant.import_price,
          sku: variant.sku,
          stock_quantity: variant.stock_quantity,
          attributes: variant.attributes,
        });
      }

      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert(err.response?.data.message || "Có lỗi xảy ra.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Danh mục</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ảnh sản phẩm</label>
          <div className="flex gap-2 flex-wrap mt-2">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Biến thể */}
        {variants.length > 0 && (
          <>
            <h3 className="font-semibold text-lg mt-6">Danh sách Biến thể</h3>
            <table className="w-full border text-sm mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">SKU</th>
                  <th className="border p-2">Giá nhập</th>
                  <th className="border p-2">Giá bán</th>
                  <th className="border p-2">Kho</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Màu</th>
                  <th className="border p-2">Kích thước</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, index) => (
                  <tr key={v._id}>
                    <td className="border p-2">
                      <input
                        value={v.sku}
                        onChange={(e) =>
                          handleVariantChange(index, "sku", e.target.value)
                        }
                        className="border p-1 rounded w-24"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={v.import_price}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "import_price",
                            Number(e.target.value)
                          )
                        }
                        className="border p-1 rounded w-20"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={v.price}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        className="border p-1 rounded w-20"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={v.stock_quantity}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "stock_quantity",
                            Number(e.target.value)
                          )
                        }
                        className="border p-1 rounded w-16"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={v.attributes.size}
                        onChange={(e) =>
                          handleVariantChange(index, "attributes", {
                            ...v.attributes,
                            size: e.target.value,
                          })
                        }
                        className="border p-1 rounded w-16"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={v.attributes.color}
                        onChange={(e) =>
                          handleVariantChange(index, "attributes", {
                            ...v.attributes,
                            color: e.target.value,
                          })
                        }
                        className="border p-1 rounded w-16"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={v.attributes.dimensions}
                        onChange={(e) =>
                          handleVariantChange(index, "attributes", {
                            ...v.attributes,
                            dimensions: e.target.value,
                          })
                        }
                        className="border p-1 rounded w-24"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded mt-6"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
