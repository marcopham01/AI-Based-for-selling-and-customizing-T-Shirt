// src/layouts/MainLayout.jsx
import AppHeader from './header/Header';
import AppFooter from './footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import SlidingText from './header/SlidingText';

const MainLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <AppHeader />
      <SlidingText />
      <main className={styles.mainContent}>
        <Outlet /> 
      </main>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
