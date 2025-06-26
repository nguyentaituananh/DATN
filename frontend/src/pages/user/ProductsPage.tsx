  import React, { useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { Slider, Select, Checkbox, Divider } from 'antd';
  import { Filter, X } from 'lucide-react';
  import SectionHeading from '../../components/ui/SectionHeading';
  import Button from '../../components/ui/Button';
  import { products, getProductsByCategory } from '../../data/products';
import ProductGrid from '../../components/product/ProductGirt';
import PageHeader from '../../components/shared/PageHeader';

  const { Option } = Select;

  const ProductsPage: React.FC = () => {
    const { category } = useParams<{ category?: string }>();
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
    const [sortBy, setSortBy] = useState<string>('featured');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [filtersVisible, setFiltersVisible] = useState(false);

    // Get all products or filter by category if provided
    const displayedProducts = category ? getProductsByCategory(category) : products;

    // Get unique colors and materials from products
    const allColors = Array.from(new Set(products.flatMap(product => product.colors)));
    const allMaterials = Array.from(new Set(products.flatMap(product => product.materials)));

    // Apply filters
    const filteredProducts = displayedProducts.filter(product => {
      const price = product.salePrice || product.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      const matchesColor = selectedColors.length === 0 || 
        product.colors.some(color => selectedColors.includes(color));
      
      const matchesMaterial = selectedMaterials.length === 0 || 
        product.materials.some(material => selectedMaterials.includes(material));
      
      return matchesPrice && matchesColor && matchesMaterial;
    });

    // Apply sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      
      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          // featured - put bestsellers and new products first
          const aScore = (a.isBestseller ? 2 : 0) + (a.isNew ? 1 : 0);
          const bScore = (b.isBestseller ? 2 : 0) + (b.isNew ? 1 : 0);
          return bScore - aScore;
      }
    });

    const toggleFilters = () => {
      setFiltersVisible(!filtersVisible);
    };

    const resetFilters = () => {
      setPriceRange([0, 2000]);
      setSelectedColors([]);
      setSelectedMaterials([]);
    };

    // Generate page title
    let pageTitle = 'All Products';
    if (category) {
      pageTitle = category.charAt(0).toUpperCase() + category.slice(1);
    }

    return (
      <div className="py-8">
        <PageHeader
        title="Elegant Sofa Collection"
        subtitle="Elevate your home with our exclusive range of designer sofas, blending luxurious comfort with sleek, modern aesthetics to suit every taste and lifestyle"
        backgroundImage="https://images.pexels.com/photos/30380606/pexels-photo-30380606.jpeg"
      />
        <div className="py-16 md:py-24 container mx-auto px-4">
          <SectionHeading title={pageTitle} alignment="left" />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Price Range</h3>
                  <Slider
                    range
                    min={0}
                    max={2000}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value as [number, number])}
                    tipFormatter={(value) => `$${value}`}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Divider />

                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Color</h3>
                  <div className="space-y-2">
                    {allColors.map(color => (
                      <div key={color}>
                        <Checkbox
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                        >
                          {color}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Material</h3>
                  <div className="space-y-2">
                    {allMaterials.map(material => (
                      <div key={material}>
                        <Checkbox
                          checked={selectedMaterials.includes(material)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMaterials([...selectedMaterials, material]);
                            } else {
                              setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                            }
                          }}
                        >
                          {material}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters} 
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Sort and Filter Controls */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="lg:hidden mr-3 flex items-center"
                    onClick={toggleFilters}
                  >
                    <Filter size={16} className="mr-1" />
                    Filters
                  </Button>
                  <p className="text-gray-500">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="mr-2 text-gray-700">Sort by:</span>
                  <Select 
                    value={sortBy} 
                    onChange={setSortBy} 
                    className="w-40"
                    size="large"
                  >
                    <Option value="featured">Featured</Option>
                    <Option value="price-asc">Price: Low to High</Option>
                    <Option value="price-desc">Price: High to Low</Option>
                    <Option value="name-asc">Name: A to Z</Option>
                    <Option value="name-desc">Name: Z to A</Option>
                  </Select>
                </div>
              </div>

              {/* Mobile Filters Drawer */}
              {filtersVisible && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilters}></div>
                  <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-medium">Filters</h3>
                      <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                      </button>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium text-lg mb-3">Price Range</h3>
                      <Slider
                        range
                        min={0}
                        max={2000}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value as [number, number])}
                        tipFormatter={(value) => `$${value}`}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    <Divider />

                    <div className="mb-6">
                      <h3 className="font-medium text-lg mb-3">Color</h3>
                      <div className="space-y-2">
                        {allColors.map(color => (
                          <div key={color}>
                            <Checkbox
                              checked={selectedColors.includes(color)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedColors([...selectedColors, color]);
                                } else {
                                  setSelectedColors(selectedColors.filter(c => c !== color));
                                }
                              }}
                            >
                              {color}
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Divider />

                    <div className="mb-6">
                      <h3 className="font-medium text-lg mb-3">Material</h3>
                      <div className="space-y-2">
                        {allMaterials.map(material => (
                          <div key={material}>
                            <Checkbox
                              checked={selectedMaterials.includes(material)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMaterials([...selectedMaterials, material]);
                                } else {
                                  setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                                }
                              }}
                            >
                              {material}
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="primary" onClick={toggleFilters} fullWidth>
                        Apply Filters
                      </Button>
                      <Button variant="outline" onClick={resetFilters}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <ProductGrid products={sortedProducts} columns={3} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No products match your selected filters.</p>
                  <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductsPage;