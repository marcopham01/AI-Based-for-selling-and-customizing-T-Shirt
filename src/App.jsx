import AppHeader from './components/layouts/header/Header';
import AppFooter from './components/layouts/footer/Footer';
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';

import './App.css'; 
import AppLayout from './components/layouts/Layout';
import { HomePage } from './pages/HomePage';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { CartProvider } from './contexts/CartContext';
import Payment from './pages/payment/Payment';

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
      }
    ],
  }
]);
const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
