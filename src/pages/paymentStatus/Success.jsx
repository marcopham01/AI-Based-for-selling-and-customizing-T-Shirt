import styles from './Success.module.css';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
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
      <button className={styles.button} onClick={() => navigate('/')}>Quay về trang chủ</button>
    </div>
  );
}
