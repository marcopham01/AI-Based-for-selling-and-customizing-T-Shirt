import { useState, useEffect } from 'react'
import { getAllUsers } from '../../../api/adminApi'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load users từ API
  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await getAllUsers()
      setUsers(response.data.data)
    } catch (err) {
      setError('Không thể tải danh sách người dùng')
      console.error('Error loading users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const filtered = users.filter(u =>
    (u.role !== 'admin') && (
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.fullname?.toLowerCase().includes(search.toLowerCase())
    )
  )

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '18px',
        color: '#ff9800'
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
        color: '#d84315',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>🌟 Quản lý người dùng 🌟</h2>
      
      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #ffcdd2'
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
          placeholder="🔍 Tìm kiếm theo tên, email hoặc họ tên"
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
              <th style={thStyle}>Họ tên</th>
              <th style={thStyle}>Số điện thoại</th>
              <th style={thStyle}>Vai trò</th>
              <th style={thStyle}>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#ffb300',
                  fontStyle: 'italic'
                }}>Không có người dùng nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(u => (
              <tr key={u._id} style={{
                background: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s'
              }}>
                <td style={tdStyle}>{u.username}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.fullname}</td>
                <td style={tdStyle}>{u.phonenumber}</td>
                <td style={tdStyle}>
                  <span style={{
                    color: u.role === 'admin' ? '#e65100' : '#4caf50',
                    fontWeight: 'bold',
                    textShadow: u.role === 'admin' ? '0 0 8px #ffcc02' : '0 0 8px #a5d6a7'
                  }}>
                    {u.role === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        Tổng số người dùng: {filtered.length}
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
