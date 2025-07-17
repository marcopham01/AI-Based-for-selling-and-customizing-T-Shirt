import { useState, useEffect } from 'react'
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../../api/adminApi'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
// import { Form, Input, InputNumber, Checkbox, Select, Button } from 'antd'; // Bỏ dòng này

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [formState, setFormState] = useState({ visible: false, mode: 'add', initialValues: {} });
  const [formValues, setFormValues] = useState({
    name: '', price: '', discount: '', bestSeller: false, material: '', gender: '', sizes: '', images: '', description: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('')

  // Load products từ API
  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProducts()
      setProducts(response.data.data)
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (formState.visible) {
      setFormValues({
        name: formState.initialValues.name || '',
        price: formState.initialValues.price || '',
        discount: formState.initialValues.discount || '',
        bestSeller: formState.initialValues.bestSeller || false,
        material: formState.initialValues.material || '',
        gender: formState.initialValues.gender || '',
        sizes: Array.isArray(formState.initialValues.sizes) ? formState.initialValues.sizes.join(', ') : (formState.initialValues.sizes || ''),
        images: Array.isArray(formState.initialValues.images) ? formState.initialValues.images.join(', ') : (formState.initialValues.images || ''),
        description: formState.initialValues.description || ''
      });
      setFormErrors({});
    } else {
      setFormValues({
        name: '', price: '', discount: '', bestSeller: false, material: '', gender: '', sizes: '', images: '', description: ''
      });
      setFormErrors({});
    }
  }, [formState]);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = 'Bắt buộc';
    if (!formValues.price || isNaN(Number(formValues.price))) errors.price = 'Bắt buộc & phải là số';
    if (!formValues.material.trim()) errors.material = 'Bắt buộc';
    if (!formValues.gender.trim()) errors.gender = 'Bắt buộc';
    if (!formValues.sizes.trim()) errors.sizes = 'Bắt buộc';
    if (!formValues.images.trim()) errors.images = 'Bắt buộc';
    return errors;
  };

  const handleFormChange = e => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setModalLoading(true);
    try {
      const payload = {
        ...formValues,
        price: Number(formValues.price),
        discount: formValues.discount ? Number(formValues.discount) : 0,
        images: formValues.images.split(',').map(i => i.trim()).filter(Boolean),
        sizes: formValues.sizes.split(',').map(s => s.trim()).filter(Boolean),
      };
      if (formState.mode === 'add') {
        await createProduct(payload);
      } else if (formState.mode === 'edit') {
        await updateProduct(formState.initialValues._id, payload);
      }
      setFormState({ ...formState, visible: false });
      loadProducts();
    } catch (err) {
      console.error('Lỗi khi gửi dữ liệu CRUD sản phẩm:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) return;
    setModalLoading(true);
    try {
      await deleteProduct(product._id);
      loadProducts();
    } catch (err) {
      console.error('Lỗi khi xóa sản phẩm:', err);
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '18px',
        color: '#7b1fa2'
      }}>
        Đang tải...
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 24,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      padding: 40,
      minHeight: 600,
      maxWidth: 1100,
      margin: '0 auto'
    }}>
      <h2 style={{
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: '#4f2e91',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>✨ Quản lý sản phẩm ✨</h2>
      {error && (
        <div style={{
          background: '#f3e5f5',
          color: '#7b1fa2',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #ce93d8'
        }}>
          {error}
        </div>
      )}
      <div style={{
        marginBottom: 32,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ position: 'relative', width: 320 }}>
          <SearchOutlined style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#222', fontSize: 18, zIndex: 1 }} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, loại hoặc mô tả"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '14px 14px 14px 38px',
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              outline: 'none',
              width: '100%',
              background: 'rgba(255,255,255,0.7)',
              fontSize: 16,
              color: 'black',
              boxShadow: '0 2px 8px #b39ddb22'
            }}
          />
        </div>
        <button
          style={{
            background: '#fff',
            color: '#222',
            border: '1.5px solid #e0e0e0',
            borderRadius: 10,
            padding: '12px 24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: 16,
            boxShadow: '0 2px 8px #b39ddb11',
            transition: 'all 0.2s',
            marginLeft: 8
          }}
          onMouseOver={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseOut={e => e.currentTarget.style.background = '#fff'}
          onClick={() => setFormState({ visible: true, mode: 'add', initialValues: {} })}
        >
          + Tạo Sản Phẩm
        </button>
      </div>
      {/* Inline Form */}
      {formState.visible && (
        <div style={{
          background: '#f8f6ff',
          border: '1px solid #ce93d8',
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          boxShadow: '0 2px 12px #b39ddb22',
        }}>
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ flex: '1 1 220px', minWidth: 220 }}>
                <label>Tên sản phẩm *</label>
                <input name="name" value={formValues.name} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                {formErrors.name && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.name}</div>}
              </div>
              <div style={{ flex: '1 1 120px', minWidth: 120 }}>
                <label>Giá *</label>
                <input name="price" value={formValues.price} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                {formErrors.price && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.price}</div>}
              </div>
              <div style={{ flex: '1 1 120px', minWidth: 120 }}>
                <label>Giảm giá (%)</label>
                <input name="discount" value={formValues.discount} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
              <div style={{ flex: '1 1 120px', minWidth: 120, display: 'flex', alignItems: 'center', marginTop: 24 }}>
                <input type="checkbox" name="bestSeller" checked={formValues.bestSeller} onChange={handleFormChange} /> <span style={{ marginLeft: 8 }}>Best Seller</span>
              </div>
              <div style={{ flex: '1 1 180px', minWidth: 180 }}>
                <label>Chất liệu *</label>
                <input name="material" value={formValues.material} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                {formErrors.material && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.material}</div>}
              </div>
              <div style={{ flex: '1 1 120px', minWidth: 120 }}>
                <label>Giới tính *</label>
                <select name="gender" value={formValues.gender} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
                  <option value="">--Chọn--</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="unisex">Unisex</option>
                </select>
                {formErrors.gender && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.gender}</div>}
              </div>
              <div style={{ flex: '1 1 180px', minWidth: 180 }}>
                <label>Kích thước *</label>
                <input name="sizes" value={formValues.sizes} onChange={handleFormChange} placeholder="VD: S, M, L, XL" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                {formErrors.sizes && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.sizes}</div>}
              </div>
              <div style={{ flex: '1 1 220px', minWidth: 220 }}>
                <label>Hình ảnh (url, cách nhau bởi dấu phẩy) *</label>
                <input name="images" value={formValues.images} onChange={handleFormChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                {formErrors.images && <div style={{ color: 'red', fontSize: 13 }}>{formErrors.images}</div>}
              </div>
              <div style={{ flex: '1 1 320px', minWidth: 320 }}>
                <label>Mô tả</label>
                <textarea name="description" value={formValues.description} onChange={handleFormChange} rows={2} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button type="submit" disabled={modalLoading} style={{ background: '#4f2e91', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{formState.mode === 'add' ? 'Thêm' : 'Lưu'}</button>
              <button type="button" onClick={() => setFormState({ ...formState, visible: false })} style={{ background: '#fff', color: '#4f2e91', border: '1.5px solid #ce93d8', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Hủy</button>
            </div>
          </form>
        </div>
      )}
      {/* End Inline Form */}
      <div style={{
        overflowX: 'auto',
        borderRadius: 14,
        boxShadow: '0 4px 24px #9575cd33',
        background: 'rgba(255,255,255,0.85)',
        marginBottom: 32
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 17,
        }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)' }}>
              <th style={thStyle}>Tên sản phẩm</th>
              <th style={thStyle}>Giá (VNĐ)</th>
              <th style={thStyle}>Giảm giá (%)</th>
              <th style={thStyle}>Best Seller</th>
              <th style={thStyle}>Chất liệu</th>
              <th style={thStyle}>Giới tính</th>
              <th style={thStyle}>Kích thước</th>
              <th style={thStyle}>Hình ảnh</th>
              <th style={thStyle}>Mô tả</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#b39ddb',
                  fontStyle: 'italic'
                }}>Không có sản phẩm nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(p => (
              <tr key={p._id} style={{
                background: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s'
              }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.price?.toLocaleString()}</td>
                <td style={tdStyle}>{p.discount || 0}</td>
                <td style={tdStyle}>{p.bestSeller ? '✔' : ''}</td>
                <td style={tdStyle}>{p.material}</td>
                <td style={tdStyle}>{p.gender}</td>
                <td style={tdStyle}>{Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {Array.isArray(p.images) && p.images.length > 0 ? p.images.map((img, idx) => (
                      <img key={idx} src={img} alt="Ảnh sản phẩm" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} 
                        onError={e => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
                      />
                    )) : 'Không có ảnh'}
                  </div>
                </td>
                <td style={tdStyle}>{p.description || 'Không có mô tả'}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, marginRight: 8 }} title="Sửa" onClick={() => setFormState({ visible: true, mode: 'edit', initialValues: {
                    ...p,
                    images: Array.isArray(p.images) ? p.images.join(', ') : (p.images || ''),
                    sizes: Array.isArray(p.sizes) ? p.sizes : (typeof p.sizes === 'string' ? p.sizes.split(',').map(s => s.trim()).filter(Boolean) : []),
                    gender: (p.gender || '').toLowerCase()
                  } })}><EditOutlined /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }} title="Xóa" onClick={() => handleDelete(p)}><DeleteOutlined /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle = {
  padding: 18,
  borderBottom: '2px solid #ce93d8',
  textAlign: 'left',
  color: '#4527a0',
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 0.5
}
const tdStyle = {
  padding: 14,
  borderBottom: '1px solid #e1bee7',
  color: '#333'
}
