import { useState, useEffect } from 'react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ username: '', email: '', role: 'user', status: 'active' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiBase = 'https://687321edc75558e273536526.mockapi.io/api/admin_users'

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch(apiBase)
        if (!res.ok) throw new Error('Lấy dữ liệu thất bại')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAdd = async () => {
    if (!form.username || !form.email) return
    try {
      const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Thêm người dùng thất bại')
      const newUser = await res.json()
      setUsers(prev => [...prev, newUser])
      setForm({ username: '', email: '', role: 'user', status: 'active' })
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = u => {
    setEditingId(u.id)
    setForm({ username: u.username, email: u.email, role: u.role, status: u.status })
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${apiBase}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Cập nhật thất bại')
      const updated = await res.json()
      setUsers(prev => prev.map(u => u.id === editingId ? updated : u))
      setEditingId(null)
      setForm({ username: '', email: '', role: 'user', status: 'active' })
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) return
    try {
      const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Xóa thất bại')
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>🔄 Đang tải dữ liệu...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>🌟 Quản lý người dùng 🌟</h2>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên hoặc email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadRowStyle}>
              <th style={thStyle}>Tên đăng nhập</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Vai trò</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ ...tdStyle, textAlign: 'center', color: '#ffb300', fontStyle: 'italic' }}>
                  Không có người dùng nào phù hợp.
                </td>
              </tr>
            )}
            {filtered.map(u => (
              <tr key={u.id} style={tbodyRowStyle}>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.role === 'admin' ? 'Admin' : 'User'}</td>
                <td style={tdStyle}>
                  <span style={u.status === 'active' ? statusActiveStyle : statusInactiveStyle}>
                    {u.status === 'active' ? 'Hoạt động' : 'Khóa'}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button style={btnEdit} onClick={() => handleEdit(u)}>Sửa</button>
                  <button style={btnDelete} onClick={() => handleDelete(u.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={formHeaderStyle}>{editingId ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}</h3>
      <div style={formContainerStyle}>
        <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} style={inputStyle} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
        <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
          <option value="active">Hoạt động</option>
          <option value="inactive">Khóa</option>
        </select>
        {editingId ? (
          <button style={btnSave} onClick={handleUpdate}>💾 Lưu</button>
        ) : (
          <button style={btnAdd} onClick={handleAdd}>➕ Thêm</button>
        )}
        {editingId && (
          <button style={btnCancel} onClick={() => { setEditingId(null); setForm({ username: '', email: '', role: 'user', status: 'active' }) }}>Hủy</button>
        )}
      </div>
    </div>
  )
}

// Styles
const containerStyle = {
  background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  borderRadius: 18,
  boxShadow: '0 8px 32px 0 rgba(255, 140, 0, 0.25)',
  padding: '100px 50px',
  margin: '0 auto',
  maxWidth: 950,
  minHeight: 600,
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.18)'
}
const headerStyle = { marginBottom: 32, fontSize: 32, fontWeight: 800, color: '#d84315', letterSpacing: 1, textShadow: '0 2px 12px #fff8' }
const searchContainerStyle = { marginBottom: 32, display: 'flex', gap: 16, alignItems: 'center' }
const searchInputStyle = { padding: 14, borderRadius: 12, border: 'none', outline: 'none', width: 320, background: 'rgba(255,255,255,0.85)', fontSize: 16, color: 'black', boxShadow: '0 2px 8px #ffb30055' }
const tableWrapperStyle = { overflowX: 'auto', borderRadius: 14, boxShadow: '0 4px 24px #ffb30033', background: 'rgba(255,255,255,0.95)', marginBottom: 32 }
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: 17 }
const theadRowStyle = { background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)' }
const tbodyRowStyle = { background: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }
const thStyle = { padding: 18, borderBottom: '2px solid #ffb300', textAlign: 'left', color: '#e65100', fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }
const tdStyle = { padding: 14, borderBottom: '1px solid #ffe0b2', color: '#333' }
const statusActiveStyle = { color: '#43a047', fontWeight: 'bold', textShadow: '0 0 8px #b9f6ca' }
const statusInactiveStyle = { color: '#e53935', fontWeight: 'bold', textShadow: '0 0 8px #ffcdd2' }
const formHeaderStyle = { fontSize: 22, color: '#ff9800', marginBottom: 18, marginTop: 0, fontWeight: 700, textShadow: '0 2px 8px #fff7' }
const formContainerStyle = { display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }
const inputStyle = { padding: 12, borderRadius: 10, border: 'none', outline: 'none', background: 'rgba(255,255,255,0.9)', fontSize: 16, color: 'black', boxShadow: '0 2px 8px #ffb30033', minWidth: 140 }
const btnAdd = { background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #ffd20055', transition: 'background 0.2s' }
const btnSave = { ...btnAdd, background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#222' }
const btnEdit = { ...btnAdd, background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)', color: '#222', marginRight: 8 }
const btnDelete = { ...btnAdd, background: 'linear-gradient(90deg, #f857a6 0%, #ff5858 100%)' }
const btnCancel = { ...btnAdd, background: 'linear-gradient(90deg, #bdbdbd 0%, #e0e0e0 100%)', color: '#222' }