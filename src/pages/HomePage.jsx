import React, { useState } from 'react'
import Carousel from '../components/Carousel'
import { useNavigate } from 'react-router-dom'
import ButtonFilter, { filters } from '../components/ButtonFilter'

// Component hiển thị từng category như hình mẫu
const CategoryCard = ({ image, title, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-2"
    style={{ width: 220 }}
  >
    <div
      className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white"
      style={{ width: 220, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
    </div>
    <div className="mt-4 text-lg font-bold text-black text-center uppercase tracking-wide">
      {title}
    </div>
  </div>
);

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      <Carousel />
      <div className="container mx-auto text-center pt-20 px-4">
        <h1 className="text-3xl font-bold text-blue-600">EXPLORE NEW TRENDING PRODUCTS</h1>
      </div>
      <div className="flex justify-center mt-8 mb-4">
        <ButtonFilter
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      {/* Section About Us với nền ảnh */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center mt-8"
        style={{
          backgroundImage: `url('https://assets.hermes.com/is/image/hermesedito/P_169_D_PE25_LOOK_12?fit=wrap%2C0&wid=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          objectFit: 'cover',
        }}
      >
        {/* Lớp phủ mờ */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
        {/* Nội dung chữ */}
        <div className="relative z-10 text-white w-full flex justify-center md:justify-end">
          <div className="text-center md:text-right max-w-2xl px-10">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">About Us</h2>
            <p className="text-lg drop-shadow mb-6">
              Chúng tôi là đội ngũ đam mê sáng tạo, mang đến những sản phẩm áo thun chất lượng cao, thời trang và cá tính. Sứ mệnh của chúng tôi là giúp bạn thể hiện phong cách riêng qua từng chiếc áo.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="mt-2 px-6 py-2 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-100 transition transform hover:scale-105 duration-200 ease-in-out"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
