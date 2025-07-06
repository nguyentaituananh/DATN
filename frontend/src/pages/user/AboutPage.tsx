import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";

const AboutPage: React.FC = () => {
  return (
    <div className="mt-16 md:mt-24 px-4">
      {/* Banner hoặc ảnh nền */}
      <section className="relative h-[400px] bg-[url('https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          {/* <h1 className="text-4xl md:text-5xl font-serif font-bold">VỀ CHÚNG TÔI</h1> */}
        </div>
      </section>  

      {/* Nội dung giới thiệu */}
      <section className="max-w-4xl mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <SectionHeading
            title="Câu chuyện Của Eco Decore"
            subtitle="Chúng tôi tạo ra không gian sống truyền cảm hứng"
          />
          <div className="text-gray-700 text-lg leading-relaxed mt-8 px-2">
            <p className="mb-6">
              Được thành lập từ năm 2025, <strong>Eco Decore</strong> là một cửa hàng nội thất tạiHà Nội, Việt Nam. Tại đây, chúng tôi kể câu chuyện về những món đồ nội thất do chúng tôi sản xuất.
            </p>
            <p className="mb-6">
              Câu chuyện của Eco Decore đơn giản là xoay quanh những cái đẹp, sự thoải mái và công năng trong từng sản phẩm nội thất, sẻ chia cái nhìn về ngôi nhà của bạn theo cách của chúng tôi.
            </p>
            <p className="font-semibold text-amber-700 text-xl">
              Bạn có sẵn sàng để nghe câu chuyện của chúng tôi?
            </p>
          </div>
        </motion.div>

        {/* Bộ sưu tập hình ảnh minh họa */}
        <section className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://zerofurniture.vn/images/about/image-1.jpg", 
              "https://zerofurniture.vn/images/about/image-2.jpg", 
              "https://zerofurniture.vn/images/about/image-3.jpg",
              "https://zerofurniture.vn/images/about/image-4.jpg",
              "https://zerofurniture.vn/images/about/image-5.jpg",
              "https://zerofurniture.vn/images/about/image-6.jpg",
            ].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </section>
     <h2 className="text-4xl font-serif font-medium text-gray-900">Eco Decore</h2>
    </div>
  );
};

export default AboutPage;
