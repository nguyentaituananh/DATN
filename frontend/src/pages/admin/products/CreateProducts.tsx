import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instanceAxios from "../../../utils/instanceAxios";

type Category = {
  _id: string;
  name: string;
};

type FormDataType = {
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  images: File[];
  category_id: string;
  size?: string;
  color?: string;
  dimensions?: string;
};

const CreateProducts = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    price: 0,
    images: [],
    category_id: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await instanceAxios.get("/api/categories");
    setCategories(data);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file") {
      const selectedFiles = files ? Array.from(files) : [];
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...selectedFiles],
      }));

      // Load preview ảnh
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...previewUrls]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category_id
    ) {
      alert("Vui lòng nhập đầy đủ Tên, Mô tả, Giá và Danh mục.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      if (formData.discount_price)
        data.append("discount_price", formData.discount_price.toString());
      data.append("category_id", formData.category_id);
      if (formData.size) data.append("size", formData.size);
      if (formData.color) data.append("color", formData.color);
      if (formData.dimensions) data.append("dimensions", formData.dimensions);

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      await instanceAxios.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tạo sản phẩm thành công!");
      navigate("/admin/product");
    } catch (error: any) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error.response?.data || error);
      alert(error.response?.data.message || "Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  const selectedCategory = categories.find(
    (cate) => cate._id === formData.category_id
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Tạo Sản Phẩm</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả"
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cate) => (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>

          {/* Biến thể theo danh mục */}
          {(selectedCategory?.name === "Sofas" ||
            selectedCategory?.name === "Chairs") && (
            <>
              <input
                type="text"
                name="size"
                value={formData.size || ""}
                onChange={handleChange}
                placeholder="Size (VD: L, M, S)"
                className="w-full border rounded-xl px-4 py-3"
              />
              <input
                type="text"
                name="color"
                value={formData.color || ""}
                onChange={handleChange}
                placeholder="Màu sắc"
                className="w-full border rounded-xl px-4 py-3"
              />
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions || ""}
                onChange={handleChange}
                placeholder="Kích thước (VD: 180x80x90cm)"
                className="w-full border rounded-xl px-4 py-3"
              />
            </>
          )}

          {(selectedCategory?.name === "Tables" ||
            selectedCategory?.name === "Cabinet") && (
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions || ""}
              onChange={handleChange}
              placeholder="Kích thước (VD: 200x90x75cm)"
              className="w-full border rounded-xl px-4 py-3"
            />
          )}

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          {/* Preview ảnh */}
          <div className="flex gap-3 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Giá"
              className="w-full border rounded-xl px-4 py-3"
              required
            />
            <input
              type="number"
              name="discount_price"
              value={formData.discount_price || ""}
              onChange={handleChange}
              placeholder="Giá khuyến mãi"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
