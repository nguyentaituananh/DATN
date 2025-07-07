import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";
import SectionHeading from "../../../components/ui/SectionHeading";
import Products from "../../../components/product/Products";
const heroBackgrounds = [
  "bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg')] bg-cover bg-center",
  "bg-[url('https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg')] bg-cover bg-center",
  "bg-[url('https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg')] bg-cover bg-center",
  "bg-[url('https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg')] bg-cover bg-center",
];

const textContent = [
  {
    heading: "Elevate Your Living Space",
    subheading:
      "Discover premium furniture that combines exceptional craftsmanship, and lasting comfort for your dream home.",
  },
  {
    heading: "Design a Home You Love",
    subheading:
      "Explore timeless furniture crafted with precision, beauty, and comfort for your ideal living space.",
  },
  {
    heading: "Luxury Living Starts Here",
    subheading:
      "Experience luxury furniture that blends artisan quality, modern design, and enduring comfort.",
  },
  {
    heading: "Crafted for Every Corner",
    subheading: "From cozy nooks to grand living rooms, we’ve got you covered.",
  },
  {
    heading: "Natural Materials, Lasting Impressions",
    subheading: "Sustainable furniture designed to inspire and endure.",
  },
];
const HomePage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBackgrounds.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] min-h-[600px] flex items-center transition-all duration-1000 ease-in-out">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            } ${bg}`}
          />
        ))}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {textContent[current].heading}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                {textContent[current].subheading}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" variant="primary">
                    Shop Collection
                  </Button>
                </Link>
                <Link to="/products/sofas">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-black bg-opacity-30 border-white text-white hover:bg-black hover:bg-opacity-50"
                  >
                    Explore Sofas
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-40 flex space-x-2">
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
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <SectionHeading
          title="Shop by Category"
          subtitle="Browse our extensive collection of premium furniture for every room"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/products/sofas" className="group">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg"
                alt="Sofas"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-medium mb-1">Sofas</h3>
                <div className="flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/products/tables" className="group">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"
                alt="Tables"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-medium mb-1">Tables</h3>
                <div className="flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/products/chairs" className="group">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg"
                alt="Chairs"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-medium mb-1">Chairs</h3>
                <div className="flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/products/beds" className="group">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg"
                alt="Beds"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-serif font-medium mb-1">Beds</h3>
                <div className="flex items-center text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="New Arrivals"
            subtitle="Discover our latest collection of premium furniture pieces"
          />

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products  */}
      <div>
        <Products />
      </div>

      {/* Feature Highlights */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Truck size={24} className="text-amber-700" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
            <p className="text-gray-600">
              Free shipping on all orders over $999
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Shield size={24} className="text-amber-700" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">5-Year Warranty</h3>
            <p className="text-gray-600">Our furniture is built to last</p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <RotateCcw size={24} className="text-amber-700" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">30-Day Returns</h3>
            <p className="text-gray-600">
              Shop with confidence and peace of mind
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <MessageSquare size={24} className="text-amber-700" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Our design consultants are here to help
            </p>
          </div>
        </div>
      </section>

      {/* Banner/CTA Section */}
    </div>
  );
};

export default HomePage;
