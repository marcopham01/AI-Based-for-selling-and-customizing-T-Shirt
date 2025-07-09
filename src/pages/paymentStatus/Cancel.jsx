import styles from './Cancel.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <svg className={styles.icon} viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="48" fill="#ffeaea" stroke="#ff4d4f" strokeWidth="4" />
          <line x1="35" y1="35" x2="65" y2="65" stroke="#ff4d4f" strokeWidth="6" strokeLinecap="round" />
          <line x1="65" y1="35" x2="35" y2="65" stroke="#ff4d4f" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className={styles.title}>Thanh toán thất bại!</h2>
      <p className={styles.message}>Giao dịch của bạn đã bị hủy hoặc gặp lỗi. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
      <div className={styles.buttonGroup}>
        <button className={styles.buttonHome} onClick={() => navigate('/')}>Quay về trang chủ</button>
        <button className={styles.buttonOrders} onClick={() => navigate('/orders')}>Xem các đơn hàng của tôi</button>
      </div>
    </div>
  );
}
