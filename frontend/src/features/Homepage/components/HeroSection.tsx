import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides: HeroSlide[] = [
        {
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
            title: "Phòng Khách Hiện Đại",
            subtitle: "Tạo không gian sống lý tưởng",
            description: "Khám phá bộ sưu tập sofa và bàn ghế cao cấp"
        },
        {
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
            title: "Phòng Ngủ Sang Trọng",
            subtitle: "Nghỉ ngơi trong không gian hoàn hảo",
            description: "Giường ngủ và tủ quần áo thiết kế độc đáo"
        },
        {
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200",
            title: "Phòng Ăn Ấm Cúng",
            subtitle: "Nơi gia đình sum họp",
            description: "Bàn ăn và ghế ngồi chất lượng cao"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    return (
        <section className="relative h-screen overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-6xl font-bold mb-4 animate-fade-in">
                        {heroSlides[currentSlide].title}
                    </h2>
                    <p className="text-2xl mb-2 opacity-90">
                        {heroSlides[currentSlide].subtitle}
                    </p>
                    <p className="text-lg mb-8 opacity-80">
                        {heroSlides[currentSlide].description}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-orange-600 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
                            Khám Phá Ngay
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all">
                            Xem Catalog
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
            >
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
            >
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
