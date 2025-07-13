import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { useAuth } from '../../../contexts/AuthContext';

function AdminSidebar() {
  const location = window.location.pathname;
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.adminSidebar}>
      <h2 className={styles.adminSidebarTitle}>TRANG QUẢN TRỊ</h2>
      <div className={styles.adminSidebarMenu}>
        <AdminNavLink to="/admin" active={location === '/admin'}>
          🏠 Dashboard
        </AdminNavLink>
        <AdminNavLink to="/admin/products" active={location === '/admin/products'}>
          👕 Quản lý sản phẩm
        </AdminNavLink>
        <AdminNavLink to="/admin/users" active={location === '/admin/users'}>
          👤 Quản lý người dùng
        </AdminNavLink>
        <AdminNavLink to="/admin/orders" active={location === '/admin/orders'}>
          🛒 Quản lý đơn hàng
        </AdminNavLink>
      </div>
      <div className={styles.adminSidebarLogout}>
        <button
          onClick={() => { logout(); navigate('/'); }}
          style={{
            background: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%)',
            color: '#d84315',
            border: 'none',
            borderRadius: 10,
            padding: '12px 32px',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #ffb30033',
            transition: 'all 0.2s',
          }}
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