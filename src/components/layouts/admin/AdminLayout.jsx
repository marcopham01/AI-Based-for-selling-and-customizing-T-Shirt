import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';

// Admin Sidebar Component
function AdminSidebar() {
  const location = window.location.pathname;
  
  return (
    <div className={styles.adminSidebar}>
      <h2 className={styles.adminSidebarTitle}>TRANG QUẢN TRỊ</h2>
      <div>
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

// Admin Layout Component
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