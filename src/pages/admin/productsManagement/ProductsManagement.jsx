import { useState, useEffect } from 'react'
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../../api/adminApi'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: '',
    sizes: [],
    material: '',
    gender: '',
    images: [],
    discount: 0,
    bestSeller: false
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
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

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.material || !form.sizes.length || !form.images.length) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    try {
      setLoading(true)
      const productData = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount),
        bestSeller: form.bestSeller,
        sizes: form.sizes.length > 0 ? form.sizes : ['S', 'M', 'L', 'XL'],
        images: form.images.length > 0 ? form.images : []
      }
      await createProduct(productData)
      setForm({ 
        name: '', 
        price: '', 
        description: '', 
        category: '',
        discount: 0,
        bestSeller: false,
        sizes: [],
        material: '',
        gender: '',
        images: []
      })
      loadProducts() // Reload danh sách
      setError('')
    } catch (err) {
      setError('Không thể tạo sản phẩm mới')
      console.error('Error creating product:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (p) => {
    setEditingId(p._id)
    setForm({
      name: p.name,
      price: p.price,
      description: p.description || '',
      category: p.category,
      discount: p.discount || 0,
      bestSeller: p.bestSeller || false,
      sizes: p.sizes || [],
      material: p.material || '',
      gender: p.gender || '',
      images: p.images || []
    })
  }

  const handleUpdate = async () => {
    if (!form.name || !form.price || !form.material || !form.sizes.length || !form.images.length) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }

    try {
      setLoading(true)
      const productData = {
        ...form,
        price: Number(form.price),
        discount: Number(form.discount),
        bestSeller: form.bestSeller,
        sizes: form.sizes.length > 0 ? form.sizes : ['S', 'M', 'L', 'XL'],
        images: form.images.length > 0 ? form.images : []
      }
      await updateProduct(editingId, productData)
      setEditingId(null)
      setForm({ 
        name: '', 
        price: '', 
        description: '', 
        category: '',
        discount: 0,
        bestSeller: false,
        sizes: [],
        material: '',
        gender: '',
        images: []
      })
      loadProducts() // Reload danh sách
      setError('')
    } catch (err) {
      setError('Không thể cập nhật sản phẩm')
      console.error('Error updating product:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      try {
        setLoading(true)
        await deleteProduct(id)
        loadProducts() // Reload danh sách
        setError('')
      } catch (err) {
        setError('Không thể xóa sản phẩm')
        console.error('Error deleting product:', err)
      } finally {
        setLoading(false)
      }
    }
  }

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
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên, loại hoặc mô tả"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 14,
            borderRadius: 12,
            border: 'none',
            outline: 'none',
            width: 320,
            background: 'rgba(255,255,255,0.7)',
            fontSize: 16,
            color: 'black',
            boxShadow: '0 2px 8px #b39ddb55'
          }}
        />
      </div>
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
                      <img key={idx} src={img} alt="Ảnh sản phẩm" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                    )) : 'Không có ảnh'}
                  </div>
                </td>
                <td style={tdStyle}>{p.description || 'Không có mô tả'}</td>
                <td style={tdStyle}>
                  <button style={btnEdit} onClick={() => handleEdit(p)}>Sửa</button>
                  <button style={btnDelete} onClick={() => handleDelete(p._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={{
        fontSize: 22,
        color: '#7b1fa2',
        marginBottom: 18,
        marginTop: 0,
        fontWeight: 700,
        textShadow: '0 2px 8px #fff7'
      }}>
        {editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
      </h3>
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 12,
        flexWrap: 'wrap'
      }}>
        <input
          name="name"
          placeholder="Tên sản phẩm *"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="price"
          type="number"
          placeholder="Giá *"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="discount"
          type="number"
          placeholder="Giảm giá (%)"
          value={form.discount || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
          <input
            name="bestSeller"
            type="checkbox"
            checked={!!form.bestSeller}
            onChange={e => setForm({ ...form, bestSeller: e.target.checked })}
            style={{ width: 18, height: 18 }}
          />
          Best Seller
        </label>
        <input
          name="material"
          placeholder="Chất liệu *"
          value={form.material}
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Chọn giới tính *</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="unisex">Unisex</option>
        </select>
        <input
          name="sizes"
          placeholder="Kích thước (VD: S, M, L, XL) *"
          value={form.sizes.join(', ')}
          onChange={e => setForm({ ...form, sizes: e.target.value.split(',').map(s => s.trim()) })}
          style={inputStyle}
        />
        <input
          name="images"
          placeholder="Hình ảnh (url, cách nhau bởi dấu phẩy) *"
          value={form.images.join(', ')}
          onChange={e => setForm({ ...form, images: e.target.value.split(',').map(img => img.trim()) })}
          style={inputStyle}
        />
        {form.images.length > 0 && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {form.images.map((img, idx) => img && (
              <img key={idx} src={img} alt="Ảnh preview" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
            ))}
          </div>
        )}
        <input
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          style={inputStyle}
        />
        {editingId ? (
          <button style={btnSave} onClick={handleUpdate}>💾 Lưu</button>
        ) : (
          <button style={btnAdd} onClick={handleAdd}>➕ Thêm</button>
        )}
        {editingId && (
          <button style={btnCancel} onClick={() => {
            setEditingId(null)
            setForm({
              name: '',
              price: '',
              description: '',
              category: '',
              discount: 0,
              bestSeller: false,
              sizes: [],
              material: '',
              gender: '',
              images: []
            })
          }}>Hủy</button>
        )}
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
const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: 'none',
  outline: 'none',
  background: 'rgba(255,255,255,0.8)',
  fontSize: 16,
  color: 'black',
  boxShadow: '0 2px 8px #b39ddb33',
  minWidth: 140
}
const btnAdd = {
  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '12px 24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 16,
  boxShadow: '0 4px 15px #43e97b55',
  transition: 'all 0.3s ease'
}
const btnSave = {
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '12px 24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 16,
  boxShadow: '0 4px 15px #667eea55',
  transition: 'all 0.3s ease'
}
const btnEdit = {
  background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '8px 16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 14,
  marginRight: 8,
  boxShadow: '0 2px 8px #f093fb55',
  transition: 'all 0.3s ease'
}
const btnDelete = {
  background: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '8px 16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 14,
  boxShadow: '0 2px 8px #ff9a9e55',
  transition: 'all 0.3s ease'
}
const btnCancel = {
  background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
  color: '#333',
  border: 'none',
  borderRadius: 10,
  padding: '12px 24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 16,
  boxShadow: '0 4px 15px #a8edea55',
  transition: 'all 0.3s ease'
}
