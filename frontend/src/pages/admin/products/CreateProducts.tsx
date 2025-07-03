import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

type Category = {
  _id: string;
  name: string;
};

const CreateProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    images: [] as File[],
  });
  const [variants, setVariants] = useState<any[]>([]);
  const [variantForm, setVariantForm] = useState({
    sku: "",
    import_price: 0,
    price: 0,
    stock_quantity: 0,
    size: "",
    color: "",
    dimensions: "",
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await instanceAxios.get("/api/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const selectedFiles = Array.from(files) as File[];
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...selectedFiles],
      }));
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addVariant = () => {
    const { sku, import_price, price, stock_quantity } = variantForm;
    if (!sku) return alert("Vui lòng nhập Mã SKU.");
    if (import_price <= 0) return alert("Giá nhập phải lớn hơn 0.");
    if (price <= 0) return alert("Giá bán phải lớn hơn 0.");
    if (stock_quantity <= 0) return alert("Tồn kho phải lớn hơn 0.");
    setVariants([...variants, { ...variantForm }]);
    setVariantForm({
      sku: "",
      import_price: 0,
      price: 0,
      stock_quantity: 0,
      size: "",
      color: "",
      dimensions: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category_id) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category_id", formData.category_id);
      formData.images.forEach((file) => productData.append("images", file));

      const productRes = await instanceAxios.post(
        "/api/products",
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const productId = productRes.data._id;

      for (const variant of variants) {
        const attributes = {
          size: variant.size,
          color: variant.color,
          dimensions: variant.dimensions,
        };
        await instanceAxios.post("/api/product-variant", {
          product_id: productId,
          attributes,
          price: variant.price,
          import_price: variant.import_price,
          sku: variant.sku,
          stock_quantity: variant.stock_quantity,
        });
      }

      alert("Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert(err.response?.data.message || "Có lỗi xảy ra.");
    }
  };

  const showVariants = ["Sofas", "Chairs", "Tables", "Cabinet"].includes(
    categories.find((c) => c._id === formData.category_id)?.name || ""
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Thêm Sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />
        <div className="flex gap-2 flex-wrap">
          {imagePreviews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>

        {showVariants && (
          <>
            <h3 className="font-semibold text-lg mt-6">Thông tin Biến thể</h3>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Mã SKU"
                value={variantForm.sku}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, sku: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Giá nhập (giá vốn)"
                value={variantForm.import_price}
                onChange={(e) =>
                  setVariantForm({
                    ...variantForm,
                    import_price: Number(e.target.value),
                  })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Giá bán"
                value={variantForm.price}
                onChange={(e) =>
                  setVariantForm({
                    ...variantForm,
                    price: Number(e.target.value),
                  })
                }
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Tồn kho"
                value={variantForm.stock_quantity}
                onChange={(e) =>
                  setVariantForm({
                    ...variantForm,
                    stock_quantity: Number(e.target.value),
                  })
                }
                className="border p-2 rounded"
              />
              <select
                value={variantForm.size}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, size: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Chọn Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <select
                value={variantForm.color}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, color: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Chọn Màu</option>
                <option value="Đỏ">Đỏ</option>
                <option value="Xanh">Xanh</option>
                <option value="Vàng">Vàng</option>
                <option value="Nâu">Nâu</option>
                <option value="Xám">Xám</option>
              </select>
              <select
                value={variantForm.dimensions}
                onChange={(e) =>
                  setVariantForm({ ...variantForm, dimensions: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Chọn Kích thước</option>
                <option value="180x80x90cm">180x80x90cm</option>
                <option value="200x90x75cm">200x90x75cm</option>
                <option value="120x60x75cm">120x60x75cm</option>
                <option value="100x50x70cm">100x50x70cm</option>
                <option value="250x100x80cm">250x100x80cm</option>
              </select>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="bg-green-600 text-white px-4 py-2 rounded mt-3"
            >
              Thêm biến thể
            </button>

            {variants.length > 0 && (
              <table className="w-full border mt-4">
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
                  {variants.map((v, i) => (
                    <tr key={i}>
                      <td className="border p-2">{v.sku}</td>
                      <td className="border p-2">{v.import_price}</td>
                      <td className="border p-2">{v.price}</td>
                      <td className="border p-2">{v.stock_quantity}</td>
                      <td className="border p-2">{v.size}</td>
                      <td className="border p-2">{v.color}</td>
                      <td className="border p-2">{v.dimensions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded"
        >
          Tạo sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
