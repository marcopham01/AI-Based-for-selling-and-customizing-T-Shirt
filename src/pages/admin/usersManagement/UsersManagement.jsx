import { useState } from 'react'

const initialUsers = [
  { id: 1, username: 'admin', email: 'admin@email.com', role: 'admin', status: 'active' },
  { id: 2, username: 'user1', email: 'user1@email.com', role: 'user', status: 'active' },
  { id: 3, username: 'user2', email: 'user2@email.com', role: 'user', status: 'inactive' },
]

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ username: '', email: '', role: 'user', status: 'active' })
  const [editingId, setEditingId] = useState(null)

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (!form.username || !form.email) return
    setUsers([
      ...users,
      {
        id: Date.now(),
        username: form.username,
        email: form.email,
        role: form.role,
        status: form.status
      }
    ])
    setForm({ username: '', email: '', role: 'user', status: 'active' })
  }

  const handleEdit = (u) => {
    setEditingId(u.id)
    setForm({
      username: u.username,
      email: u.email,
      role: u.role,
      status: u.status
    })
  }

  const handleUpdate = () => {
    setUsers(users.map(u =>
      u.id === editingId
        ? { ...u, ...form }
        : u
    ))
    setEditingId(null)
    setForm({ username: '', email: '', role: 'user', status: 'active' })
  }

  const handleDelete = id => {
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(u => u.id !== id))
    }
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
        color: '#d84315',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>🌟 Quản lý người dùng 🌟</h2>
      <div style={{
        marginBottom: 32,
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên hoặc email"
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
            boxShadow: '0 2px 8px #ffb30055'
          }}
        />
      </div>
      <div style={{
        overflowX: 'auto',
        borderRadius: 14,
        boxShadow: '0 4px 24px #ffb30033',
        background: 'rgba(255,255,255,0.85)',
        marginBottom: 32
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 17,
        }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)' }}>
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
                <td colSpan={5} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#ffb300',
                  fontStyle: 'italic'
                }}>Không có người dùng nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(u => (
              <tr key={u.id} style={{
                background: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s'
              }}>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.role === 'admin' ? 'Admin' : 'User'}</td>
                <td style={tdStyle}>
                  <span style={{
                    color: u.status === 'active' ? '#43a047' : '#e53935',
                    fontWeight: 'bold',
                    textShadow: u.status === 'active' ? '0 0 8px #b9f6ca' : '0 0 8px #ffcdd2'
                  }}>
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
      <h3 style={{
        fontSize: 22,
        color: '#ff9800',
        marginBottom: 18,
        marginTop: 0,
        fontWeight: 700,
        textShadow: '0 2px 8px #fff7'
      }}>
        {editingId ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
      </h3>
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 12,
        flexWrap: 'wrap'
      }}>
        <input
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="active">Hoạt động</option>
          <option value="inactive">Khóa</option>
        </select>
        {editingId ? (
          <button style={btnSave} onClick={handleUpdate}>💾 Lưu</button>
        ) : (
          <button style={btnAdd} onClick={handleAdd}>➕ Thêm</button>
        )}
        {editingId && (
          <button style={btnCancel} onClick={() => {
            setEditingId(null)
            setForm({ username: '', email: '', role: 'user', status: 'active' })
          }}>Hủy</button>
        )}
      </div>
    </div>
  )
}

const thStyle = {
  padding: 18,
  borderBottom: '2px solid #ffb300',
  textAlign: 'left',
  color: '#e65100',
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 0.5
}
const tdStyle = {
  padding: 14,
  borderBottom: '1px solid #ffe0b2',
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
  boxShadow: '0 2px 8px #ffb30033',
  minWidth: 140
}
const btnAdd = {
  background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '12px 24px',
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #ffd20055',
  transition: 'background 0.2s'
}
const btnSave = {
  ...btnAdd,
  background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
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
