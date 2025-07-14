import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productApi";
import { Product, ProductVariant } from "../../types";
import {
  Typography,
  Image as AntImage,
  Spin,
  Button,
  Tag,
  message,
  Select,
} from "antd";
import { ShoppingCart } from "lucide-react";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const currencyFormatter = new Intl.NumberFormat("vi-VN");

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchProductById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const variants = product?.variants ?? [];

  const price =
    selectedVariant?.discount_price ??
    selectedVariant?.price ??
    product?.salePrice ??
    product?.price ??
    0;

  const originalPrice =
    selectedVariant?.price ?? product?.price ?? 0;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      message.warning("Vui lòng chọn biến thể trước khi thêm vào giỏ hàng.");
      return;
    }

    setAdding(true);

    const cartItem = {
      productId: product._id,
      name: product.name,
      price,
      quantity: 1,
      image: product.images?.[0],
      variantId: selectedVariant._id,
      size: selectedVariant.size,
      color: selectedVariant.color,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item: any) =>
        item.productId === cartItem.productId &&
        item.variantId === cartItem.variantId
    );

    if (existing) existing.quantity += 1;
    else cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));

    message.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setAdding(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (!product)
    return (
      <Paragraph className="text-center mt-10">
        Không tìm thấy sản phẩm.
      </Paragraph>
    );

  const imageFallback = "/images/placeholder.jpg";
  const imageArray = Array.isArray(product.images) ? product.images : [];
  const imageSrc = imageArray[0] || imageFallback;

  return (
    <div className="w-full px-4 py-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="w-full">
          <AntImage
            src={imageSrc}
            fallback={imageFallback}
            alt={product.name}
            className="rounded-xl w-full object-cover"
            placeholder
          />
        </div>

        <div className="space-y-5">
          <Title level={2} className="!m-0">
            {product.name}
          </Title>
          <Paragraph type="secondary" className="text-base">
            {product.description}
          </Paragraph>

          {variants.length > 0 && (
            <div className="flex gap-4">
              <Select
                placeholder="Chọn kích thước"
                value={selectedVariant?.size}
                onChange={(value) => {
                  const variant = variants.find((v) => v.size === value);
                  setSelectedVariant(variant || null);
                }}
                className="w-1/2"
              >
                {variants.map((v) => (
                  <Option key={v._id} value={v.size}>
                    {v.size}
                  </Option>
                ))}
              </Select>

              <Select
                placeholder="Chọn màu"
                value={selectedVariant?.color}
                onChange={(value) => {
                  const variant = variants.find(
                    (v) => v.color === value && v.size === selectedVariant?.size
                  );
                  setSelectedVariant(variant || null);
                }}
                className="w-1/2"
              >
                {[...new Set(variants.map((v) => v.color))].map((color) => (
                  <Option key={color} value={color}>
                    {color}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <Title level={3} className="!m-0 text-primary">
              {price > 0 ? `${currencyFormatter.format(price)} đ` : "Liên hệ"}
            </Title>
            {originalPrice > price && (
              <Text delete type="secondary">
                {currencyFormatter.format(originalPrice)} đ
              </Text>
            )}
            {selectedVariant?.discount_price && <Tag color="red">Giảm giá</Tag>}
          </div>

          <Button
            type="primary"
            size="large"
            icon={<ShoppingCart size={18} />}
            loading={adding}
            onClick={handleAddToCart}
            className="rounded-xl"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
