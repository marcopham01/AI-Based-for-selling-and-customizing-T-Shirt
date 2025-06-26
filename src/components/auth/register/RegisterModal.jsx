import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import styles from './RegisterModal.module.css';
import { registerUser } from '../../../api/authApi';

export const RegisterModal = ({ visible, onClose, onSwitchToLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await registerUser({ username, password });
      console.log('Registration successful:', response.data);
      onClose();
    } catch (error) {
      console.log({ error: error.message });
    }
  }
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
          <Input type='text' placeholder='Username' className={styles.inputField} />
          <Input.Password placeholder='Password' className={styles.inputField} />
          <Input.Password placeholder='Confirm Password' className={styles.inputField} />
          <Button type='primary' className={styles.registerButton} onClick={handleRegister}>
            Register
          </Button>
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
