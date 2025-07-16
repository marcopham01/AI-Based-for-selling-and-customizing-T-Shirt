import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './ImageGenerate.module.css';
import { Modal } from 'antd';

const Sidebar = ({ sessions, currentSessionId, onSelectSession, onNewSession, onDeleteSession }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleDelete = (sessionId, sessionName) => {
    if (window.confirm(`Bạn có chắc muốn xoá "${sessionName}" không?`)) {
      onDeleteSession && onDeleteSession(sessionId);
    }
  };

  return (
    <div className={collapsed ? styles.sidebarCollapsed : styles.sidebar} style={{ background: '#fff', boxShadow: '2px 0 12px #e3eafc', borderRadius: '18px 0 0 18px', margin: 18 }}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        {!collapsed && <span className={styles.sidebarTitle}>Chat thiết kế</span>}
      </div>
      {!collapsed && (
        <button className={styles.newSessionBtn} onClick={onNewSession}>
          <PlusOutlined /> Cuộc chat mới
        </button>
      )}
      {!collapsed && (
        <div className={styles.sessionList}>
          {sessions.map((session) => (
            <div
              key={session.id}
              className={
                styles.sessionItem +
                (session.id === currentSessionId ? ' ' + styles.sessionItemActive : '')
              }
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              onClick={() => onSelectSession(session.id)}
            >
              <span style={{ flex: 1 }}>{session.name}</span>
              <DeleteOutlined
                style={{ color: '#b91c1c', marginLeft: 8, fontSize: 16, cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(session.id, session.name);
                }}
                title="Xoá đoạn chat"
              />
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Sidebar; 