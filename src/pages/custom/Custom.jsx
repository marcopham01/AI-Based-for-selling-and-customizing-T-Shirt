import React, { useState } from 'react';
import { generateImage } from '../../api/chatApi';
import { message, Input, Button, Spin, Card, Row, Col } from 'antd';
import { SendOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './Custom.module.css';

const { TextArea } = Input;

const Custom = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      message.warning('Vui lòng nhập mô tả thiết kế!');
      return;
    }

    setLoading(true);
    try {
      const response = await generateImage(prompt);
      
      // Tạo blob URL từ response data (image buffer)
      const blob = new Blob([response], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
      
      message.success('Tạo thiết kế thành công!');
    } catch (error) {
      console.error('Error generating image:', error);
      message.error('Có lỗi xảy ra khi tạo thiết kế. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'custom-design.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success('Đã tải xuống thiết kế!');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className={styles.backButton}
        >
          Quay lại
        </Button>
        <h1 className={styles.title}>Tự Thiết Kế Áo</h1>
      </div>

      <div className={styles.content}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Mô tả thiết kế" className={styles.inputCard}>
              <TextArea
                rows={6}
                placeholder="Mô tả chi tiết thiết kế bạn muốn tạo (ví dụ: 'Một con mèo dễ thương màu cam với hoa văn Nhật Bản')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={styles.textArea}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleGenerate}
                loading={loading}
                size="large"
                className={styles.generateButton}
                block
              >
                {loading ? 'Đang tạo...' : 'Tạo Thiết Kế'}
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Kết quả thiết kế" className={styles.resultCard}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Spin size="large" />
                  <p>Đang tạo thiết kế...</p>
                </div>
              ) : generatedImage ? (
                <div className={styles.imageContainer}>
                  <img 
                    src={generatedImage} 
                    alt="Generated design" 
                    className={styles.generatedImage}
                  />
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleDownload}
                    className={styles.downloadButton}
                    block
                  >
                    Tải Xuống
                  </Button>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Nhập mô tả và nhấn "Tạo Thiết Kế" để bắt đầu</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Custom;
