import AppHeader from './components/layouts/header/Header';
import AppFooter from './components/layouts/footer/Footer';
import { createBrowserRouter, Outlet, Route, RouterProvider } from 'react-router-dom';

import './App.css'; 
import AppLayout from './components/layouts/Layout';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
