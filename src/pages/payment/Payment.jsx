import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const { items, getCartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || items;
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Auto-fill user information when component mounts or user changes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        note: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanh toán thành công!');
  };

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Xác nhận đơn hàng</h1>
      <div className={styles.content}>
        {/* Cột trái: Thông tin đơn hàng */}
        <div className={styles.orderInfo}>
          <h2 className={styles.sectionTitle}>Sản phẩm đã đặt</h2>
          <div className={styles.productList}>
            {selectedProducts.map((item, idx) => (
              <div className={styles.productItem} key={item.id || item._id || idx}>
                <img src={item.image || '/placeholder.svg'} alt={item.name} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <div className={styles.productName}>{item.name}</div>
                  <div className={styles.productPrice}>{item.price.toLocaleString('vi-VN')}đ</div>
                  <div className={styles.productQuantity}>Số lượng: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.totalRow}>
            <span>Tổng tiền:</span>
            <span className={styles.total}>{selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
        {/* Cột phải: Form thanh toán */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.sectionTitle}>Thông tin nhận hàng</h2>
          <label>
            Họ tên
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              disabled
              style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
            />
          </label>
          <label>
            Số điện thoại
            <input 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              required 
              pattern="[0-9]{10,11}" 
              disabled
              style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
            />
          </label>
          <label>
            Địa chỉ nhận hàng
            <input 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              required 
              placeholder="Nhập địa chỉ giao hàng"
            />
          </label>
          <label>
            Ghi chú (tuỳ chọn)
            <textarea 
              name="note" 
              value={form.note} 
              onChange={handleChange} 
              placeholder="Ghi chú về đơn hàng (nếu có)"
            />
          </label>
          <button type="submit" className={styles.payBtn}>Xác nhận thanh toán</button>
        </form>
      </div>
    </div>
  );
};

export default Payment; 