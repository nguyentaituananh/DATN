import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Card, Typography, Button, Space } from "antd";
import HeaderComponent from "../../components/HeaderComponent";
import BannerComponent from "../../components/BannerComponent";
import FooterComponent from "../../components/FooterComponent";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  salePrice?: number;
}

interface ProductCategoryProps {
  title: string;
  products: Product[];
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  title,
  products,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollAmount = 280 + 16; // Chiều rộng card + margin

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const checkScrollVisibility = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollVisibility();
    const observer = new ResizeObserver(checkScrollVisibility);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [products]);

  const handleScroll = () => {
    checkScrollVisibility();
  };

  return (
    <div style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={3}>{title}</Title>
        <Button type="link" icon={<RightOutlined />}>
          Xem thêm {title}
        </Button>
      </div>
      <div style={{ position: "relative" }}>
        {showLeftArrow && (
          <button
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={scrollLeft}
          >
            <LeftOutlined style={{ fontSize: 16 }} />
          </button>
        )}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            paddingBottom: 16,
            scrollBehavior: "smooth", // Đảm bảo cuộn mượt mà khi dùng JS
          }}
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{ width: 280, marginRight: 16, flexShrink: 0 }}
            >
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Space direction="vertical">
                      {product.salePrice !== undefined && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}
                        >
                          {product.salePrice.toLocaleString()} đ
                        </span>
                      )}
                      <span>{product.price.toLocaleString()} đ</span>
                    </Space>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={scrollRight}
          >
            <RightOutlined style={{ fontSize: 16 }} />
          </button>
        )}
      </div>
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Button type="link">Xem thêm {title} &gt;</Button>
      </div>
    </div>
  );
};

