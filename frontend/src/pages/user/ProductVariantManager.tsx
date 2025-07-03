import React, { useState } from "react";

const ProductVariantForm = () => {
  const [selectedAttributes, setSelectedAttributes] = useState({
    color: "",
    size: "",
    material: "",
  });
  type Variant = {
    color: string;
    size: string;
    material: string;
    price: number;
    salePrice: number;
    stock: number;
  };

  const [variants, setVariants] = useState<Variant[]>([]);

  const handleAddVariant = () => {
    if (!selectedAttributes.color || !selectedAttributes.size) {
      alert("Chọn đủ Màu và Size!");
      return;
    }

    const exists = variants.find(
      (v) =>
        v.color === selectedAttributes.color &&
        v.size === selectedAttributes.size &&
        v.material === selectedAttributes.material
    );
    if (exists) {
      alert("Biến thể này đã tồn tại!");
      return;
    }

    setVariants([
      ...variants,
      {
        ...selectedAttributes,
        price: 0,
        salePrice: 0,
        stock: 0,
      },
    ]);
  };

  interface HandleChangeVariantField {
    price: number;
    salePrice: number;
    stock: number;
  }

  const handleChangeVariant = (
    index: number,
    field: keyof HandleChangeVariantField,
    value: string | number
  ) => {
    const updated = [...variants];
    updated[index][field] = Number(value);
    setVariants(updated);
  };

  const totalValue = variants.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tạo Biến Thể Sản Phẩm</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <select
          value={selectedAttributes.color}
          onChange={(e) =>
            setSelectedAttributes({
              ...selectedAttributes,
              color: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Chọn Màu</option>
          <option value="Đỏ">Đỏ</option>
          <option value="Xanh">Xanh</option>
          <option value="Vàng">Vàng</option>
        </select>

        <select
          value={selectedAttributes.size}
          onChange={(e) =>
            setSelectedAttributes({
              ...selectedAttributes,
              size: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Chọn Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <select
          value={selectedAttributes.material}
          onChange={(e) =>
            setSelectedAttributes({
              ...selectedAttributes,
              material: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Chọn Chất liệu</option>
          <option value="Cotton">Cotton</option>
          <option value="Len">Len</option>
          <option value="Lụa">Lụa</option>
        </select>
      </div>

      <button
        onClick={handleAddVariant}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Thêm biến thể
      </button>

      {/* Bảng hiển thị biến thể */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border p-2">Màu</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Chất liệu</th>
            <th className="border p-2">Giá bán</th>
            <th className="border p-2">Giá KM</th>
            <th className="border p-2">Tồn kho</th>
            <th className="border p-2">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{variant.color}</td>
              <td className="border p-2">{variant.size}</td>
              <td className="border p-2">{variant.material}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    handleChangeVariant(index, "price", e.target.value)
                  }
                  className="border p-1 w-24"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={variant.salePrice}
                  onChange={(e) =>
                    handleChangeVariant(index, "salePrice", e.target.value)
                  }
                  className="border p-1 w-24"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleChangeVariant(index, "stock", e.target.value)
                  }
                  className="border p-1 w-20"
                />
              </td>
              <td className="border p-2">{variant.price * variant.stock} đ</td>
            </tr>
          ))}

          {variants.length === 0 && (
            <tr>
              <td colSpan={7} className="border p-4 text-center">
                Chưa có biến thể nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-right font-semibold text-lg mt-4">
        Tổng giá trị: <span className="text-blue-600">{totalValue} đ</span>
      </div>
    </div>
  );
};

export default ProductVariantForm;
