import AppHeader from './components/layouts/header/Header';
import AppFooter from './components/layouts/footer/Footer';
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layouts/Layout';
import AdminLayout from './components/layouts/admin/AdminLayout';
import { HomePage } from './pages/HomePage';
import Products from './pages/products/Products';
import Cart from './pages/cart/Cart';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Payment from './pages/payment/Payment';
import UserDashboard from './pages/user/UserDashboard';
import ProductDetail from './pages/products/ProductDetail';
import Success from './pages/paymentStatus/Success';
import Cancel from './pages/paymentStatus/Cancel';
import OrderList from './pages/user/order/OrderList';
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import AdminProducts from './pages/admin/productsManagement/ProductsManagement';
import AdminUsers from './pages/admin/usersManagement/UsersManagement';
import AdminOrders from './pages/admin/ordersManagement/OrderManagement';

import { AdminRoute, NotAdminRoute, CustomerRoute } from './components/auth/ProtectedRoute';
import Blog from './pages/info/Blog';
import Policy from './pages/info/Policy';
import ImageGenerate from './pages/custom/imageGenerate';
import CustomDesign from './pages/custom/CustomDesign';
import AdminDesigns from './pages/admin/designManagement/designManagement';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <NotAdminRoute>
        <AppLayout />
      </NotAdminRoute>
    ),
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
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/imageGenerate',
        element: (
          <CustomerRoute>
            <ImageGenerate />
          </CustomerRoute>
        ),
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
        element: <UserDashboard />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/cancel',
        element: <Cancel />,
      },
      {
        path: '/orders',
        element: <OrderList />,
      },
      {
        path: '/info/blogs',
        element: <Blog />,
      },
      {
        path: '/info/faq',
        element: <Policy />,
      },
      {
        path: '/custom-design',
        element: (
          <CustomerRoute>
            <CustomDesign />
          </CustomerRoute>
        ),
      }
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'designs',
        element: <AdminDesigns />,
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
    ],
  },
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
