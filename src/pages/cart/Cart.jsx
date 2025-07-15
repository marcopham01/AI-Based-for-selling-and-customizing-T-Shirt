import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Cart.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // State lưu các sản phẩm được chọn (dạng: [{id, size}])
  const [selectedItems, setSelectedItems] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getProductImage = (item) => {
    if (Array.isArray(item.images) && item.images.length > 0 && item.images[0]) return item.images[0];
    if (item.image) return item.image;
    if (item.product_id && Array.isArray(item.product_id.images) && item.product_id.images.length > 0 && item.product_id.images[0]) return item.product_id.images[0];
    if (item.product_id && item.product_id.image) return item.product_id.image;
    return '/placeholder.svg';
  };

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show loading spinner while fetching cart data
  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

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

  // Hàm kiểm tra sản phẩm đã được chọn chưa
  const isSelected = (item) => {
    return selectedItems.some(
      (selected) => selected.id === item.id && selected.size === item.size
    );
  };

  // Hàm xử lý chọn/bỏ chọn sản phẩm
  const handleSelectItem = (item) => {
    const key = { id: item.id, size: item.size };
    if (isSelected(item)) {
      setSelectedItems(selectedItems.filter(
        (selected) => !(selected.id === item.id && selected.size === item.size)
      ));
    } else {
      setSelectedItems([...selectedItems, key]);
    }
  };

  const handleRemoveSelected = async () => {
    for (const selected of selectedItems) {
      await removeFromCart(selected.id, selected.size);
    }
    setSelectedItems([]);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    // Lấy danh sách sản phẩm đã chọn
    const selectedProducts = items.filter(item => isSelected(item));
    navigate('/payment', { state: { selectedProducts } });
  };

  // Hàm tính tổng số lượng và tổng tiền các sản phẩm đã chọn
  const selectedProducts = items.filter(item => isSelected(item));
  const selectedTotalQuantity = selectedProducts.reduce((sum, item) => sum + item.quantity, 0);
  const selectedTotalPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Giỏ hàng</h1>
      </div>
      <button
        onClick={selectedItems.length > 0 ? handleRemoveSelected : clearCart}
        className={styles.clearCart}
        disabled={selectedItems.length === 0 && items.length === 0}
      >
        {selectedItems.length > 0 ? 'Xóa sản phẩm đã chọn' : 'Xóa tất cả'}
      </button>

      <div className={`${styles.content} ${selectedItems.length === 0 ? styles.fullWidth : ''}`}>
        <div className={styles.cartItems}>
          {items.map((item, idx) => (
            <div key={item.id || item._id || idx} className={styles.cartItem}>
              <input
                type="checkbox"
                checked={isSelected(item)}
                onChange={() => handleSelectItem(item)}
                className={styles.selectCheckbox}
              />
              <div className={styles.itemImage}>
                <img src={getProductImage(item)} alt={item.name} />
              </div>
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>{formatPrice(item.price)}đ</p>
                {item.size && (
                  <p className={styles.itemSize}>Size: {item.size}</p>
                )}
                
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                    className={styles.quantityBtn}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.itemTotal}>
                <p className={styles.totalPrice}>{formatPrice(item.price * item.quantity)}đ</p>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
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

        {/* Chỉ hiện card tổng đơn hàng khi có sản phẩm được chọn */}
        {selectedItems.length > 0 && (
          <div className={styles.cartSummary}>
            <h2>Tổng đơn hàng</h2>
            <div className={styles.summaryRow}>
              <span>Tổng sản phẩm:</span>
              <span>{selectedTotalQuantity}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tạm tính:</span>
              <span>{formatPrice(selectedTotalPrice)}đ</span>
            </div>
            <div className={styles.summaryDivider}></div>
            <div className={styles.summaryRow}>
              <span className={styles.totalLabel}>Tổng cộng:</span>
              <span className={styles.totalAmount}>{formatPrice(selectedTotalPrice)}đ</span>
            </div>
            <button
              className={styles.checkoutBtn}
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Tiến hành thanh toán
            </button>
            <a href="/products" className={styles.continueShopping}>
              Tiếp tục mua sắm
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
