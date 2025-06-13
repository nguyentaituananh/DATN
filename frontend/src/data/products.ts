import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    name: "Serene Velvet Sofa",
    category: "sofas",
    price: 1299.99,
    salePrice: 999.99,
    description: "The Serene Velvet Sofa combines timeless elegance with modern comfort. Its plush velvet upholstery feels as luxurious as it looks, while the solid wood frame ensures durability for years to come. The deep seat cushions are filled with high-resilience foam wrapped in feather down for the perfect balance of support and softness. Tapered wooden legs with a walnut finish add a touch of mid-century modern flair to this sophisticated piece.",
    shortDescription: "Luxurious velvet sofa with deep cushions and elegant design",
    images: [
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
      "https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg",
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
    ],
    features: [
      "Premium velvet upholstery",
      "Solid wood frame",
      "High-resilience foam cushions wrapped in feather down",
      "Tapered wooden legs with walnut finish",
      "Removable cushion covers for easy cleaning"
    ],
    dimensions: {
      width: 220,
      height: 85,
      depth: 95
    },
    colors: ["Emerald Green", "Navy Blue", "Charcoal Gray", "Blush Pink"],
    materials: ["Velvet", "Solid Wood", "High-Resilience Foam"],
    inStock: true,
    rating: 4.8,
    reviews: 125,
    isNew: true
  },
  {
    id: "2",
    name: "Nordic Dining Table",
    category: "tables",
    price: 899.99,
    description: "The Nordic Dining Table brings Scandinavian simplicity to your dining space. Crafted from solid oak with a natural finish that highlights the beautiful wood grain, this table features clean lines and a minimalist silhouette. The slightly tapered legs add a touch of elegance to the sturdy design. Perfect for both everyday meals and special occasions, this versatile table comfortably seats six people.",
    shortDescription: "Minimalist oak dining table with Scandinavian design",
    images: [
      "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
      "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg",
      "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg"
    ],
    features: [
      "Solid oak construction",
      "Natural finish with matte sealant",
      "Seats 6 people comfortably",
      "Easy assembly",
      "Heat and water-resistant surface"
    ],
    dimensions: {
      width: 180,
      height: 75,
      depth: 90
    },
    colors: ["Natural Oak", "Walnut", "White Oak"],
    materials: ["Solid Oak", "Steel Hardware"],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: "3",
    name: "Cloud Comfort Bed",
    category: "beds",
    price: 1499.99,
    salePrice: 1299.99,
    description: "Transform your bedroom into a sanctuary with the Cloud Comfort Bed. The upholstered headboard with gentle padding provides perfect support for reading or watching TV in bed. The platform design eliminates the need for a box spring, while the solid wood frame ensures stability and longevity. Hidden storage drawers in the base offer convenient space for extra linens or seasonal items, making this bed as practical as it is beautiful.",
    shortDescription: "Upholstered platform bed with storage and padded headboard",
    images: [
      "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg",
      "https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg",
      "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg"
    ],
    features: [
      "Upholstered headboard with gentle padding",
      "Solid wood frame and slat support system",
      "Two storage drawers in base",
      "No box spring needed",
      "Available in Queen, King, and California King sizes"
    ],
    dimensions: {
      width: 160,
      height: 115,
      depth: 210
    },
    colors: ["Oatmeal", "Light Gray", "Navy", "Sage Green"],
    materials: ["Solid Wood", "Linen Blend Fabric", "High-Density Foam"],
    inStock: true,
    rating: 4.9,
    reviews: 210,
    isBestseller: true
  },
  {
    id: "4",
    name: "Artisan Coffee Table",
    category: "tables",
    price: 599.99,
    description: "The Artisan Coffee Table is a statement piece that combines natural materials with expert craftsmanship. The live-edge solid wood top showcases the unique grain and natural beauty of the timber, while the blackened steel base provides industrial contrast and stability. Each table is one-of-a-kind, with variations in the wood making every piece unique. The spacious surface offers plenty of room for books, decor, and entertaining essentials.",
    shortDescription: "Live-edge wood coffee table with steel base",
    images: [
      "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg",
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg"
    ],
    features: [
      "Live-edge solid wood top",
      "Blackened steel base",
      "Each piece is unique with natural variations",
      "Protective clear coat finish",
      "Felt pads to protect flooring"
    ],
    dimensions: {
      width: 120,
      height: 45,
      depth: 70
    },
    colors: ["Natural Acacia", "Walnut", "Maple"],
    materials: ["Solid Wood", "Blackened Steel"],
    inStock: true,
    rating: 4.6,
    reviews: 75
  },
  {
    id: "5",
    name: "Curved Accent Chair",
    category: "chairs",
    price: 499.99,
    salePrice: 399.99,
    description: "Add a touch of elegance to any room with the Curved Accent Chair. The graceful silhouette features gently curved arms and a barrel back that embraces you in comfort. Upholstered in premium performance fabric that resists stains and fading, this chair is as practical as it is beautiful. The solid wood legs in a warm finish complement the upholstery perfectly, while the plush cushion provides exceptional comfort for reading, conversation, or relaxation.",
    shortDescription: "Elegant curved accent chair with premium upholstery",
    images: [
      "https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg",
      "https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg",
      "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg"
    ],
    features: [
      "Curved barrel back design",
      "Premium performance fabric upholstery",
      "Solid wood legs with warm finish",
      "High-density foam cushion",
      "360-degree swivel base option available"
    ],
    dimensions: {
      width: 75,
      height: 80,
      depth: 75
    },
    colors: ["Ivory", "Sage Green", "Dusty Blue", "Terracotta"],
    materials: ["Performance Fabric", "Solid Wood", "High-Density Foam"],
    inStock: true,
    rating: 4.7,
    reviews: 95,
    isNew: true
  },
  {
    id: "6",
    name: "Floating Wall Shelf Set",
    category: "storage",
    price: 199.99,
    description: "The Floating Wall Shelf Set offers stylish storage that appears to defy gravity. This set of three shelves in graduating sizes can be arranged in countless configurations to display your favorite books, plants, and decor items. The hidden mounting hardware creates a clean, minimalist look, while the solid wood construction ensures durability and strength. Each shelf can support up to 15 pounds, making them as functional as they are beautiful.",
    shortDescription: "Set of three floating shelves with hidden mounting",
    images: [
      "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
      "https://images.pexels.com/photos/6480209/pexels-photo-6480209.jpeg",
      "https://images.pexels.com/photos/6585601/pexels-photo-6585601.jpeg"
    ],
    features: [
      "Set of three shelves in graduating sizes",
      "Hidden mounting hardware included",
      "Solid wood construction",
      "Each shelf supports up to 15 pounds",
      "Versatile arrangement options"
    ],
    dimensions: {
      width: 60,
      height: 5,
      depth: 20
    },
    colors: ["Natural Oak", "Walnut", "Black", "White"],
    materials: ["Solid Wood", "Steel Hardware"],
    inStock: true,
    rating: 4.5,
    reviews: 68
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isNew || product.isBestseller).slice(0, 4);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};