// src/layouts/MainLayout.jsx
import AppHeader from './header/Header';
import AppFooter from './footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const MainLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/imageGenerate';
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      <main
        className={styles.mainContent}
        style={{ paddingTop: 60 }}
      >
        <Outlet /> 
      </main>
      {!hideFooter && <AppFooter />}
    </div>
  );
};

export default MainLayout;
