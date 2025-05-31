import { Dropdown, Layout, Menu } from 'antd'
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';
import { Space, Badge } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ShoppingCart } from 'lucide-react';
const { Header } = Layout;

const AppHeader = () => {
    const categoriesMenu = {
        items: [
            {
                key: '1',
                label: <Link to="/categories/male">Male</Link>,
            },
            {
                key: '2',
                label: <Link to="/categories/female">Female</Link>,
            },
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
  return (
      <div>
          <Header className={styles.header} >
              <div className={styles.logo}>
                    <Link to="/">
                        <img src="/meomeo.jpg" alt="AI T-Shirt Shop Logo" className={styles.logoImage} />
                    </Link>
              </div>
              <div className={styles.menu}>
                  <a href="">Product</a>
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
                    <UserOutlined style={{ color: '#fff', fontSize: 18 }} />
                    <Badge count={0} size="small" offset={[0, 5]}>
                        <ShoppingCartOutlined style={{ color: '#fff', fontSize: 18 }} />
                    </Badge>
                </Space>
              </div>
          </Header>
    </div>
  )
}
export default AppHeader;