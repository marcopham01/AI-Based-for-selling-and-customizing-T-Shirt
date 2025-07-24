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
          {/* Nút chỉnh sửa chỉ hiện khi không ở chế độ chỉnh sửa */}
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
              {/* Hàng 1: Fullname */}
              <div className={styles.row} style={{gridColumn: '1 / span 2', alignItems: 'start', minHeight: 60}}>
                {isEditing ? (
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    style={{ width: '100%' }}
                  >
                    <Input placeholder="Nhập họ và tên" style={{ fontSize: 22, fontWeight: 700, height: 48 }} />
                  </Form.Item>
                ) : (
                  <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
                    {user.name}
                  </div>
                )}
              </div>
              {/* Hàng 2: Email | SĐT */}
              <div className={styles.row}>
                {isEditing ? (
                  <Form.Item
                    label={<span style={{ fontWeight: 600 }}>Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                    style={{ width: '100%' }}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>
                ) : (
                  <div>
                    <span style={{ fontWeight: 600 }}>Email: </span>
                    <span style={{ fontWeight: 400 }}>{user.email}</span>
                  </div>
                )}
              </div>
              <div className={styles.row}>
                {isEditing ? (
                  <Form.Item
                    label={<span style={{ fontWeight: 600 }}>Số điện thoại</span>}
                    name="phone"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại!' },
                      { pattern: /^0\d{9,10}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                    style={{ width: '100%' }}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                ) : (
                  <div>
                    <span style={{ fontWeight: 600 }}>Số điện thoại: </span>
                    <span style={{ fontWeight: 400 }}>{user.phone}</span>
                  </div>
                )}
              </div>
              {/* Hàng 3: Địa chỉ */}
              <div className={styles.row} style={{gridColumn: '1 / span 2'}}>
                {isEditing ? (
                  <Form.Item
                    label={<span style={{ fontWeight: 600 }}>Địa chỉ</span>}
                    name="address"
                    style={{ width: '100%' }}
                  >
                    <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
                  </Form.Item>
                ) : (
                  <div>
                    <span style={{ fontWeight: 600 }}>Địa chỉ: </span>
                    <span style={{ fontWeight: 400 }}>{user.address}</span>
                  </div>
                )}
              </div>
            </div>
            {isEditing && (
              <Form.Item>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  className={styles.saveButton}
                  loading={loading}
                  style={{ marginRight: 12 }}
                >
                  Lưu
                </Button>
                <Button
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Hủy
                </Button>
              </Form.Item>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
