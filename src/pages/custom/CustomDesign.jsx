import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Select, Input, message } from 'antd';

const sizes = ['S', 'M', 'L', 'XL', '2XL'];
const materials = ['Cotton', 'Polyester', 'Linen', 'Bamboo'];

const CustomDesign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  const [productName, setProductName] = useState('Áo thun thiết kế AI');
  const [size, setSize] = useState('M');
  const [material, setMaterial] = useState('Cotton');
  const [adding, setAdding] = useState(false);

  // Giả lập hàm addToCart, bạn thay bằng context/cart thực tế nếu có
  const addToCart = (product) => {
    // TODO: Thay bằng logic thực tế
    message.success('Đã thêm sản phẩm vào giỏ hàng!');
    navigate('/cart');
  };

  if (!image) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#d32f2f', fontSize: 20 }}>Không tìm thấy ảnh thiết kế. Vui lòng quay lại trang tạo thiết kế!</div>;
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e3eafc', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Tạo sản phẩm từ thiết kế AI</h2>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Mockup áo */}
        <div style={{ width: 240, height: 300, background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 2px 8px #e3eafc' }}>
          {/* Hình áo đơn giản */}
          <img src="/public/meomeo.jpg" alt="T-shirt mockup" style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 16, opacity: 0.25, position: 'absolute', top: 30, left: 20, zIndex: 1 }} />
          {/* Ảnh thiết kế AI */}
          <img src={image} alt="Thiết kế AI" style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 12, zIndex: 2, position: 'relative' }} />
        </div>
        {/* Form nhập thông tin */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ marginBottom: 16 }}>
            <label>Tên sản phẩm</label>
            <Input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Nhập tên sản phẩm" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Kích thước</label>
            <Select value={size} onChange={setSize} style={{ width: '100%' }}>
              {sizes.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
            </Select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Chất liệu</label>
            <Select value={material} onChange={setMaterial} style={{ width: '100%' }}>
              {materials.map(m => <Select.Option key={m} value={m}>{m}</Select.Option>)}
            </Select>
          </div>
          <Button
            type="primary"
            size="large"
            loading={adding}
            style={{ width: '100%', marginTop: 12, background: '#1976d2', borderRadius: 8 }}
            onClick={() => {
              setAdding(true);
              setTimeout(() => {
                addToCart({
                  name: productName,
                  size,
                  material,
                  image,
                  price: 199000,
                  quantity: 1,
                  description: 'Sản phẩm thiết kế từ AI',
                });
                setAdding(false);
              }, 800);
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
