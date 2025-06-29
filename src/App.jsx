import AppHeader from './components/layouts/header/Header';
import AppFooter from './components/layouts/footer/Footer';
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';

import './App.css'; 
import AppLayout from './components/layouts/Layout';
import { HomePage } from './pages/HomePage';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Payment from './pages/payment/Payment';
import Profile from './pages/user/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/profile',
        element: <Profile />,
      }
    ],
  }
]);
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
