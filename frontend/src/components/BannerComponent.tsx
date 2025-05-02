import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const BannerComponent = () => {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "1000px",
    overflow: "hidden",
  };

  const slideStyle: React.CSSProperties = {
    width: "100%", // Đảm bảo slide chiếm toàn bộ chiều rộng
    height: "100%", // Đảm bảo slide chiếm toàn bộ chiều cao container
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "rgba(255, 255, 255, 0.7)",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    borderRadius: "50%",
    fontSize: "18px",
    transition: "background 0.3s",
  };

  const arrowLeftStyle: React.CSSProperties = {
    ...arrowStyle,
    left: "16px",
  };

  const arrowRightStyle: React.CSSProperties = {
    ...arrowStyle,
    right: "16px",
  };

  const bannerImages = [
    "https://noithattugia.com/wp-content/uploads/2024/11/thiet-ke-noi-that-phong-khach-kien-truc-noi-that-tu-gia-2.jpg",
    "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
    "https://noithatngahung.com/wp-content/uploads/2021/03/nh%E1%BB%8F-xinh-3271x2181.jpg",
    "https://housef.vn/wp-content/uploads/2022/12/10-mau-thiet-ke-phong-lam-viec-hien-dai-4-1.jpg",
  ];

  return (
    <div style={containerStyle}>
      <Carousel autoplay ref={carouselRef} dots effect="fade">
        {bannerImages.map((image, index) => (
          <div key={index} style={slideStyle}>
            <img src={image} alt={`banner-${index}`} style={imageStyle} />
          </div>
        ))}
      </Carousel>

      <button style={arrowLeftStyle} onClick={prev}>
        <LeftOutlined />
      </button>
      <button style={arrowRightStyle} onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default BannerComponent;
