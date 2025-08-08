import { Truck, Shield, Award } from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: Truck,
            title: "Miễn Phí Vận Chuyển",
            description: "Giao hàng miễn phí cho đơn hàng trên 5 triệu"
        },
        {
            icon: Shield,
            title: "Bảo Hành 5 Năm",
            description: "Cam kết chất lượng với bảo hành dài hạn"
        },
        {
            icon: Award,
            title: "Chất Lượng Cao",
            description: "Sản phẩm được chọn lọc kỹ càng từ các thương hiệu uy tín"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
