import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { IProduct } from '../../types/products';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [tab, setTab] = useState<"details" | "warranty">("details");

const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        const data = response.data.metadata;
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center text-gray-600">Không tìm thấy sản phẩm</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: images */}
        <div className="flex gap-4">
          {/* Image Thumbnails */}
          <div className="flex flex-col gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover border-2 rounded-md cursor-pointer ${
                  selectedImage === img ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={selectedImage || '/default-image.jpg'}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* RIGHT: product info */}
<div className="flex flex-col gap-4 max-w-lg">
  {/* Tên sản phẩm */}
  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

  {/* Giá khuyến mãi & giá gốc */}
  <div className="flex items-center gap-3">
    <p className="text-2xl text-red-600 font-semibold">
      {Number(product.price).toLocaleString('vi-VN')}₫
    </p>
    {product.discount_price && (
      <p className="text-lg text-gray-500 line-through">
        {Number(product.discount_price).toLocaleString('vi-VN')}₫
      </p>
    )}
  </div>

  {/* Vật liệu */}
  <p className="text-gray-700">
    <span className="font-semibold">Vật liệu:</span> {product.material}
  </p>

  {/* Kích thước */}
  <p className="text-gray-700">
    <span className="font-semibold">Kích thước:</span> {product.size}
  </p>

  

  
  {/* Danh mục */}
  <p className="text-gray-600 text-sm">
    Danh mục: {product.category_name || product.category_id}
  </p>

  

  {/* Số lượng chọn mua */}
  <div className="flex items-center gap-2 mt-2">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center"
    >
      -
    </button>
    <span className="w-10 text-center">{quantity}</span>
    <button
      onClick={() => setQuantity(quantity + 1)}
      className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center"
    >
      +
    </button>
  </div>

  {/* Hành động */}
  <div className="flex gap-4 mt-4">
    <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
      MUA NGAY
    </button>
    <button
      onClick={() => alert('Đã thêm vào giỏ hàng!')}
      className="border border-black text-black px-6 py-3 rounded hover:bg-gray-100"
    >
      THÊM VÀO GIỎ
    </button>
  </div>

  {/* Ưu đãi thành viên */}
  <div className="mt-4 bg-green-100 p-4 flex items-center justify-between">
    <p className="text-green-700 font-medium">
      Giảm 5% khi đăng ký thành viên
    </p>
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      ĐĂNG KÝ NGAY
    </button>
  </div>
</div>


          {/* Tabs (optional) */}
          <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2 mb-2">
        <button
          className={`pb-1 font-semibold ${
            tab === "details"
              ? "text-gray-700 border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setTab("details")}
        >
          Chi tiết sản phẩm
        </button>
        <button
          className={`pb-1 ${
            tab === "warranty"
              ? "text-gray-700 border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setTab("warranty")}
        >
          Bảo hành
        </button>
      </div>

      {/* Content */}
      {tab === "details" ? (
        <div className="text-gray-600 text-sm leading-6 space-y-2">
          <p>
            Các sản phẩm nội thất tại chúng tôi đa số đều được sản xuất tại nhà
            máy của công ty cổ phần xây dựng kiến trúc AA với đội ngũ nhân viên
            và công nhân ưu tú cùng cơ sở vật chất hiện đại (
            <a
              href=""
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
                Xem chi tiết nhà máy
            </a>
            ).
          </p>
          <p>
            chúng tôi đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm
            hoàn thiện cuối cùng.
          </p>
          <p>
            chúng tôi bảo hành một năm cho các trường hợp có lỗi về kỹ thuật
            trong quá trình sản xuất hay lắp đặt.
          </p>
          <p>
            Quý khách không nên tự sửa chữa mà hãy báo ngay cho chúng tôi qua
            hotline: <strong>1800 7200</strong>.
          </p>
          <p>
            Sau thời gian hết hạn bảo hành, nếu quý khách có bất kỳ yêu cầu hay
            thắc mắc thì vui lòng liên hệ với chúng tôi để được hướng dẫn và giải
            quyết các vấn đề gặp phải.
          </p>
        </div>
      ) : (
        <ul className="list-disc pl-5 text-gray-600 text-sm leading-6">
          <li>Sản phẩm được bảo hành chính hãng từ nhà cung cấp.</li>
          <li>Đổi trả trong 7 ngày nếu lỗi từ nhà sản xuất.</li>
          <li>Vận chuyển toàn quốc, hỗ trợ lắp đặt nội thành TP.HCM.</li>
        </ul>
      )}
    </div>
  
        </div>
      </div>
  
  );
};

export default DetailProduct;
