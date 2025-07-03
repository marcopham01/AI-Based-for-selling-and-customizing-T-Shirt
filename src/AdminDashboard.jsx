import { useState } from 'react'
import AdminProducts from './AdminProducts'
import AdminUsers from './AdminUsers'
import AdminOrders from './AdminOrders'

function Sidebar({ tab, setTab }) {
  return (
    <div style={{
      width: 300,
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      color: '#4f2e91',
      minHeight: '100vh',
      padding: 24,
      boxSizing: 'border-box',
      borderTopRightRadius: 32,
      borderBottomRightRadius: 32,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
    }}>
      <h2 style={{
        color: '#4f2e91',
        marginBottom: 32,
        fontWeight: 900,
        letterSpacing: 2,
        textShadow: '0 2px 12px #fff8'
      }}>TRANG QUẢN TRỊ</h2>
      <div>
        <SidebarButton
          active={tab === 'dashboard'}
          onClick={() => setTab('dashboard')}
          icon="🏠"
        >Dashboard</SidebarButton>
        <SidebarButton
          active={tab === 'products'}
          onClick={() => setTab('products')}
          icon="👕"
        >Quản lý sản phẩm</SidebarButton>
        <SidebarButton
          active={tab === 'users'}
          onClick={() => setTab('users')}
          icon="👤"
        >Quản lý người dùng</SidebarButton>
        <SidebarButton
          active={tab === 'orders'}
          onClick={() => setTab('orders')}
          icon="🛒"
        >Quản lý đơn hàng</SidebarButton>
      </div>
    </div>
  )
}

function SidebarButton({ active, onClick, icon, children }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '14px 0',
        marginBottom: 14,
        background: active
          ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
          : 'transparent',
        color: active ? '#222' : '#4f2e91',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
        boxShadow: active ? '0 2px 8px #43e97b55' : undefined,
        transition: 'background 0.2s'
      }}
      onClick={onClick}
    >
      <span style={{ marginRight: 10 }}>{icon}</span>
      {children}
    </button>
  )
}

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
  const [tab, setTab] = useState('dashboard')

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }}>
      <Sidebar tab={tab} setTab={setTab} />
      <main style={{
        flex: 1,
        padding: 40,
        background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 24,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: 40,
          minHeight: 600,
          maxWidth: 1100,
          margin: '0 auto'
        }}>
          {tab === 'dashboard' && (
            <>
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
            </>
          )}
          {tab === 'products' && <AdminProducts />}
          {tab === 'users' && <AdminUsers />}
          {tab === 'orders' && <AdminOrders />}
        </div>
      </main>
    </div>
  )
}