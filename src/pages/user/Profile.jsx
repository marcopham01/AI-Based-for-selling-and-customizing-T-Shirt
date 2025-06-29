import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Form, Input, message, Divider } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined, SaveOutlined } from '@ant-design/icons';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, isLoading, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Redirect if not authenticated, only after loading
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);
  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    message.success('Đăng xuất thành công!');
    navigate('/');
  };

  const handleSave = (values) => {
    // Cập nhật user trong context và localStorage
    const updatedUser = { ...user, ...values };
    updateUser(updatedUser);
    message.success('Cập nhật thông tin thành công!');
    setIsEditing(false);
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
      <div className={styles.profileFlexContent}>
        <div className={styles.avatarCol}>
          <Avatar 
            size={120} 
            icon={<UserOutlined />} 
            className={styles.avatar}
          />
          <Button
            className={styles.editButtonOutline}
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
            style={{ marginTop: 24 }}
            disabled={isEditing}
          >
            Chỉnh sửa
          </Button>
        </div>
        <div className={styles.infoCol}>
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
            <div className={styles.infoFields}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" disabled={!isEditing} />
              </Form.Item>
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
              <Form.Item
                label="Số điện thoại"
                name="phone"
              >
                <Input placeholder="Nhập số điện thoại" disabled={!isEditing} />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
              >
                <Input.TextArea rows={2} placeholder="Nhập địa chỉ" disabled={!isEditing} />
              </Form.Item>
            </div>
            {isEditing && (
              <div className={styles.editActionsVertical}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                  className={styles.saveButton}
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
          </Form>
        </div>
        <Button
          className={styles.logoutButtonOutline}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default Profile;
