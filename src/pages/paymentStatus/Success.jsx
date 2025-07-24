import styles from './Success.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { updateOrderPaymentStatus } from '../../api/orderApi';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Success() {
  const navigate = useNavigate();
  const query = useQuery();
  const status = query.get('status');
  const orderCode = query.get('orderCode') || query.get('ordercode') || query.get('order_code');
  const cancel = query.get('cancel') === 'true';

  useEffect(() => {
    if (orderCode && status) {
      updateOrderPaymentStatus({ status, orderCode, cancel })
        .catch(() => {
          // Có thể xử lý lỗi ở đây nếu muốn
        });
    }
  }, [orderCode, status, cancel]);

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <svg className={styles.icon} viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="48" fill="#e6fff2" stroke="#52c41a" strokeWidth="4" />
          <polyline points="30,55 45,70 70,40" fill="none" stroke="#52c41a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className={styles.title}>Thanh toán thành công!</h2>
      <p className={styles.message}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận.</p>
      <div className={styles.buttonGroup}>
        <button className={styles.buttonHome} onClick={() => navigate('/')}>Quay về trang chủ</button>
        <button className={styles.buttonOrders} onClick={() => navigate('/profile?tab=orders')}>Xem các đơn hàng của tôi</button>
      </div>
    </div>
  );
}
