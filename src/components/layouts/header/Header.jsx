import { Dropdown, Layout, Menu } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';
import { Space, Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from '../../auth/login/LoginModal';
import { RegisterModal } from '../../auth/register/RegisterModal';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';

const { Header } = Layout;

const AppHeader = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const navigate = useNavigate();
    const { items, getCartCount } = useCart();
    const { isAuthenticated } = useAuth();
    
    const categoriesMenu = {
        items: [
            {
                key: '1',
                label: <Link to="/categories/tshirt">T-Shirt</Link>,
            },
            {
                key: '2',
                label: <Link to="/categories/hoodie">Hoodie</Link>,
            },
            {
                key: '3',
                label: <Link to="/categories/sweater">Sweater</Link>,
            }
        ],
    };
    
    const infoMenu = {
        items: [
            {
                key: '1',
                label: <Link to="/info/blogs">Blogs</Link>,
            },
            {
                key: '2',
                label: <Link to="/info/faq">FAQ</Link>,
            },
        ],
    };

    const handleUserIconClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            setLoginVisible(true);
        }
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            setLoginVisible(true);
        }
    };
    
  return (
      <div>
          <Header className={styles.header} >
              <div className={styles.logo}>
                    <Link to="/">
                        <img src="/meomeo.jpg" alt="AI T-Shirt Shop Logo" className={styles.logoImage} />
                    </Link>
              </div>
              <div className={styles.menu}>
                  <a href="" onClick={() => navigate('/products')}>Product</a>
                <Dropdown menu={categoriesMenu}>
                    <a href="">Categories</a>
                </Dropdown>
                <Dropdown menu={infoMenu}>
                    <a href="">Info</a>
                </Dropdown>
              </div>
              <div className={styles.iconGroup}>
                <Space size="large">
                    <SearchOutlined style={{ color: '#fff', fontSize: 18 }} />
                      <UserOutlined
                          onClick={handleUserIconClick}                     
                          style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}
                      />
                    {isAuthenticated && (
                      <Badge count={getCartCount()} size="small" offset={[0, 5]}>
                        <ShoppingCartOutlined 
                        onClick={handleCartClick} 
                        style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }} />
                      </Badge>
                    )}
                </Space>
              </div>
          </Header>

          <LoginModal
              visible={loginVisible}
              onClose={() => setLoginVisible(false)}
              onSwitchToRegister={() => { setRegisterVisible(true); setLoginVisible(false); }}
          />
          <RegisterModal
              visible={registerVisible}
              onClose={() => setRegisterVisible(false)}
              onSwitchToLogin={() => { setLoginVisible(true); setRegisterVisible(false); }}
          />
    </div>
  )
}
export default AppHeader;