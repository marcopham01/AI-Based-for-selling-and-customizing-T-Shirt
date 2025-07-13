import { useState, useEffect } from 'react'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const apiBase = 'https://687321edc75558e273536526.mockapi.io/api/admin_orders'

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const res = await fetch(apiBase)
        if (!res.ok) throw new Error('Lỗi khi tải đơn hàng')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toString().includes(search)
  )

  const handleStatus = async (id, status) => {
    try {
      const order = orders.find(o => o.id === id)
      const res = await fetch(`${apiBase}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, status })
      })
      if (!res.ok) throw new Error('Không thể cập nhật trạng thái')
      const updated = await res.json()
      setOrders(orders.map(o => o.id === id ? updated : o))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p>🔄 Đang tải dữ liệu...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>🛒 Quản lý đơn hàng 🛒</h2>
      <div style={searchBoxStyle}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên, email hoặc mã đơn hàng"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }}>
              <th style={thStyle}>Mã đơn</th>
              <th style={thStyle}>Khách hàng</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Sản phẩm</th>
              <th style={thStyle}>Tổng tiền</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...tdStyle, textAlign: 'center', color: '#43e97b', fontStyle: 'italic' }}>
                  Không có đơn hàng nào phù hợp.
                </td>
              </tr>
            )}
            {filtered.map(o => (
              <tr key={o.id} style={{ background: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }}>
                <td style={tdStyle}>{o.id}</td>
                <td style={tdStyle}>{o.customer}</td>
                <td style={tdStyle}>{o.email}</td>
                <td style={tdStyle}>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {o.items.split(',').map((item, idx) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>{Number(o.total).toLocaleString()}₫</td>
                <td style={tdStyle}>
                  <span style={{
                    color: o.status === 'completed' ? '#43a047' : '#ff9800',
                    fontWeight: 'bold',
                    textShadow: o.status === 'completed' ? '0 0 8px #b9f6ca' : '0 0 8px #ffe082'
                  }}>
                    {o.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {o.status === 'pending' ? (
                    <button style={btnSave} onClick={() => handleStatus(o.id, 'completed')}>Xác nhận</button>
                  ) : (
                    <span style={{ color: '#43a047', fontWeight: 'bold' }}>✔</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const containerStyle = {
  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  borderRadius: 18,
  boxShadow: '0 8px 32px 0 rgba(67, 233, 123, 0.18)',
  padding: 50,
  margin: '0 auto',
  maxWidth: 1000,
  minHeight: 600,
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.18)'
}
const headerStyle = { marginBottom: 32, fontSize: 32, fontWeight: 800, color: '#00796b', letterSpacing: 1, textShadow: '0 2px 12px #fff8' }
const searchBoxStyle = { marginBottom: 32, display: 'flex', gap: 16, alignItems: 'center' }
const searchInputStyle = { padding: 14, borderRadius: 12, border: 'none', outline: 'none', width: 350, background: 'rgba(255,255,255,0.7)', fontSize: 16, color: 'black', boxShadow: '0 2px 8px #43e97b55' }
const tableWrapperStyle = { overflowX: 'auto', borderRadius: 14, boxShadow: '0 4px 24px #43e97b33', background: 'rgba(255,255,255,0.85)', marginBottom: 32 }
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: 17 }
const thStyle = { padding: 18, borderBottom: '2px solid #43e97b', textAlign: 'left', color: '#00796b', fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }
const tdStyle = { padding: 14, borderBottom: '1px solid #b2dfdb', color: '#333' }
const btnSave = { background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #ffd20055', transition: 'background 0.2s' }