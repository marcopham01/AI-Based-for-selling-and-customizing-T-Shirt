import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Form, Input, message, Divider } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined, SaveOutlined, ShoppingOutlined } from '@ant-design/icons';
import styles from './Profile.module.css';
import { useAuth } from '../../../contexts/AuthContext';

const Profile = () => {
  const { user, isLoading, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated, only after loading
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);
  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  const handleSave = async (values) => {
    setLoading(true);
    try {
      await updateUser(values);
      message.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error) {
      message.error('Cập nhật thất bại!');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <div className={styles.profileBg}>
      <div className={styles.profileHeader}>
        <h1>Hồ sơ cá nhân</h1>
      </div>
      <div className={styles.profileFlexGrid}>
        {/* 1/3 trái: Avatar + Đăng xuất */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <Avatar 
              size={140} 
              icon={<UserOutlined />} 
              className={styles.avatar}
            />
          </div>
          {/* Nút lưu/hủy khi edit */}
              {isEditing && (
                <div className={styles.editActionsVertical} style={{gridColumn: '1 / span 2'}}>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                    className={styles.saveButton}
                    loading={loading}
                  >
                    Lưu
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    Hủy
                  </Button>
                </div>
              )}
              {/* Nút chỉnh sửa khi không ở chế độ chỉnh sửa */}
              {!isEditing && (
                <div className={styles.editActionsVertical} style={{gridColumn: '1 / span 2'}}>
                  <Button
                    className={styles.editButtonOutline}
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              )}
        </div>
        {/* 2/3 phải: Thông tin chia 2 cột */}
        <div className={styles.infoSection}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: user.name || '',
              email: user.email || '',
              phone: user.phone || '',
              address: user.address || ''
            }}
            onFinish={handleSave}
          >
            <div className={styles.infoGrid}>
              {/* Hàng 1: Tên */}
              <div className={styles.row} style={{gridColumn: '1 / span 2'}}>
                <div className={styles.nameField}>{user.name}</div>
              </div>
              {/* Hàng 2: Email | SĐT */}
              <div className={styles.row}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Nhập email" disabled={!isEditing} />
                </Form.Item>
              </div>
              <div className={styles.row}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                >
                  <Input placeholder="Nhập số điện thoại" disabled={!isEditing} />
                </Form.Item>
              </div>
              {/* Hàng 3: Địa chỉ */}
              <div className={styles.row} style={{gridColumn: '1 / span 2'}}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                >
                  <Input.TextArea rows={2} disabled={!isEditing} />
                </Form.Item>
              </div>
              
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
