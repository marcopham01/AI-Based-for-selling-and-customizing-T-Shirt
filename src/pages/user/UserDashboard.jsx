import React, { useState } from 'react';
import Profile from './profile/Profile';
import OrderList from './order/OrderList';
import MyDesign from './design/MyDesign';
import styles from './UserDashboard.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const TABS = [
  { key: 'profile', label: 'Thông Tin Cá Nhân' },
  { key: 'orders', label: 'Đơn Hàng Của Tôi' },
  { key: 'designs', label: 'Thiết Kế Của Tôi' },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Đăng xuất thành công")
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <OrderList />;
      case 'designs':
        return <MyDesign />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
        <button
          className={styles.logoutButtonSidebar}
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </aside>
      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
} 