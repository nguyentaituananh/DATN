import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  return (
    <div className={`mb-8 md:mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;