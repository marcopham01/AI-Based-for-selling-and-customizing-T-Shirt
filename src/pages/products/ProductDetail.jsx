import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { getProducts } from '../../api/productApi';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCartOutlined, HighlightOutlined } from '@ant-design/icons';
import { message } from 'antd';


const product = {
    name: 'Áo Thun Nam Cotton 220GSM',
    price: 159000,
    oldPrice: 179000,
    discount: 11,
    rating: 4.85,
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
    const { id } = useParams();
    const [productData, setProductData] = useState(product);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [mainImg, setMainImg] = useState(product.images[0]);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedReviewImage, setSelectedReviewImage] = useState('');

    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                const products = Array.isArray(response.data) ? response.data : (response.data.products || response.data.data || []);
                const foundProduct = products.find(p => (p.id || p._id) == id);
                
                if (foundProduct) {
                    setProductData({
                        ...foundProduct,
                        sizes: foundProduct.sizes || product.sizes,
                        images: foundProduct.images || [foundProduct.image || '/public/meomeo.jpg'],
                        oldPrice: foundProduct.originalPrice || foundProduct.price * 1.2,
                        discount: Math.round((1 - foundProduct.price / (foundProduct.originalPrice || foundProduct.price * 1.2)) * 100)
                    });
                    setSelectedSize(foundProduct.sizes?.[0] || product.sizes[0]);
                    setMainImg(foundProduct.images?.[0] || foundProduct.image || '/public/meomeo.jpg');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleImageClick = (imageSrc) => {
        setSelectedReviewImage(imageSrc);
        setShowImageModal(true);
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            message.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }

        const productToAdd = {
            ...productData,
            id: productData.id || productData._id || id,
            size: selectedSize,
            quantity: quantity
        };

        addToCart(productToAdd);
        message.success(`${productData.name} (Size ${selectedSize}) đã được thêm vào giỏ hàng!`);
    };

    const handleCustomDesign = () => {
        navigate('/custom');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-xl">Đang tải...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
            <div className="container mx-auto px-4">
                <Breadcrumb items={[
                    { label: 'Đồ Nam', href: '/men' },
                    { label: 'Áo Nam', href: '/men/shirts' },
                    { label: productData.name }
                ]} />
                <div className="flex flex-col lg:flex-row gap-12 mt-6">
                    {/* Cột ảnh sản phẩm */}
                    <div className="flex w-full lg:w-1/2 gap-8">
                        {/* Thumbnails dọc */}
                        <div className="flex flex-row lg:flex-col gap-3 items-center lg:items-start">
                            {productData.images.map((img, idx) => (
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
                            <img src={mainImg} alt={productData.name} className="w-full max-w-[440px] h-[540px] object-cover rounded-2xl shadow-lg border bg-white" />
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-3">
                            <h1 className="text-4xl font-bold mb-1 leading-tight">{productData.name}</h1>
                            <div className="text-gray-400 text-base mb-1">100% Cotton</div>
                            <hr />
                            {/* Giá và khuyến mãi */}
                            <div className="flex items-end gap-4 mb-2">
                                <span className="text-3xl font-bold text-red-600">{productData.price.toLocaleString()}đ</span>
                                <span className="line-through text-gray-400 text-lg">{productData.oldPrice.toLocaleString()}đ</span>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">-{productData.discount}%</span>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900 mb-2">
                                <span className="font-semibold">Freeship đơn trên 200K</span>
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
                                    {productData.sizes.map(size => (
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
                            <button 
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-black text-white rounded-full font-bold text-xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg mt-2 hover:shadow-xl active:shadow-md"
                            >
                                <ShoppingCartOutlined style={{ fontSize: 24 }} />
                                Thêm vào giỏ
                            </button>
                            
                            {/* Nút tự thiết kế */}
                            <button 
                                onClick={handleCustomDesign}
                                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xl hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg mt-3 hover:shadow-xl active:shadow-md"
                            >
                                <HighlightOutlined style={{ fontSize: 24 }} />
                                Tự Thiết Kế Áo
                            </button>
                            {/* Mô tả */}
                            <div className="mt-2 p-4 bg-gray-50 rounded-lg border text-base">
                                <h2 className="font-bold text-lg mb-2">Mô tả sản phẩm</h2>
                                <p className="leading-relaxed text-gray-700">{productData.description}</p>
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
                                    <span className="text-lg font-semibold">{productData.rating}</span>
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
                                    <div className="text-4xl font-bold text-gray-800 mb-1">{productData.rating}</div>
                                    <div className="flex justify-center text-yellow-400 text-xl mb-2">
                                        {'★'.repeat(Math.floor(productData.rating))}
                                        {productData.rating % 1 > 0 && '☆'}
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