const Home = () => {
  // Dữ liệu sản phẩm mẫu - BẠN CẦN THAY THẾ BẰNG DỮ LIỆU THỰC TẾ CỦA MÌNH
  const sofas: Product[] = [
    {
      id: 1,
      name: "Sofa 1",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1000000,
    },
    {
      id: 2,
      name: "Sofa 2",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 2000000,
    },
    {
      id: 3,
      name: "Sofa 3",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1500000,
    },
    {
      id: 4,
      name: "Sofa 4",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1800000,
    },
    {
      id: 5,
      name: "Sofa 5",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 2200000,
    },
    {
      id: 6,
      name: "Sofa 6",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 2500000,
    },
    {
      id: 7,
      name: "Sofa 7",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 2800000,
    },
    // Thêm nhiều sản phẩm sofa hơn
  ];

  const cabinets: Product[] = [
    {
      id: 8,
      name: "Tủ 1",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 800000,
    },
    {
      id: 9,
      name: "Tủ 2",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1200000,
    },
    {
      id: 10,
      name: "Tủ 3",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1000000,
    },
    // Thêm sản phẩm tủ khác
  ];

  const chairs: Product[] = [
    {
      id: 11,
      name: "Ghế 1",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 500000,
    },
    {
      id: 12,
      name: "Ghế 2",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 700000,
    },
    {
      id: 13,
      name: "Ghế 3",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 600000,
    },
    // Thêm sản phẩm ghế khác
  ];

  const tables: Product[] = [
    {
      id: 14,
      name: "Bàn 1",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 900000,
    },
    {
      id: 15,
      name: "Bàn 2",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1100000,
    },
    {
      id: 16,
      name: "Bàn 3",
      imageUrl:
        "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
      price: 1200000,
    },
    // Thêm sản phẩm bàn khác
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <HeaderComponent />
      <BannerComponent />

      {/* Phần Giới thiệu */}
      <div style={{ background: "#fff", padding: "24px", marginBottom: 24 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 16 }}>
          Giới thiệu
        </Title>
        <Row gutter={24} align="middle">
          <Col md={12}>
            <Text>
              Khoảng mười năm trước, người sáng lập của chúng tôi đang trong bị
              nội thất cho căn hộ của mình. Chán nản vì thiếu những chiếc ghế
              sofa được thiết kế đẹp, chất lượng tốt và giá cả phải chăng, anh
              bắt đầu xóc định lại quy trình. Ý tưởng rất rõ ràng: cộng tác với
              các nhà thiết kế và nhà sản xuất độc lập để tạo ra những tác phẩm
              bạn yêu thích, trừ phần đánh dấu. Và thế là House.com ra đời. Nơi
              tạo dựng ngôi nhà mơ ước của bạn.
            </Text>
          </Col>
          <Col md={12}>
            <img
              src="https://www.lanha.vn/wp-content/uploads/2023/06/Cac-phong-cach-thiet-ke-noi-that-3.jpg.webp"
              alt="Giới thiệu"
              style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
            />
          </Col>
        </Row>
      </div>

      {/* Phần Dự án */}
      <div style={{ background: "#f0f2f5", padding: "24px", marginBottom: 24 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Dự án
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
            <img
              src="https://noithattugia.com/wp-content/uploads/2024/11/thiet-ke-noi-that-phong-khach-kien-truc-noi-that-tu-gia-2.jpg"
              alt="Nội thất Phòng khách"
              style={{
                width: "100%",
                maxHeight: 150,
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <Text strong>Nội thất Phòng khách</Text>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
            <img
              src="https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp"
              alt="Nội thất Phòng ngủ"
              style={{
                width: "100%",
                maxHeight: 150,
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <Text strong>Nội thất Phòng ngủ</Text>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
            <img
              src="https://noithatngahung.com/wp-content/uploads/2021/03/nh%E1%BB%8F-xinh-3271x2181.jpg"
              alt="Nội thất Phòng bếp"
              style={{
                width: "100%",
                maxHeight: 150,
                height: 150,
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <Text strong>Nội thất Phòng bếp</Text>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
            <img
              src="https://housef.vn/wp-content/uploads/2022/12/10-mau-thiet-ke-phong-lam-viec-hien-dai-4-1.jpg"
              alt="Nội thất Phòng làm việc"
              style={{
                width: "100%",
                maxHeight: 150,
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <Text strong>Nội thất Phòng làm việc</Text>
          </Col>
          {/* Thêm các danh mục dự án khác nếu cần */}
        </Row>
      </div>

      {/* Phần Sản phẩm chính */}
      <div style={{ background: "#fff", padding: "24px", marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Sản phẩm chính
        </Title>
        <ProductCategory title="Sofas" products={sofas} />
        <ProductCategory title="Cabinet" products={cabinets} />
        <ProductCategory title="Chairs" products={chairs} />
        <ProductCategory title="Tables" products={tables} />
        {/* Thêm các danh mục sản phẩm chính khác */}
      </div>

      {/* Phần Mẹo thiết kế */}
      <div style={{ background: "#f0f2f5", padding: "24px", marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Mẹo thiết kế
        </Title>
        <Row gutter={[16, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              cover={
                <img
                  alt="Mẹo 1"
                  src="https://mdesign.vn/wp-content/uploads/2017/06/Ylva-Skarps-living-room.-.jpg"
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title="10 cách thiết kế phòng khách nổi bật" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              cover={
                <img
                  alt="Mẹo 2"
                  src="https://tecwood.com.vn/news/bo-tri-cay-xanh-trong-nha.png"
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title="Trang trí cây xanh cho nhà hợp lý" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              cover={
                <img
                  alt="Mẹo 3"
                  src="https://vuonannam.com/wp-content/uploads/2022/07/bo-banghe-ban-cong-bg-12-mo-ta.jpg"
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title="Setup đồ dùng ngoài trời như thế nào?" />
            </Card>
          </Col>
          {/* Thêm các mẹo thiết kế khác */}
        </Row>
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <Button type="link">Xem thêm Mẹo thiết kế &gt;</Button>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};

export default Home;
