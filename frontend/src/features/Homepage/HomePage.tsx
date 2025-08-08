import {
  HeroSection,
  FeaturesSection,
  CategoriesSection,
  FeaturedProductsSection,
  NewsletterSection
} from './components';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
