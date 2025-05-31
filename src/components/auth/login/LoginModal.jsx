import { Button, Input, Modal } from 'antd'
import React from 'react'
import styles from './LoginModal.module.css'

export const LoginModal = ({ visible, onClose, onSwitchToRegister }) => {

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
                  <Input type='text' placeholder='Username' className={styles.inputField} />
                  <Input.Password placeholder='Password' className={styles.inputField} />  
                  <Button type='primary' className={styles.loginButton} onClick={onClose}>
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
