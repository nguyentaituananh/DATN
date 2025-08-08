import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Về EcoDecor</h1>
          <p className="text-lg text-gray-600">
            Kiến tạo không gian sống đẳng cấp và bền vững.
          </p>
        </div>

        {/* Company Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tại EcoDecor, chúng tôi tin rằng một không gian sống đẹp không chỉ đến từ thẩm mỹ mà còn từ sự hài hòa với thiên nhiên. Sứ mệnh của chúng tôi là cung cấp những sản phẩm nội thất chất lượng cao, thiết kế tinh tế và thân thiện với môi trường, giúp khách hàng tạo nên một ngôi nhà không chỉ sang trọng mà còn bền vững.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi cam kết sử dụng vật liệu tái chế và có nguồn gốc rõ ràng, đồng thời áp dụng quy trình sản xuất hiện đại để giảm thiểu tác động đến môi trường.
            </p>
          </div>
          <div>
            <img 
              src="https://via.placeholder.com/500x350" 
              alt="Our Workshop" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Chất Lượng</h3>
              <p className="text-gray-600">
                Sản phẩm bền đẹp, được chế tác tỉ mỉ từ những vật liệu tốt nhất.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sáng Tạo</h3>
              <p className="text-gray-600">
                Luôn tiên phong trong thiết kế, mang đến những giải pháp nội thất độc đáo.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bền Vững</h3>
              <p className="text-gray-600">
                Cam kết bảo vệ môi trường trong từng sản phẩm và hoạt động.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
