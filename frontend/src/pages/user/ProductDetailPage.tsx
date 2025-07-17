import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Image as AntImage,
  Spin,
  Button,
  Tag,
  message,
  Select,
  Divider,
} from "antd";
import { ShoppingCart } from "lucide-react";
import { fetchProductById } from "../../api/productApi";
import { Product, ProductVariant } from "../../types";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const currencyFormatter = new Intl.NumberFormat("vi-VN");

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);

        const variantRes = await axios.get(
          `http://localhost:5000/api/product-variants/by-product/${id}`
        );

        const filtered = variantRes.data.filter((v: any) => {
          return v.product_id === id || v.product_id?._id === id;
        });

        setVariants(filtered);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        message.error("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const variantOptions = useMemo(() => {
    return variants.map(v => ({
      label: `${v.attributes?.size || "?"} - ${v.attributes?.color || "?"}`,
      value: v._id,
    }));
  }, [variants]);

  const selectedVariant = useMemo(() => {
    return variants.find(v => v._id === selectedVariantId) ?? null;
  }, [selectedVariantId, variants]);

  const price = selectedVariant?.price ?? product?.salePrice ?? product?.price ?? 0;
  const originalPrice = selectedVariant?.price ?? product?.price ?? 0;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    setAdding(true);

    const cartItem = {
      productId: product._id,
      name: product.name,
      price,
      quantity: 1,
      image: product.images?.[0],
      variantId: selectedVariant._id,
      variantName: `${selectedVariant.attributes?.size || ""} - ${selectedVariant.attributes?.color || ""}`,
      variantSku: selectedVariant.sku,
      variantAttributes: selectedVariant.attributes,
    };

    let cart: any[] = [];

    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(storedCart)) {
        cart = storedCart;
      } else {
        console.warn("Cart data is not an array. Resetting cart.");
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
    }

    const existing = cart.find(
      (item: any) =>
        item.productId === cartItem.productId &&
        item.variantId === cartItem.variantId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => {
      message.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
      setAdding(false);
    }, 600);
  };

  const renderVariantTags = () => {
    if (!selectedVariant?.attributes) return null;

    return (
      <>
        <Tag color="blue">{selectedVariant.attributes.size}</Tag>
        <Tag color="green">{selectedVariant.attributes.color}</Tag>
        {selectedVariant.attributes.dimensions && (
          <Tag color="orange">{selectedVariant.attributes.dimensions}</Tag>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <Paragraph className="text-center mt-10">Không tìm thấy sản phẩm.</Paragraph>;
  }

  const imageFallback = "/images/placeholder.jpg";

  return (
    <div className="w-full px-4 py-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="w-full">
          <AntImage
            src={product.images?.[0] || imageFallback}
            fallback={imageFallback}
            alt={product.name}
            className="rounded-xl w-full object-cover"
            placeholder
          />
        </div>

        <div className="space-y-5">
          <Title level={2} className="!m-0">{product.name}</Title>
          <Paragraph type="secondary" className="text-base">{product.description}</Paragraph>

          <div className="space-y-3">
            <Text strong>Chọn biến thể (Size - Màu):</Text>
            <Select
              value={selectedVariantId}
              onChange={setSelectedVariantId}
              placeholder="Chọn biến thể"
              className="w-full"
              size="large"
              allowClear
            >
              {variantOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>

          <Divider />

          <div className="flex items-end space-x-3">
            <Title level={3} className="!m-0 text-primary">
              {price > 0 ? `${currencyFormatter.format(price)} đ` : "Liên hệ"}
            </Title>
            {originalPrice > price && (
              <Text delete type="secondary">
                {currencyFormatter.format(originalPrice)} đ
              </Text>
            )}
          </div>

          {selectedVariant && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <Text strong>Biến thể được chọn: </Text>
              <Text>{`${selectedVariant.attributes?.size || ""} - ${selectedVariant.attributes?.color || ""}`}</Text>
              <div className="mt-2 space-y-1">
                <div><Text strong>SKU: </Text>{selectedVariant.sku}</div>
                <div><Text strong>Thuộc tính: </Text>{renderVariantTags()}</div>
                <div>
                  <Text strong>Tồn kho: </Text>
                  <Text type={selectedVariant.stock_quantity > 0 ? "success" : "danger"}>
                    {selectedVariant.stock_quantity} sản phẩm
                  </Text>
                </div>
              </div>
            </div>
          )}

          <Button
            type="primary"
            size="large"
            icon={<ShoppingCart size={18} />}
            loading={adding}
            disabled={!selectedVariant || selectedVariant.stock_quantity <= 0}
            onClick={handleAddToCart}
            className="rounded-xl"
          >
            {selectedVariant && selectedVariant.stock_quantity <= 0
              ? "Hết hàng"
              : "Thêm vào giỏ hàng"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
