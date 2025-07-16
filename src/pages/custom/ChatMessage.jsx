import React from 'react';
import styles from './ImageGenerate.module.css';
import { RobotOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ChatMessage = ({ role, content, image, onDownload }) => {
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/custom-design', { state: { image } });
  };

  return (
    <div className={role === 'user' ? styles.chatMessageUser : styles.chatMessageAI}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        {role !== 'user' && (
          <div style={{ alignSelf: 'flex-end' }}>
            <RobotOutlined style={{ fontSize: 22, color: '#fff', background: '#1976d2', borderRadius: '50%', padding: 4 }} />
          </div>
        )}
        <div className={styles.chatBubble} style={{ boxShadow: '0 2px 8px #e3eafc' }}>
          {content && <div className={styles.chatText}>{content}</div>}
          {image && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <img src={image} alt="AI design" className={styles.chatImage} style={{ boxShadow: '0 2px 8px #e3eafc' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  icon={<DownloadOutlined />}
                  size="small"
                  style={{ marginTop: 2, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6 }}
                  onClick={onDownload}
                >
                  Tải ảnh
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ marginTop: 2, background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6 }}
                  onClick={handleCreateProduct}
                >
                  Tạo sản phẩm với ảnh này
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 