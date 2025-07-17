import React, { useState, useEffect } from 'react';
import { generateImage } from '../../api/chatApi';
import { message, Input, Button, Spin, Card, Row, Col } from 'antd';
import { SendOutlined, DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './ImageGenerate.module.css';
import Sidebar from './Sidebar';
import ChatMessage from './ChatMessage';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const LOCAL_KEY = 'ai_tshirt_sessions';

function loadSessions() {
  const data = localStorage.getItem(LOCAL_KEY);
  if (data) return JSON.parse(data);
  // Nếu chưa có, tạo 1 session mặc định
  return [{
    id: uuidv4(),
    name: 'Cuộc chat đầu tiên',
    messages: [
      { role: 'ai', content: 'Xin chào! Hãy mô tả thiết kế áo bạn muốn tạo nhé.', image: null }
    ]
  }];
}

function saveSessions(sessions) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(sessions));
}

const ImageGenerate = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(loadSessions());
  const [currentSessionId, setCurrentSessionId] = useState(loadSessions()[0].id);
  const [input, setInput] = useState('');

  // Lấy messages của session hiện tại
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession ? currentSession.messages : [];

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
      
      // Chuyển blob thành base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setGeneratedImage(base64String);
        message.success('Tạo thiết kế thành công!');
      };
      reader.readAsDataURL(blob);
      
    } catch (error) {
      console.error('Error generating image:', error);
      message.error('Có lỗi xảy ra khi tạo thiết kế. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Tạo mới session
  const handleNewSession = () => {
    const newSession = {
      id: uuidv4(),
      name: 'Cuộc chat mới ' + (sessions.length + 1), // Sẽ cập nhật lại khi user gửi tin nhắn đầu tiên
      messages: [
        { role: 'ai', content: 'Xin chào! Hãy mô tả thiết kế áo bạn muốn tạo nhé. Hãy sử dụng tiếng anh để ảnh được tạo ra chính xác nhất nhé.', image: null }
      ]
    };
    const newSessions = [newSession, ...sessions];
    setSessions(newSessions);
    setCurrentSessionId(newSession.id);
    saveSessions(newSessions);
  };

  // Chọn session
  const handleSelectSession = (id) => {
    setCurrentSessionId(id);
  };

  // Hàm xóa session
  const handleDeleteSession = (sessionId) => {
    if (sessions.length === 1) return; // Không cho xóa hết
    let idx = sessions.findIndex(s => s.id === sessionId);
    let newSessions = sessions.filter(s => s.id !== sessionId);
    // Nếu đang ở session bị xóa, chuyển sang session đầu tiên còn lại
    let newCurrentId = currentSessionId;
    if (currentSessionId === sessionId) {
      newCurrentId = newSessions[0].id;
    }
    setSessions(newSessions);
    setCurrentSessionId(newCurrentId);
    saveSessions(newSessions);
  };

  // Gửi message (thêm message user, loading, gọi API, thêm message AI)
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input, image: null };
    // Nếu là tin nhắn đầu tiên của session, cập nhật tên session thành nội dung tin nhắn
    let updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId && s.messages.length === 1 && s.messages[0].role === 'ai') {
        return { ...s, name: input, messages: [...s.messages, userMsg, { role: 'ai', content: null, image: null, loading: true }] };
      }
      if (s.id === currentSessionId) {
        return { ...s, messages: [...s.messages, userMsg, { role: 'ai', content: null, image: null, loading: true }] };
      }
      return s;
    });
    setSessions(updatedSessions);
    setInput('');
    setLoading(true);
    try {
      const response = await generateImage(input);
      // Tạo blob URL từ response data (image buffer)
      const blob = new Blob([response], { type: 'image/png' });
      
      // Chuyển blob thành base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Thay thế message AI loading bằng message AI thật
        const newSessions = updatedSessions.map(s => {
          if (s.id !== currentSessionId) return s;
          const msgs = [...s.messages];
          // Tìm vị trí message loading cuối cùng
          const idx = msgs.findIndex(m => m.loading);
          if (idx !== -1) {
            msgs[idx] = { role: 'ai', content: 'Đây là thiết kế bạn yêu cầu:', image: base64String };
          }
          return { ...s, messages: msgs };
        });
        setSessions(newSessions);
        saveSessions(newSessions);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      // Thay thế message AI loading bằng message AI báo lỗi
      const newSessions = updatedSessions.map(s => {
        if (s.id !== currentSessionId) return s;
        const msgs = [...s.messages];
        const idx = msgs.findIndex(m => m.loading);
        if (idx !== -1) {
          msgs[idx] = { role: 'ai', content: 'Có lỗi xảy ra khi tạo thiết kế. Vui lòng thử lại!', image: null };
        }
        return { ...s, messages: msgs };
      });
      setSessions(newSessions);
      saveSessions(newSessions);
    } finally {
      setLoading(false);
    }
  };

  // Đồng bộ khi đổi session
  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f7fa', minHeight: 0 }}>
      <Sidebar
        sessions={sessions.map(s => ({ id: s.id, name: s.name }))}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', minHeight: 0, background: '#f5f7fa' }}>
        <div className={styles.header} style={{ background: '#fff', boxShadow: '0 2px 8px #e3eafc', borderRadius: '0 0 18px 18px', margin: '0 18px', marginTop: 18 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            className={styles.backButton}
          >
            Quay lại
          </Button>
          <h1 className={styles.title}>Tự Thiết Kế Áo</h1>
        </div>
        {/* Chat content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0, maxHeight: 750 }}>
          <div style={{ flex: 1, width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e3eafc', minHeight: 400, marginBottom: 18 }}>
            {messages.map((msg, idx) => (
              msg.loading ? (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
                  <Spin size="small" />
                  <span style={{ color: '#000' }}>Đang tạo thiết kế...</span>
                </div>
              ) : (
                <ChatMessage key={idx} role={msg.role} content={msg.content} image={msg.image} />
              )
            ))}
          </div>
        </div>
        {/* Input bar */}
        <div className={styles.inputBar} style={{ background: '#fff', borderRadius: 18, margin: '0 18px 18px 18px', boxShadow: '0 2px 8px #e3eafc' }}>
          <Input.TextArea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Nhập mô tả thiết kế..."
            style={{ resize: 'none', borderRadius: 20, background: '#f5f7fa', color: '#222', marginRight: 0, border: 'none', boxShadow: 'none', fontSize: 16 }}
            onPressEnter={e => { e.preventDefault(); handleSend(); }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            disabled={!input.trim() || loading}
            style={{ borderRadius: '50%', width: 44, height: 44, fontSize: 20, background: '#1976d2', border: 'none' }}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGenerate;
