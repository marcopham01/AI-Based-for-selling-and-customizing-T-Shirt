import React from 'react';
import styles from './Policy.module.css';

const Policy = () => {
  return (
    <div className={styles.policyContainer}>
      <h1 className={styles.policyTitle}>Chính Sách Của Shop</h1>
      <section className={styles.policySection}>
        <h2>Chính sách mua hàng</h2>
        <ul>
          <li>Khách hàng có thể đặt áo thun in AI trực tiếp trên website hoặc liên hệ fanpage.</li>
          <li>Thanh toán linh hoạt: chuyển khoản, ví điện tử hoặc COD.</li>
          <li>Hỗ trợ thiết kế mẫu in theo yêu cầu miễn phí.</li>
        </ul>
      </section>
      <section className={styles.policySection}>
        <h2>Chính sách đổi trả</h2>
        <ul>
          <li>Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi do sản xuất hoặc vận chuyển.</li>
          <li>Không áp dụng đổi trả với sản phẩm đã qua sử dụng hoặc đặt theo thiết kế riêng.</li>
          <li>Liên hệ CSKH để được hướng dẫn chi tiết quy trình đổi trả.</li>
        </ul>
      </section>
      <section className={styles.policySection}>
        <h2>Chính sách bảo mật</h2>
        <ul>
          <li>Cam kết bảo mật thông tin cá nhân khách hàng tuyệt đối.</li>
          <li>Không chia sẻ thông tin cho bên thứ ba khi chưa có sự đồng ý của khách hàng.</li>
        </ul>
      </section>
      <section className={styles.policySection}>
        <h2>Liên hệ</h2>
        <ul>
          <li>Hotline: 0123 456 789</li>
          <li>Email: support@aithunshop.vn</li>
          <li>Fanpage: fb.com/aithunshop</li>
        </ul>
      </section>
    </div>
  );
};

export default Policy;
