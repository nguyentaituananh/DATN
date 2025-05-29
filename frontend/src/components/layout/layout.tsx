import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TestimonialsSection from './TestimonialsSection';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <TestimonialsSection/>
      <Footer />
    </div>
  );
};

export default Layout;