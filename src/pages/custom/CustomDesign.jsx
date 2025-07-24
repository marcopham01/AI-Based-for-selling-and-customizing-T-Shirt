import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserProduct } from '../../api/productApi';
import { message } from 'antd';

const sizeOptions = ['S', 'M', 'L', 'XL', '2XL'];
const genderOptions = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'unisex', label: 'Unisex' },
];
const materialOptions = ['Cotton', 'Polyester', 'Linen', 'Bamboo'];

export default function CustomDesign() {
  const location = useLocation();
  const navigate = useNavigate();
  // Nếu từ chat sẽ có location.state?.image, nếu từ header thì không có
  const chatImage = location.state?.image || null;

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 300000,
    sizes: [],
    gender: '',
    material: '',
    image: null, // File hoặc URL
    imagePreview: chatImage || null,
  });
  const [loading, setLoading] = useState(false);

  // Xử lý upload ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate cơ bản
  const validate = () => {
    if (!form.name || !form.sizes.length || !form.gender || !form.material || !form.imagePreview) {
      message.error('Vui lòng điền đầy đủ các trường bắt buộc và chọn ảnh thiết kế!');
      return false;
    }
    return true;
  };

  // Thêm hàm chuyển base64 sang file
  function dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', Number(form.price) || 300000);
      formData.append('sizes', JSON.stringify(form.sizes)); // gửi dạng chuỗi
      formData.append('gender', form.gender);
      formData.append('material', form.material);

      // Xử lý ảnh: nếu là file upload thì dùng, nếu là base64 thì convert sang file
      let imageFile = form.image;
      if (!imageFile && form.imagePreview && form.imagePreview.startsWith('data:image')) {
        imageFile = dataURLtoFile(form.imagePreview, 'design.png');
      }
      formData.append('image', imageFile);

      await createUserProduct(formData); // sửa API để nhận FormData
      message.success('Tạo sản phẩm thành công!');
      navigate('/profile');
    } catch (error) {
      message.error('Có lỗi khi tạo sản phẩm: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e3eafc', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Tạo thiết kế áo thun</h2>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Ảnh thiết kế */}
        <div style={{ width: 240, minHeight: 260, background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 2px 8px #e3eafc', marginBottom: 16 }}>
          {form.imagePreview ? (
            <img src={form.imagePreview} alt="Thiết kế" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 12, zIndex: 2, position: 'relative', background: '#fff' }} />
          ) : (
            <span style={{ color: '#888' }}>Chưa có ảnh thiết kế</span>
          )}
        </div>
        {/* Form nhập thông tin */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Tên sản phẩm *</label>
            <input
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập tên sản phẩm"
              required
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e3eafc', marginTop: 4 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Giá (VNĐ)</label>
            <input
              className="input"
              type="number"
              value={form.price}
              readOnly
              disabled
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e3eafc', marginTop: 4, background: '#f5f5f5', color: '#888' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Kích cỡ *</label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setForm({ ...form, sizes: [size] })}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: form.sizes[0] === size ? '2px solid #1976d2' : '1px solid #e3eafc',
                    background: form.sizes[0] === size ? '#EFEFEF' : '#fff',
                    color: form.sizes[0] === size ? '#000' : '#222',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: 48,
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Giới tính *</label>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {genderOptions.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setForm({ ...form, gender: g.value })}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: form.gender === g.value ? '2px solid #1976d2' : '1px solid #e3eafc',
                    background: form.gender === g.value ? '#EFEFEF' : '#fff',
                    color: form.gender === g.value ? '#000' : '#222',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: 70,
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Chất liệu *</label>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {materialOptions.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm({ ...form, material: m })}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: form.material === m ? '2px solid #1976d2' : '1px solid #e3eafc',
                    background: form.material === m ? '#EFEFEF' : '#fff',
                    color: form.material === m ? '#000' : '#222',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: 90,
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Mô tả</label>
            <textarea
              className="input"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Mô tả sản phẩm hoặc lưu ý đến sản phẩm (không bắt buộc)"
              rows={2}
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e3eafc', marginTop: 4 }}
            />
          </div>
          </div>
          {/* Ảnh thiết kế */}
          {!chatImage && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>Ảnh thiết kế *</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Đang tạo...' : 'Tạo sản phẩm'}
          </button>
        </div>
      </div>
    </form>
  );
}
