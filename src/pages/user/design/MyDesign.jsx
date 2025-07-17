import React, { useEffect, useState } from 'react';
import { getUserDesign } from '../../../api/productApi';
import { Spin, Empty, Badge } from 'antd';
import styles from './MyDesign.module.css';

const statusColor = {
  pending: 'orange',
  approved: 'green',
  rejected: 'red',
};

const statusList = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

const MyDesign = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const res = await getUserDesign();
        setDesigns(res.data.data || []);
      } catch {
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  const filteredDesigns = designs.filter(d => d.status === filter);
  const getCount = status => designs.filter(d => d.status === status).length;

  return (
    <div className={styles.myDesignBg}>
      <h2 className={styles.myDesignHeader}>Thiết Kế Của Tôi</h2>
      <div className={styles.myDesignTabs}>
        {statusList.map((s) => (
          <button
            key={s.key}
            className={styles.myDesignTabBtn + (filter === s.key ? ' ' + styles.active : '')}
            onClick={() => setFilter(s.key)}
            type="button"
          >
            {s.label} <span style={{marginLeft: 6}}><Badge count={getCount(s.key)} style={{ backgroundColor: filter === s.key ? '#2563eb' : '#d1d5db', color: filter === s.key ? '#fff' : '#2563eb' }} /></span>
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '60px auto' }} />
        ) : filteredDesigns.length === 0 ? (
          <Empty description="Không có thiết kế nào" style={{ margin: '60px 0' }} />
        ) : (
          filteredDesigns.map(design => (
            <div
              key={design._id}
              className={styles.myDesignCard}
            >
              {/* Ảnh */}
              <div className={styles.myDesignImage}>
                <img
                  src={Array.isArray(design.images) && design.images[0] ? design.images[0] : '/placeholder.svg'}
                  alt={design.name}
                  className={styles.myDesignImgTag}
                />
              </div>
              {/* Thông tin */}
              <div className={styles.myDesignInfo}>
                <div className={styles.myDesignName}>{design.name}</div>
                <div className={styles.myDesignText}>Size: {Array.isArray(design.sizes) ? design.sizes.join(', ') : design.sizes}</div>
                <div className={styles.myDesignText}>Chất liệu: {design.material}</div>
                <div className={styles.myDesignText}>Giới tính: {design.gender === 'male' ? 'Nam' : design.gender === 'female' ? 'Nữ' : 'Unisex'}</div>
                <div className={styles.myDesignText}>Giá: {design.price ? design.price.toLocaleString() + ' VNĐ' : 'Chưa có'}</div>
                <div className={styles.myDesignText}>Ngày tạo: {new Date(design.createdAt).toLocaleString()}</div>
                <div className={styles.myDesignText}>Mô tả: {design.description || 'Không có mô tả'}</div>
              </div>
              {/* Trạng thái */}
              <div className={styles.myDesignStatus}>
                <Badge
                  color={statusColor[design.status] || 'blue'}
                  text={
                    design.status === 'pending' ? 'Chờ duyệt' :
                    design.status === 'approved' ? 'Đã duyệt' :
                    design.status === 'rejected' ? 'Từ chối' :
                    design.status
                  }
                  style={{ fontSize: 16, fontWeight: 600 }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDesign;
