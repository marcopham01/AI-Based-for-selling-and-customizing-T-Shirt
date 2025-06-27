import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

const product = {
    name: 'Áo Thun Nam Cotton 220GSM',
    price: 159000,
    oldPrice: 179000,
    discount: 11,
    rating: 4.85,
    colors: [
        { name: 'Nâu Cappuccino', code: '#7B4F27' },
        { name: 'Trắng', code: '#F5F5F5' },
        { name: 'Đỏ', code: '#7B2727' },
        { name: 'Xanh Navy', code: '#2C3E50' },
        { name: 'Đen', code: '#222' },
        { name: 'Be', code: '#E5D3B3' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    images: [
        '/public/meomeo.jpg',
        '/public/meomeo.jpg',
        '/public/meomeo.jpg',
        '/public/meomeo.jpg',
        '/public/meomeo.jpg',
        '/public/meomeo.jpg',
    ],
    description: 'Áo thun cotton chất lượng cao, thoáng mát, phù hợp mọi hoạt động.',
};

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [mainImg, setMainImg] = useState(product.images[0]);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedReviewImage, setSelectedReviewImage] = useState('');

    const handleImageClick = (imageSrc) => {
        setSelectedReviewImage(imageSrc);
        setShowImageModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
            <div className="container mx-auto px-4">
                <Breadcrumb items={[
                    { label: 'Đồ Nam', href: '/men' },
                    { label: 'Áo Nam', href: '/men/shirts' },
                    { label: product.name }
                ]} />
                <div className="flex flex-col lg:flex-row gap-12 mt-6">
                    {/* Cột ảnh sản phẩm */}
                    <div className="flex w-full lg:w-1/2 gap-8">
                        {/* Thumbnails dọc */}
                        <div className="flex flex-row lg:flex-col gap-3 items-center lg:items-start">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt=""
                                    className={`w-16 h-16 object-cover rounded-xl border-2 shadow-sm cursor-pointer transition-all duration-150 ${mainImg === img ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                                    onClick={() => setMainImg(img)}
                                />
                            ))}
                        </div>
                        {/* Ảnh lớn */}
                        <div className="flex-1 flex items-start justify-center">
                            <img src={mainImg} alt={product.name} className="w-full max-w-[440px] h-[540px] object-cover rounded-2xl shadow-lg border bg-white" />
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-3">
                            <h1 className="text-4xl font-bold mb-1 leading-tight">{product.name}</h1>
                            <div className="text-gray-400 text-base mb-1">100% Cotton</div>
                            <hr />
                            {/* Giá và khuyến mãi */}
                            <div className="flex items-end gap-4 mb-2">
                                <span className="text-3xl font-bold text-red-600">{product.price.toLocaleString()}đ</span>
                                <span className="line-through text-gray-400 text-lg">{product.oldPrice.toLocaleString()}đ</span>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">-{product.discount}%</span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900 mb-2">
                                <span className="font-semibold">Freeship đơn trên 200K</span>
                            </div>
                            {/* Màu sắc */}
                            <div className="mb-2">
                                <div className="font-semibold mb-1 text-base text-gray-700">Màu sắc: <span className="font-normal text-gray-500">{selectedColor.name}</span></div>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color, idx) => (
                                        <button
                                            key={color.name}
                                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${selectedColor.name === color.name ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.code }}
                                            onClick={() => setSelectedColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Kích thước */}
                            <div className="mb-2">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-semibold text-base text-gray-700">Kích thước: <span className="font-normal text-gray-500">{selectedSize}</span></div>
                                    <button
                                        onClick={() => setShowSizeGuide(true)}
                                        className="text-blue-500 text-sm underline hover:text-blue-700"
                                    >
                                        Hướng dẫn chọn size
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`px-5 py-2 rounded-lg border text-base font-semibold transition-all duration-150 ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
                                            onClick={() => setSelectedSize(size)}
                                        >{size}</button>
                                    ))}
                                </div>
                            </div>
                            {/* Số lượng */}
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-base font-medium text-gray-700">Số lượng:</span>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 border rounded-lg text-lg hover:bg-gray-100">-</button>
                                <span className="text-lg font-medium px-2">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 border rounded-lg text-lg hover:bg-gray-100">+</button>
                            </div>
                            {/* Nút thêm vào giỏ */}
                            <button className="w-full py-4 bg-black text-white rounded-full font-bold text-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg mt-2">
                                <span className="material-icons">shopping_bag</span> Thêm vào giỏ
                            </button>
                            {/* Mô tả */}
                            <div className="mt-2 p-4 bg-gray-50 rounded-lg border text-base">
                                <h2 className="font-bold text-lg mb-2">Mô tả sản phẩm</h2>
                                <p className="leading-relaxed text-gray-700">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Feedback */}
                <div className="mt-16">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Đánh giá sản phẩm</h2>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-400 text-xl">★</span>
                                    <span className="text-lg font-semibold">{product.rating}</span>
                                </div>
                                <span className="text-gray-500">(128 đánh giá)</span>
                            </div>
                        </div>

                        {/* Thống kê đánh giá */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">5 sao</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">85%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">4 sao</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">10%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">3 sao</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '3%' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">3%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">2 sao</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">1%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">1 sao</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '1%' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-600">1%</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-gray-800 mb-1">{product.rating}</div>
                                    <div className="flex justify-center text-yellow-400 text-xl mb-2">
                                        {'★'.repeat(Math.floor(product.rating))}
                                        {product.rating % 1 > 0 && '☆'}
                                    </div>
                                    <p className="text-gray-600">Dựa trên 128 đánh giá</p>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách đánh giá */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Đánh giá gần đây</h3>

                            {/* Đánh giá 1 */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        NT
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-800">Nguyễn Thành</span>
                                            <div className="flex text-yellow-400">
                                                {'★'.repeat(5)}
                                            </div>
                                            <span className="text-sm text-gray-500">2 ngày trước</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">Áo rất đẹp, chất liệu cotton mềm mại, thoáng mát. Size vừa vặn, màu sắc đúng như hình. Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua thêm!</p>
                                        <div className="flex gap-2">
                                            <img
                                                src="/public/meomeo.jpg"
                                                alt="Review"
                                                className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => handleImageClick('/public/meomeo.jpg')}
                                            />
                                            <img
                                                src="/public/meomeo.jpg"
                                                alt="Review"
                                                className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => handleImageClick('/public/meomeo.jpg')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Đánh giá 2 */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        LM
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-800">Lê Minh</span>
                                            <div className="flex text-yellow-400">
                                                {'★'.repeat(4)}
                                            </div>
                                            <span className="text-sm text-gray-500">1 tuần trước</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">Chất lượng tốt, giá cả hợp lý. Áo mặc rất thoải mái, phù hợp cho công việc văn phòng. Chỉ hơi nhăn một chút khi giặt.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Đánh giá 3 */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        PT
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-800">Phạm Trang</span>
                                            <div className="flex text-yellow-400">
                                                {'★'.repeat(5)}
                                            </div>
                                            <span className="text-sm text-gray-500">2 tuần trước</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">Áo đẹp quá! Màu sắc tươi sáng, form dáng chuẩn. Chất liệu cotton cao cấp, không bị xù lông. Đã mua thêm 2 cái nữa!</p>
                                        <div className="flex gap-2">
                                            <img
                                                src="/public/meomeo.jpg"
                                                alt="Review"
                                                className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => handleImageClick('/public/meomeo.jpg')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nút xem thêm */}
                        <div className="text-center mt-8">
                            <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                Xem tất cả đánh giá
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal Hướng dẫn chọn size */}
                {showSizeGuide && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Hướng dẫn chọn size</h3>
                                    <button
                                        onClick={() => setShowSizeGuide(false)}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Bảng size áo thun nam</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-300">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left">Chiều rộng ngực (cm)</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left">Chiều dài áo (cm)</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left">Cân nặng (kg)</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-left">Chiều cao (cm)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">S</td>
                                                        <td className="border border-gray-300 px-4 py-2">96-100</td>
                                                        <td className="border border-gray-300 px-4 py-2">68</td>
                                                        <td className="border border-gray-300 px-4 py-2">55-65</td>
                                                        <td className="border border-gray-300 px-4 py-2">160-170</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">M</td>
                                                        <td className="border border-gray-300 px-4 py-2">100-104</td>
                                                        <td className="border border-gray-300 px-4 py-2">70</td>
                                                        <td className="border border-gray-300 px-4 py-2">65-75</td>
                                                        <td className="border border-gray-300 px-4 py-2">165-175</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">L</td>
                                                        <td className="border border-gray-300 px-4 py-2">104-108</td>
                                                        <td className="border border-gray-300 px-4 py-2">72</td>
                                                        <td className="border border-gray-300 px-4 py-2">75-85</td>
                                                        <td className="border border-gray-300 px-4 py-2">170-180</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">XL</td>
                                                        <td className="border border-gray-300 px-4 py-2">108-112</td>
                                                        <td className="border border-gray-300 px-4 py-2">74</td>
                                                        <td className="border border-gray-300 px-4 py-2">85-95</td>
                                                        <td className="border border-gray-300 px-4 py-2">175-185</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">2XL</td>
                                                        <td className="border border-gray-300 px-4 py-2">112-116</td>
                                                        <td className="border border-gray-300 px-4 py-2">76</td>
                                                        <td className="border border-gray-300 px-4 py-2">95-105</td>
                                                        <td className="border border-gray-300 px-4 py-2">180-190</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2 font-medium">3XL</td>
                                                        <td className="border border-gray-300 px-4 py-2">116-120</td>
                                                        <td className="border border-gray-300 px-4 py-2">78</td>
                                                        <td className="border border-gray-300 px-4 py-2">105-115</td>
                                                        <td className="border border-gray-300 px-4 py-2">185-195</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Cách đo size</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-800 mb-2">1. Đo vòng ngực</h5>
                                                <p className="text-gray-600 text-sm">Đo vòng quanh ngực tại điểm rộng nhất, thường là qua núm vú.</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-800 mb-2">2. Đo chiều dài áo</h5>
                                                <p className="text-gray-600 text-sm">Đo từ vai xuống đến độ dài mong muốn của áo.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-800 mb-2">💡 Lưu ý</h4>
                                        <ul className="text-blue-700 text-sm space-y-1">
                                            <li>• Kích thước có thể thay đổi tùy theo nhà sản xuất</li>
                                            <li>• Nên chọn size lớn hơn nếu bạn thích áo rộng rãi</li>
                                            <li>• Áo cotton có thể co lại khoảng 3-5% sau khi giặt</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setShowSizeGuide(false)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Đã hiểu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Xem ảnh đánh giá */}
                {showImageModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="relative max-w-4xl max-h-[90vh]">
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
                            >
                                ×
                            </button>
                            <img
                                src={selectedReviewImage}
                                alt="Review"
                                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 