import AppHeader from './components/layouts/header/Header';
import AppFooter from './components/layouts/footer/Footer';
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';

import './App.css';
import AppLayout from './components/layouts/Layout';
import { HomePage } from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';


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
        path: 'product/:id',
        element: <ProductDetail />,
      },
    ],
  }
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
