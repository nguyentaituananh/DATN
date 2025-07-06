import React from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  backgroundImage?: string; 
}

const PageHeader: React.FC<BannerProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className=" w-full md:h-[700px] flex flex-col items-center justify-center text-white text-center bg-cover bg-center relative mb-10 "
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage || "/images/default-banner.jpg"})`,
        marginTop: 0,
      }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">{title}</h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-100">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
