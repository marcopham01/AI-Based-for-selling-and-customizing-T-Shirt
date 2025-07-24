import { Button, Input, Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginModal.module.css'
import { loginUser } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../contexts/AuthContext';

export const LoginModal = ({ visible, onClose, onSwitchToRegister }) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ username, password });
      const token = response.data.accessToken;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Gọi login để context tự lấy profile
      await login();
      
      toast.success(`Chào mừng trở lại, ${username}!`);
      onClose();
      
      // Redirect dựa trên role
      if (isAdmin()) {
        navigate('/admin');
      } else {
        navigate('/');
        
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  }

  return (
      <div>
          <Modal
              className={styles.loginModal}
              open={visible}
              onCancel={onClose}
              footer={null}
              centered
          >
              <h2 className={styles.loginTitle}>Đăng nhập</h2>
              <div className={styles.loginForm}>
            <Input
              type='text'
              placeholder='Tên đăng nhập'
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onPressEnter={handleLogin}
            />
            <Input.Password
              placeholder='Mật khẩu'
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleLogin}
            />  
                  <Button 
                    type='primary' 
                    className={styles.loginButton} 
                    onClick={handleLogin}
                    loading={loading}
                  >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                  <p className={styles.registerText}>Chưa có tài khoản?
                    <span className={styles.registerLink} onClick={onSwitchToRegister}>
                        {' '}Đăng ký
                    </span>
                  </p>
              </div>
          </Modal>
    </div>
  )
}
