import React, { useEffect, useState } from 'react';
import { getUserDesign } from '../../../api/productApi';
import { useCart } from '../../../contexts/CartContext';
import { message, Spin, Empty, Badge, Modal, Select } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
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

// Thêm hàm tạo URL ảnh đúng
const getImageUrl = (img) => {
  if (!img) return '/placeholder.svg';
  if (img.startsWith('data:image')) return img;
  // Nếu là đường dẫn uploads/xxx, ghép với domain backend
  return `http://localhost:5000/${img.replace(/\\/g, '/').replace(/\\/g, '/').replace(/\+/g, '/')}`;
};

const MyDesign = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const { addToCart } = useCart();
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

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

  const handleAddToCart = (design) => {
    const sizes = Array.isArray(design.sizes) ? design.sizes : [design.sizes];
    if (sizes.length === 1) {
      addToCart({ ...design, id: design._id, size: sizes[0] });
      message.success(`${design.name} đã được thêm vào giỏ hàng!`);
    } else {
      setSelectedDesign(design);
      setSelectedSize(sizes[0]);
      setSizeModalVisible(true);
    }
  };

  const handleSizeConfirm = () => {
    if (selectedDesign) {
      addToCart({ ...selectedDesign, id: selectedDesign._id, size: selectedSize });
      message.success(`${selectedDesign.name} (Size ${selectedSize}) đã được thêm vào giỏ hàng!`);
      setSizeModalVisible(false);
      setSelectedDesign(null);
    }
  };

  const handleSizeCancel = () => {
    setSizeModalVisible(false);
    setSelectedDesign(null);
  };

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
                  src={Array.isArray(design.images) && design.images[0] ? getImageUrl(design.images[0]) : '/placeholder.svg'}
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
                {design.status === 'approved' && (
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(design)}
                    style={{ marginTop: 12 }}
                  >
                    <ShoppingCartOutlined style={{ fontSize: 18 }} />
                    Thêm vào giỏ hàng
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal chọn size */}
      <Modal
        title="Chọn kích thước"
        open={sizeModalVisible}
        onOk={handleSizeConfirm}
        onCancel={handleSizeCancel}
        okText="Thêm vào giỏ hàng"
        cancelText="Hủy"
      >
        {selectedDesign && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={Array.isArray(selectedDesign.images) && selectedDesign.images[0] ? getImageUrl(selectedDesign.images[0]) : "/placeholder.svg"}
              alt={selectedDesign.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '16px' }}
            />
            <h3>{selectedDesign.name}</h3>
            <p style={{ marginBottom: '16px' }}>Chọn kích thước:</p>
            <Select
              value={selectedSize}
              onChange={setSelectedSize}
              style={{ width: '100%' }}
            >
              {(Array.isArray(selectedDesign.sizes) ? selectedDesign.sizes : [selectedDesign.sizes]).map(size => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyDesign;
