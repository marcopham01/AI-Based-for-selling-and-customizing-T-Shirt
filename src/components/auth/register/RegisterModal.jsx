import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import styles from './RegisterModal.module.css';
import { registerUser } from '../../../api/authApi';

export const RegisterModal = ({ visible, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phonenumber: '',
    email: '',
    fullname: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Gửi đúng các trường cho BE
      const { username, password, phonenumber, email, fullname } = form;
      const response = await registerUser({ username, password, phonenumber, email, fullname });
      console.log('Registration successful:', response.data);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <Modal
        className={styles.registerModal}
        open={visible}
        onCancel={onClose}
        footer={null}
        centered
      >
        <h2 className={styles.registerTitle}>Register</h2>
        <div className={styles.registerForm}>
          <Input
            name="username"
            placeholder="Username"
            className={styles.inputField}
            value={form.username}
            onChange={handleChange}
            required
          />
          <Input.Password
            name="password"
            placeholder="Password"
            className={styles.inputField}
            value={form.password}
            onChange={handleChange}
            required
          />
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.inputField}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <Input
            name="phonenumber"
            placeholder="Phone Number"
            className={styles.inputField}
            value={form.phonenumber}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="fullname"
            placeholder="Full Name"
            className={styles.inputField}
            value={form.fullname}
            onChange={handleChange}
            required
          />
          <Button type='primary' className={styles.registerButton} onClick={handleRegister}>
            Register
          </Button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          <p className={styles.loginText}>
            Already have an account?
            <span className={styles.loginLink} onClick={onSwitchToLogin}>
              {' '}Login
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
};
