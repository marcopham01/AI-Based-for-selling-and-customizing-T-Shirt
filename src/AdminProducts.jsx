import { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'T-Shirt Basic', price: 150000, stock: 20, category: 'Áo thun' },
  { id: 2, name: 'T-Shirt Premium', price: 250000, stock: 10, category: 'Áo thun' },
  { id: 3, name: 'Hoodie', price: 350000, stock: 5, category: 'Áo khoác' },
]

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', price: '', stock: '', category: '' })
  const [editingId, setEditingId] = useState(null)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.name || !form.price || !form.stock || !form.category) return
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category
      }
    ])
    setForm({ name: '', price: '', stock: '', category: '' })
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category
    })
  }

  const handleUpdate = () => {
    setProducts(products.map(p =>
      p.id === editingId
        ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
        : p
    ))
    setEditingId(null)
    setForm({ name: '', price: '', stock: '', category: '' })
  }

  const handleDelete = id => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      borderRadius: 18,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      padding: 100,
      margin: '0 auto',
      maxWidth: 950,
      minHeight: 600,
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.18)'
    }}>
      <h2 style={{
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: '#4f2e91',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>✨ Quản lý sản phẩm ✨</h2>
      <div style={{
        marginBottom: 32,
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên hoặc loại"
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
              <th style={thStyle}>Loại</th>
              <th style={thStyle}>Giá (VNĐ)</th>
              <th style={thStyle}>Tồn kho</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#b39ddb',
                  fontStyle: 'italic'
                }}>Không có sản phẩm nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(p => (
              <tr key={p.id} style={{
                background: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s'
              }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.category}</td>
                <td style={tdStyle}>{p.price.toLocaleString()}</td>
                <td style={tdStyle}>{p.stock}</td>
                <td style={tdStyle}>
                  <button style={btnEdit} onClick={() => handleEdit(p)}>Sửa</button>
                  <button style={btnDelete} onClick={() => handleDelete(p.id)}>Xóa</button>
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
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="category"
          placeholder="Loại"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="stock"
          type="number"
          placeholder="Tồn kho"
          value={form.stock}
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
            setForm({ name: '', price: '', stock: '', category: '' })
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
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #43e97b55',
  transition: 'background 0.2s'
}
const btnSave = {
  ...btnAdd,
  background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
  color: '#222'
}
const btnEdit = {
  ...btnAdd,
  background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)',
  color: '#222',
  marginRight: 8
}
const btnDelete = {
  ...btnAdd,
  background: 'linear-gradient(90deg, #f857a6 0%, #ff5858 100%)'
}
const btnCancel = {
  ...btnAdd,
  background: 'linear-gradient(90deg, #bdbdbd 0%, #e0e0e0 100%)',
  color: '#222'
}