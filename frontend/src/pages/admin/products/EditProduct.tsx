import React, { useState, useEffect } from "react";

type FormData = {
  name: string;
  description: string;
  price: number;
  discount_price: number;
  images: File[];
  oldImages: string[];
  category_id: string;
  type: string;
  size: string;
  color: string;
  dimensions: string;
  related_products: string[];
};

type Props = {
  product: FormData;
};

const EditProduct = ({ product }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    ...product,
    images: [],
  });

  useEffect(() => {
    setFormData({ ...product, images: [] });
  }, [product]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type, files, checked } = e.target as HTMLInputElement;
    if (type === "file") {
      setFormData({ ...formData, images: files ? Array.from(files) : [] });
    } else if (type === "checkbox") {
      const selected = [...formData.related_products];
      if (checked) {
        selected.push(value);
      } else {
        const index = selected.indexOf(value);
        if (index > -1) selected.splice(index, 1);
      }
      setFormData({ ...formData, related_products: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated product data:", formData);
    // TODO: call PUT API
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Chỉnh sửa sản phẩm
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Loại sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại sản phẩm
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Chọn loại</option>
              <option value="sofa">Sofa</option>
              <option value="cabinet">Cabinet</option>
              <option value="chair">Chair</option>
              <option value="table">Table</option>
            </select>
          </div>

          {/* Các trường chi tiết */}
          {formData.type && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Màu sắc
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kích thước
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            </>
          )}

          {/* Giá */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá khuyến mãi
              </label>
              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Ảnh cũ */}
          {formData.oldImages.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ảnh hiện tại
              </label>
              <div className="flex gap-4 flex-wrap">
                {formData.oldImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="old"
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Thêm ảnh mới */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thêm ảnh mới
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Sản phẩm liên quan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm liên quan
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                // giả lập danh sách liên quan
                { id: "1", name: "Sofa Teddy" },
                { id: "2", name: "Chair Classic" },
                { id: "3", name: "Cabinet Oak" },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={formData.related_products.includes(item.id)}
                    onChange={handleChange}
                    className="text-blue-600 rounded"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition"
            >
              Lưu chỉnh sửa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
