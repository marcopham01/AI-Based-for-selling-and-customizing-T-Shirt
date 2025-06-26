import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1920",
            title: "Thiết kế độc đáo",
            description: "Tạo phong cách riêng với những mẫu thiết kế độc đáo"
        },
        {
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1920",
            title: "Chất lượng cao cấp",
            description: "Sản phẩm được làm từ chất liệu cao cấp, bền đẹp"
        },
        {
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1920",
            title: "Giá cả phải chăng",
            description: "Mức giá hợp lý cho mọi đối tượng khách hàng"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    // Auto slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [currentSlide]); // Re-run effect when currentSlide changes

    return (
        <div className="relative w-screen max-w-none h-[600px] overflow-hidden">
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white">
                                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                <p className="text-xl">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel; 