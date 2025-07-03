import { Button, Input, Modal } from 'antd'
import React from 'react'
import styles from './LoginModal.module.css'
import { loginUser } from '../../../api/authApi';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../contexts/AuthContext';

export const LoginModal = ({ visible, onClose, onSwitchToRegister }) => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.accessToken;
      // Save token to localStorage
      localStorage.setItem('token', token);
      // Gọi login để context tự lấy profile
      login({ token });
      toast.success(`Welcome back, ${username}!`);
      onClose();
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed. Please try again.');
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
              <h2 className={styles.loginTitle}>Login</h2>
              <div className={styles.loginForm}>
            <Input
              type='text'
              placeholder='Username'
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input.Password
              placeholder='Password'
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />  
                  <Button type='primary' className={styles.loginButton} onClick={handleLogin}>
                    Login
                  </Button>
                  <p className={styles.registerText}>Don't have an account?
                    <span className={styles.registerLink} onClick={onSwitchToRegister}>
                        {' '}Register
                    </span>
                  </p>
              </div>
          </Modal>
    </div>
  )
}
