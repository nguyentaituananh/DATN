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
    price: 0,
    discount_price: 0,
    category_id: "",
    images: [] as File[],
    sku: "",
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
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate sản phẩm
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category_id
    ) {
      alert("Vui lòng nhập đủ Tên, Mô tả, Giá và Danh mục.");
      return;
    }

    try {
      // Tạo form data cho product
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price.toString());
      productData.append("discount_price", formData.discount_price.toString());
      productData.append("category_id", formData.category_id);
      formData.images.forEach((file) => productData.append("images", file));

      // Gửi product
      const productRes = await instanceAxios.post(
        "/api/products",
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const productId = productRes.data._id;

      // Nếu có variant
      if (showVariants) {
        // Validate variant
        if (!formData.sku.trim()) {
          alert("SKU không được để trống.");
          return;
        }
        if (formData.stock_quantity <= 0) {
          alert("Số lượng tồn kho phải lớn hơn 0.");
          return;
        }

        // Tạo attributes cho variant
        const attributes = {
          size: formData.size,
          color: formData.color,
          dimensions: formData.dimensions,
        };

        // In log payload kiểm tra trước khi gửi
        console.log("Payload gửi variant:", {
          product_id: productId,
          attributes,
          price: formData.price,
          sku: formData.sku,
          stock_quantity: formData.stock_quantity,
        });

        // Gửi product-variant
        await instanceAxios.post("/api/product-variant", {
          product_id: productId,
          attributes,
          price: formData.price,
          sku: formData.sku,
          stock_quantity: formData.stock_quantity,
        });
      }

      alert("Tạo sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err: any) {
      console.error("❌ Lỗi:", err.response?.data || err);
      alert(err.response?.data.message || "Có lỗi khi thêm sản phẩm.");
    }
  };

  const showVariants = ["Sofas", "Chairs", "Tables", "Cabinet"].includes(
    categories.find((c) => c._id === formData.category_id)?.name || ""
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
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
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />
        <input
          type="number"
          name="discount_price"
          placeholder="Giá khuyến mãi"
          value={formData.discount_price}
          onChange={handleChange}
          className="border p-3 w-full rounded"
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
          name="images"
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
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="border p-3 w-full rounded"
            >
              <option value="">Chọn Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <select
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="border p-3 w-full rounded"
            >
              <option value="">Chọn Màu</option>
              <option value="Đen">Đen</option>
              <option value="Trắng">Trắng</option>
              <option value="Xám">Xám</option>
              <option value="Nâu">Nâu</option>
              <option value="Xanh">Xanh</option>
            </select>

            <select
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="border p-3 w-full rounded"
            >
              <option value="">Chọn Kích thước</option>
              <option value="180x80x90cm">180x80x90cm</option>
              <option value="200x90x75cm">200x90x75cm</option>
              <option value="120x60x75cm">120x60x75cm</option>
              <option value="100x50x70cm">100x50x70cm</option>
              <option value="250x100x80cm">250x100x80cm</option>
            </select>

            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />

            <input
              type="number"
              name="stock_quantity"
              placeholder="Số lượng tồn kho"
              value={formData.stock_quantity}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
        >
          Tạo sản phẩm
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
