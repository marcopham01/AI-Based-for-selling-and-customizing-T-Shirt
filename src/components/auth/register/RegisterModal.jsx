import { Button, Input, Modal } from 'antd';
import React from 'react';
import styles from './RegisterModal.module.css';

export const RegisterModal = ({ visible, onClose, onSwitchToLogin }) => {
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
          <Button type='primary' className={styles.registerButton} onClick={onClose}>
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
