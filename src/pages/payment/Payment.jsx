import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMoneyBillWave, FaQrcode } from 'react-icons/fa';

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
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [qrNotice, setQrNotice] = useState('');

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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setQrNotice('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'COD') {
      navigate('/success');
    } else if (paymentMethod === 'QR') {
      setQrNotice('Tính năng thanh toán QR sẽ sớm ra mắt!');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy thanh toán và quay lại?')) {
      navigate('/cancel');
    }
    // Nếu không xác nhận thì không làm gì, ở lại trang thanh toán
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
        <div className={styles.orderCard}>
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
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h2 className={styles.sectionTitle}>Thông tin nhận hàng</h2>
          <label>
            Họ tên
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              disabled
              className={styles.inputDisabled}
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
              className={styles.inputDisabled}
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
          {/* Card chọn phương thức thanh toán */}
          <div className={styles.paymentCard}>
            <div className={styles.paymentTitle}>Chọn phương thức thanh toán</div>
            <div className={styles.paymentOptions}>
              <div
                className={paymentMethod === 'COD' ? styles.methodCardSelected : styles.methodCard}
                onClick={() => handlePaymentMethodChange({ target: { value: 'COD' } })}
                tabIndex={0}
                role="button"
                aria-pressed={paymentMethod === 'COD'}
              >
                <FaMoneyBillWave className={styles.methodIcon} />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </div>
              <div
                className={paymentMethod === 'QR' ? styles.methodCardSelected : styles.methodCard}
                onClick={() => handlePaymentMethodChange({ target: { value: 'QR' } })}
                tabIndex={0}
                role="button"
                aria-pressed={paymentMethod === 'QR'}
              >
                <FaQrcode className={styles.methodIcon} />
                <span>QR Code</span>
              </div>
            </div>
            {qrNotice && (
              <div className={styles.qrNotice}>{qrNotice}</div>
            )}
          </div>
          <div className={styles.actionRow}>
            <button type="submit" className={styles.payBtn}>
              Xác nhận thanh toán
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment; 