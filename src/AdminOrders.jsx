import { useState } from 'react'

const initialOrders = [
  {
    id: 1001,
    customer: 'Nguyễn Văn A',
    email: 'vana@email.com',
    items: [
      { name: 'T-Shirt Basic', qty: 2, price: 150000 },
      { name: 'Hoodie', qty: 1, price: 350000 }
    ],
    total: 650000,
    status: 'pending'
  },
  {
    id: 1002,
    customer: 'Trần Thị B',
    email: 'thib@email.com',
    items: [
      { name: 'T-Shirt Premium', qty: 1, price: 250000 }
    ],
    total: 250000,
    status: 'completed'
  }
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toString().includes(search)
  )

  const handleStatus = (id, status) => {
    setOrders(orders.map(o =>
      o.id === id ? { ...o, status } : o
    ))
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      borderRadius: 18,
      boxShadow: '0 8px 32px 0 rgba(67, 233, 123, 0.18)',
      padding: 50,
      margin: '0 auto',
      maxWidth: 1000,
      minHeight: 600,
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.18)'
    }}>
      <h2 style={{
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: '#00796b',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>🛒 Quản lý đơn hàng 🛒</h2>
      <div style={{
        marginBottom: 32,
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm theo tên, email hoặc mã đơn hàng"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: 14,
            borderRadius: 12,
            border: 'none',
            outline: 'none',
            width: 350,
            background: 'rgba(255,255,255,0.7)',
            fontSize: 16,
            color: 'black',
            boxShadow: '0 2px 8px #43e97b55'
          }}
        />
      </div>
      <div style={{
        overflowX: 'auto',
        borderRadius: 14,
        boxShadow: '0 4px 24px #43e97b33',
        background: 'rgba(255,255,255,0.85)',
        marginBottom: 32
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 17,
        }}>
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
                <td colSpan={7} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#43e97b',
                  fontStyle: 'italic'
                }}>Không có đơn hàng nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(o => (
              <tr key={o.id} style={{
                background: 'rgba(255,255,255,0.7)',
                transition: 'background 0.2s'
              }}>
                <td style={tdStyle}>#{o.id}</td>
                <td style={tdStyle}>{o.customer}</td>
                <td style={tdStyle}>{o.email}</td>
                <td style={tdStyle}>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {o.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} <span style={{ color: '#888' }}>x{item.qty}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>{o.total.toLocaleString()}₫</td>
                <td style={tdStyle}>
                  <span style={{
                    color: o.status === 'completed' ? '#43a047' : '#ff9800',
                    fontWeight: 'bold',
                    textShadow: o.status === 'completed'
                      ? '0 0 8px #b9f6ca'
                      : '0 0 8px #ffe082'
                  }}>
                    {o.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {o.status === 'pending' && (
                    <button
                      style={btnSave}
                      onClick={() => handleStatus(o.id, 'completed')}
                    >Xác nhận</button>
                  )}
                  {o.status === 'completed' && (
                    <span style={{
                      color: '#43a047',
                      fontWeight: 'bold'
                    }}>✔</span>
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

const thStyle = {
  padding: 18,
  borderBottom: '2px solid #43e97b',
  textAlign: 'left',
  color: '#00796b',
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 0.5
}
const tdStyle = {
  padding: 14,
  borderBottom: '1px solid #b2dfdb',
  color: '#333'
}
const btnSave = {
  background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)',
  color: '#222',
  border: 'none',
  borderRadius: 10,
  padding: '10px 20px',
  fontWeight: 'bold',
  fontSize: 15,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #ffd20055',
  transition: 'background 0.2s'
}