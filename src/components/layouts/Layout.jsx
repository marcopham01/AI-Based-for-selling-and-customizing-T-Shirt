// src/layouts/MainLayout.jsx
import AppHeader from './header/Header';
import AppFooter from './footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'; // Assuming you have a CSS module for styles

const MainLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      <main className={styles.mainContent}>
        <Outlet /> {/* chỗ render page */}
      </main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
