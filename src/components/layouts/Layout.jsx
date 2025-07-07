// src/layouts/MainLayout.jsx
import AppHeader from './header/Header';
import AppFooter from './footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import SlidingText from './header/SlidingText';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      {isHome && <SlidingText />}
      <main
        className={styles.mainContent}
        style={{ paddingTop: isHome ? 100 : 60 }}
      >
        <Outlet /> 
      </main>
      <AppFooter /> 
    </div>
  );
};

export default MainLayout;
