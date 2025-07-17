import { useAuth } from '../../../contexts/AuthContext';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function AdminDashboard() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 24,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      padding: 40,
      minHeight: 600,
      maxWidth: 600,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#1d3557',
        marginBottom: 24,
        fontWeight: 900,
        fontSize: 32,
        letterSpacing: 1,
        textAlign: 'center'
      }}>Thông tin Admin</h1>
      <Avatar size={100} icon={<UserOutlined />} style={{ background: '#e3e9f7', color: '#000', marginBottom: 18 }} />
      <div style={{ fontWeight: 700, fontSize: 24, color: '#1d3557', marginBottom: 8 }}>{user.name || user.fullname || 'Admin'}</div>
      <div style={{ color: '#666', fontSize: 16, marginBottom: 4 }}>{user.email}</div>
      <div style={{ color: '#666', fontSize: 16, marginBottom: 4 }}>Số điện thoại: {user.phone || user.phonenumber || 'Chưa cập nhật'}</div>
      <div style={{ color: '#666', fontSize: 16, marginBottom: 4 }}>Vai trò: <span style={{ fontWeight: 600 }}>{user.role || 'Admin'}</span></div>
    </div>
  )
}
