// Dashboard Overview
function DashboardOverview() {
  return (
    <div style={{
      display: 'flex',
      gap: 250,
      marginBottom: 32,
      flexWrap: 'wrap'
    }}>
      <div style={overviewCard('#a18cd1', '#fbc2eb', '#4f2e91')}>
        <h3 style={overviewTitle}>Sản phẩm</h3>
        <div style={overviewNumber}>12</div>
      </div>
      <div style={overviewCard('#f7971e', '#ffd200', '#d84315')}>
        <h3 style={overviewTitle}>Người dùng</h3>
        <div style={overviewNumber}>5</div>
      </div>
      <div style={overviewCard('#43e97b', '#38f9d7', '#00796b')}>
        <h3 style={overviewTitle}>Đơn hàng</h3>
        <div style={overviewNumber}>3</div>
      </div>
    </div>
  )
}

const overviewCard = (from, to, color) => ({
  background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
  borderRadius: 18,
  boxShadow: '0 4px 24px #b39ddb33',
  padding: 32,
  minWidth: 180,
  flex: 1,
  color,
  textAlign: 'center'
})
const overviewTitle = {
  margin: 0,
  color: '#fff',
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 1,
  textShadow: '0 2px 8px #fff7'
}
const overviewNumber = {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '0 2px 12px #fff8'
}

export default function AdminDashboard() {
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
      <h1 style={{
        color: '#4f2e91',
        marginBottom: 16,
        fontWeight: 900,
        fontSize: 36,
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>Chào mừng đến trang quản trị</h1>
      <DashboardOverview />
      <p style={{ color: '#666', fontSize: 18 }}>
        Sử dụng menu bên trái để quản lý sản phẩm, người dùng và đơn hàng.
      </p>
    </div>
  )
}
