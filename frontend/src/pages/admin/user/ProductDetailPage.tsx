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
  Space,
  Divider,
} from "antd";
import { ShoppingCart } from "lucide-react";
import { fetchProductById } from "../../../api/productApi";
import { Product } from "../../../types";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const currencyFormatter = new Intl.NumberFormat("vi-VN");

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

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

  // Các lựa chọn size và color
  const availableColors = useMemo(() => {
    return (
      product?.variants
        ?.map(v => v.attributes?.color)
        .filter((v, i, arr) => v && arr.indexOf(v) === i) ?? []
    );
  }, [product]);

  const availableSizes = useMemo(() => {
    return (
      product?.variants
        ?.map(v => v.attributes?.size)
        .filter((v, i, arr) => v && arr.indexOf(v) === i) ?? []
    );
  }, [product]);

  // Lấy variant khớp color & size
  const selectedVariant = useMemo(() => {
    return product?.variants?.find(
      v =>
        v.attributes?.color === selectedColor &&
        v.attributes?.size === selectedSize
    ) ?? null;
  }, [product, selectedColor, selectedSize]);

  const price = selectedVariant?.price ?? product?.salePrice ?? product?.price ?? 0;
  const originalPrice = selectedVariant?.price ?? product?.price ?? 0;
  const hasDiscount = false;

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
      variantName: `${selectedColor || ""} - ${selectedSize || ""}`,
      variantSku: selectedVariant.sku,
      variantAttributes: selectedVariant.attributes,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item: any) =>
        item.productId === cartItem.productId &&
        item.variantId === cartItem.variantId,
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
        {selectedVariant.attributes.size && (
          <Tag color="blue">{selectedVariant.attributes.size}</Tag>
        )}
        {selectedVariant.attributes.color && (
          <Tag color="green">{selectedVariant.attributes.color}</Tag>
        )}
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
          <Title level={2} className="!m-0">
            {product.name}
          </Title>

          <Paragraph type="secondary" className="text-base">
            {product.description}
          </Paragraph>

          <div className="space-y-3">
            {availableSizes.length > 0 && (
              <>
                <Text strong>Chọn kích thước:</Text>
                <Select
                  value={selectedSize || undefined}
                  onChange={value => setSelectedSize(value)}
                  placeholder="Chọn kích thước"
                  className="w-full"
                  size="large"
                >
                  {availableSizes.map(size => (
                    <Option key={size} value={size}>
                      {size}
                    </Option>
                  ))}
                </Select>
              </>
            )}

            {availableColors.length > 0 && (
              <>
                <Text strong>Chọn màu:</Text>
                <Select
                  value={selectedColor || undefined}
                  onChange={value => setSelectedColor(value)}
                  placeholder="Chọn màu"
                  className="w-full"
                  size="large"
                >
                  {availableColors.map(color => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </>
            )}
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
            {hasDiscount && <Tag color="red">Giảm giá</Tag>}
          </div>

          {selectedVariant && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <Text strong>Biến thể được chọn: </Text>
              <Text>{`${selectedColor || ""} - ${selectedSize || ""}`}</Text>
              <div className="mt-2 space-y-1">
                <div>
                  <Text strong>SKU: </Text>
                  <Text>{selectedVariant.sku}</Text>
                </div>
                <div>
                  <Text strong>Thuộc tính: </Text>
                  {renderVariantTags()}
                </div>
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
            disabled={
              !selectedVariant ||
              selectedVariant.stock_quantity <= 0
            }
            onClick={handleAddToCart}
            className="rounded-xl"
          >
            {selectedVariant && selectedVariant.stock_quantity <= 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
