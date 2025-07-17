import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import { HomeOutlined, AppstoreOutlined, TeamOutlined, PictureOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

function AdminSidebar() {
  const location = window.location.pathname;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.adminSidebar}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
        <Avatar size={80} icon={<UserOutlined />} style={{ background: '#e3e9f7', color: '#000', marginBottom: 10 }} />
        <div style={{ fontWeight: 700, fontSize: 18, color: '#1d3557', marginBottom: 2 }}>{user?.name || 'Admin'}</div>
        <div style={{ color: '#666', fontSize: 13 }}>{user?.email || ''}</div>
      </div>
      <h2 className={styles.adminSidebarTitle}>Quản trị</h2>
      <div className={styles.adminSidebarMenu}>
        <AdminNavLink to="/admin" active={location === '/admin'}>
          <HomeOutlined style={{ fontSize: 18, marginRight: 10 }} /> Dashboard
        </AdminNavLink>
        <AdminNavLink to="/admin/products" active={location === '/admin/products'}>
          <AppstoreOutlined style={{ fontSize: 18, marginRight: 10 }} /> Sản phẩm
        </AdminNavLink>
        <AdminNavLink to="/admin/users" active={location === '/admin/users'}>
          <TeamOutlined style={{ fontSize: 18, marginRight: 10 }} /> Người dùng
        </AdminNavLink>
        <AdminNavLink to="/admin/designs" active={location === '/admin/designs'}>
          <PictureOutlined style={{ fontSize: 18, marginRight: 10 }} /> Thiết Kế
        </AdminNavLink>
        <AdminNavLink to="/admin/orders" active={location === '/admin/orders'}>
          <FileTextOutlined style={{ fontSize: 18, marginRight: 10 }} /> Thống Kê
        </AdminNavLink>
      </div>
      <div className={styles.adminSidebarLogout}>
        <button
          className="logoutButtonOutline"
          onClick={() => { logout(); navigate('/'); }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

function AdminNavLink({ to, active, children }) {
  return (
    <a
      href={to}
      className={`${styles.adminNavLink} ${active ? styles.active : ''}`}
    >
      {children}
    </a>
  );
}

export default function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </div>
  );
} 