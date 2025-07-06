import React, { useEffect, useState } from "react";
import instanceAxios from "../../../utils/instanceAxios";

const CreateOrder = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orderData, setOrderData] = useState({
    user_id: "",
    shipping_address: "",
    products: [] as any[],
  });

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await instanceAxios.get("/api/users");
      setUsers(userRes.data);
      const productRes = await instanceAxios.get("/api/products");
      setProducts(productRes.data);
    };
    fetchData();
  }, []);

  const addProduct = () => {
    setOrderData({
      ...orderData,
      products: [
        ...orderData.products,
        { product_id: "", quantity: 1, price: 0 },
      ],
    });
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const newProducts = [...orderData.products];
    newProducts[index][field] = value;
    setOrderData({ ...orderData, products: newProducts });
  };

  const removeProduct = (index: number) => {
    const newProducts = [...orderData.products];
    newProducts.splice(index, 1);
    setOrderData({ ...orderData, products: newProducts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !orderData.user_id ||
      !orderData.shipping_address ||
      orderData.products.length === 0
    ) {
      alert("Vui lòng nhập đầy đủ thông tin đơn hàng.");
      return;
    }
    try {
      await instanceAxios.post("/api/orders", orderData);
      alert("Tạo đơn hàng thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo đơn hàng.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow space-y-8">
      <h2 className="text-3xl font-bold">Tạo đơn hàng mới</h2>

      {/* Khách hàng */}
      <div className="space-y-2">
        <label className="block font-semibold">Chọn khách hàng</label>
        <select
          value={orderData.user_id}
          onChange={(e) =>
            setOrderData({ ...orderData, user_id: e.target.value })
          }
          className="border p-3 w-full rounded"
        >
          <option value="">-- Chọn người dùng --</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Địa chỉ */}
      <div className="space-y-2">
        <label className="block font-semibold">Địa chỉ giao hàng</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ nhận hàng"
          value={orderData.shipping_address}
          onChange={(e) =>
            setOrderData({ ...orderData, shipping_address: e.target.value })
          }
          className="border p-3 w-full rounded"
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Danh sách sản phẩm</h3>
          <button
            type="button"
            onClick={addProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {orderData.products.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-4 border p-4 rounded bg-gray-50 items-center"
          >
            <div className="col-span-5">
              <label className="text-sm font-medium block mb-1">
                Tên sản phẩm
              </label>
              <select
                value={item.product_id}
                onChange={(e) =>
                  handleProductChange(idx, "product_id", e.target.value)
                }
                className="border p-2 rounded w-full"
              >
                <option value="">-- Chọn sản phẩm --</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium block mb-1">Số lượng</label>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  handleProductChange(idx, "quantity", Number(e.target.value))
                }
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="col-span-3">
              <label className="text-sm font-medium block mb-1">Giá bán</label>
              <input
                type="number"
                min={0}
                value={item.price}
                onChange={(e) =>
                  handleProductChange(idx, "price", Number(e.target.value))
                }
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium block mb-1">Xoá</label>
              <button
                type="button"
                onClick={() => removeProduct(idx)}
                className="bg-red-600 hover:bg-red-700 text-white w-full rounded p-2"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút submit */}
      <div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
        >
          Tạo đơn hàng
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
