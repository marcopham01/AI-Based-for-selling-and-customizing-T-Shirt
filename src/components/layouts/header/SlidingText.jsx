import React from 'react';

const SlidingText = () => {
    const messages = [
        "🎉 Chào mừng đến với cửa hàng áo thun của chúng tôi! 🎉",
        "👕 Thiết kế áo thun theo ý thích của bạn 👕",
        "🎨 Hơn 1000+ mẫu thiết kế độc đáo 🎨",
        "⭐ Chất lượng cao cấp - Giá cả phải chăng ⭐"
    ];

    return (
        <div className="w-full overflow-hidden bg-gradient-to-r from-blue-800 via-blue-900 to-black py-2 fixed top-[60px] left-0 z-[999]">
            <div className="animate-slide whitespace-nowrap inline-block ">
                {messages.map((message, index) => (
                    <span key={`first-${index}`} className="inline-block text-white text-md  mx-40 font-md italic">
                        {message}
                    </span>
                ))}
                {messages.map((message, index) => (
                    <span key={`second-${index}`} className="inline-block text-white text-md  mx-40 font-md italic">
                        {message}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SlidingText;