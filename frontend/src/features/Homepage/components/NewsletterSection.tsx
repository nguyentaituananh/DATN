import { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Đăng Ký Nhận Tin Khuyến Mãi</h2>
                <p className="text-xl text-white opacity-90 mb-8">
                    Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt qua email
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
