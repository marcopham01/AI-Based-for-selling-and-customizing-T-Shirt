import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './Cart.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <ShoppingCartOutlined className={styles.emptyCartIcon} />
          <h2>Giỏ hàng trống</h2>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <a href="/products" className={styles.continueShopping}>
            Tiếp tục mua sắm
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Giỏ hàng</h1>
      </div>
      <button onClick={clearCart} className={styles.clearCart}>
        Xóa tất cả
      </button>

      <div className={styles.content}>
        <div className={styles.cartItems}>
          {items.map((item, idx) => (
            <div key={item.id || item._id || idx} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{formatPrice(item.price)}đ</p>
                
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.itemTotal}>
                <p className={styles.totalPrice}>{formatPrice(item.price * item.quantity)}đ</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeBtn}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Tổng đơn hàng</h2>
          
          <div className={styles.summaryRow}>
            <span>Tạm tính:</span>
            <span>{formatPrice(getCartTotal())}đ</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Phí vận chuyển:</span>
            <span>Miễn phí</span>
          </div>
          
          <div className={styles.summaryDivider}></div>
          
          <div className={styles.summaryRow}>
            <span className={styles.totalLabel}>Tổng cộng:</span>
            <span className={styles.totalAmount}>{formatPrice(getCartTotal())}đ</span>
          </div>

          <button className={styles.checkoutBtn} onClick={() => navigate('/payment')}>
            Tiến hành thanh toán
          </button>
          
          <a href="/products" className={styles.continueShopping}>
            Tiếp tục mua sắm
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
