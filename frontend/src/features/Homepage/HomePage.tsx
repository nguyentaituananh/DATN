"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Truck, Shield, RotateCcw, MessageSquare } from "lucide-react"
import { useAuth } from "@/hooks/accounts"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const heroBackgrounds = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
  "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
]

const textContent = [
  {
    heading: "Elevate Your Living Space",
    subheading:
      "Discover premium furniture that combines exceptional craftsmanship, and lasting comfort for your dream home.",
  },
  {
    heading: "Design a Home You Love",
    subheading: "Explore timeless furniture crafted with precision, beauty, and comfort for your ideal living space.",
  },
  {
    heading: "Luxury Living Starts Here",
    subheading: "Experience luxury furniture that blends artisan quality, modern design, and enduring comfort.",
  },
  {
    heading: "Crafted for Every Corner",
    subheading: "From cozy nooks to grand living rooms, we've got you covered.",
  },
]

export const HomePage = () => {
  const { user } = useAuth()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBackgrounds.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-sans text-gray-900">
      <section className="relative h-screen mt-8 md:h-[700px] min-h-[600px] flex items-center">
        {heroBackgrounds.map((bg, index) => (
          <img
            key={index}
            src={bg || "/placeholder.svg"}
            alt={`Hero ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {user?.name ? `Chào ${user.name}, ` : ""}
                {textContent[current].heading}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">{textContent[current].subheading}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="">
                  <Button size="lg" variant="default">
                    Xem sản phẩm
                  </Button>
                </Link>
                <Link to="">
                  <Button size="lg" variant="outline" className="bg-black/30 border-white text-white hover:bg-black/50">
                    Quản lý cửa hàng
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-8 bg-amber-500" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories - ĐƠN GIẢN */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium furniture for every room
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Sofas", image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg" },
            { name: "Tables", image: "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg" },
            { name: "Chairs", image: "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg" },
            { name: "Beds", image: "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg" },
          ].map((item, index) => (
            <Link key={index} to="" className="group">
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-serif font-medium mb-1">{item.name}</h3>
                  <div className="flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Shop Collection</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features - ĐƠN GIẢN */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Truck size={24} />, title: "Miễn phí giao hàng", desc: "Miễn phí vận chuyển với đơn từ 999k." },
            { icon: <Shield size={24} />, title: "Bảo hành 5 năm", desc: "Chất lượng bền bỉ theo thời gian." },
            { icon: <RotateCcw size={24} />, title: "Đổi trả 30 ngày", desc: "Đổi trả dễ dàng nếu không hài lòng." },
            { icon: <MessageSquare size={24} />, title: "Hỗ trợ tận tâm", desc: "Chuyên viên tư vấn luôn sẵn sàng." },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-700">{item.icon}</div>
              </div>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Products */}
      <section className="bg-stone-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sản phẩm mới</h2>
            <p className="text-lg text-gray-600 mb-8">Khám phá bộ sưu tập nội thất mới nhất của chúng tôi</p>
            <Link to="">
              <Button variant="outline">
                Xem tất cả sản phẩm
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
