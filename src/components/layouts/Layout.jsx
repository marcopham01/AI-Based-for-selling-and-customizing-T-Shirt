// src/layouts/MainLayout.jsx
import AppHeader from './header/Header';
import AppFooter from './footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'; // Assuming you have a CSS module for styles
import SlidingText from './header/SlidingText';

const MainLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      <SlidingText />
      <main className={styles.mainContent}>
        <Outlet /> {/* chỗ render page */}
      </main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
