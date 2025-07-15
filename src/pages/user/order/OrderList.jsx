import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../../api/orderApi';
import styles from './OrderList.module.css';
import { Button, Badge, Spin, Collapse, Empty } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';

const statusList = [
  { key: 'Pending', label: 'Pending' },
  { key: 'Done', label: 'Done' },
  { key: 'Cancel', label: 'Canceled' },
];

const OrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Pending');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrders();
        // Đồng bộ lại dữ liệu items cho mỗi order
        const orders = (res.data.orders || []).map(order => ({
          ...order,
          items: (order.items || []).map(item => ({
            ...item,
            images: item.product_id?.images || [],
            product_id: item.product_id // giữ lại object để fallback lấy ảnh
          }))
        }));
        setOrders(orders);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => o.status === filter);
  const getCount = status => orders.filter(o => o.status === status).length;

  const handleUpdateStatus = async (orderCode, status) => {
    try {
      await updateOrderStatus(orderCode, status);
      // Sau khi cập nhật trạng thái, reload lại danh sách đơn hàng
      const res = await getOrders();
      setOrders(res.data.orders || []);
    } catch {
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng!');
    }
  };

  const getProductImage = (item) => {
    if (Array.isArray(item.images) && item.images.length > 0 && item.images[0]) return item.images[0];
    if (item.image) return item.image;
    if (item.product_id && Array.isArray(item.product_id.images) && item.product_id.images.length > 0 && item.product_id.images[0]) return item.product_id.images[0];
    if (item.product_id && item.product_id.image) return item.product_id.image;
    return '/placeholder.svg';
  };

  return (
    <div className={styles.orderListBg}>
      <h2 className={styles.orderListHeader}>Các Đơn Hàng Của {user?.name || ''}</h2>
      <div className={styles.orderListTabs}>
        {statusList.map(s => (
          <button
            key={s.key}
            className={styles.orderListTabBtn + (filter === s.key ? ' ' + styles.active : '')}
            onClick={() => setFilter(s.key)}
            type="button"
          >
            {s.label} <span style={{marginLeft: 6}}><Badge count={getCount(s.key)} style={{ backgroundColor: filter === s.key ? '#2563eb' : '#d1d5db', color: filter === s.key ? '#fff' : '#2563eb' }} /></span>
          </button>
        ))}
      </div>
      <div className={styles.orderListContent}>
        {loading ? (
          <Spin size="large" />
        ) : filteredOrders.length === 0 ? (
          <Empty description="Không có đơn hàng nào" />
        ) : (
          filteredOrders.map(order => (
            <div
              key={order._id}
              className={styles.orderCard + ' ' + (expanded === order._id ? styles.expanded : '')}
              style={{ minHeight: 120, maxWidth: 700, margin: '0 auto', transition: 'min-height 0.3s' }}
            >
              <div className={styles.orderCardRow} onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                {/* Cột trái */}
                <div className={styles.orderCardColLeft}>
                  <div className={styles.productName}><b>{order.items && order.items.length > 0 ? order.items.map(i => i.product_name || i.name || i.product_id?.name).join(', ') : 'Sản phẩm'}</b></div>
                </div>
                {/* Cột phải */}
                <div className={styles.orderCardColRight}>
                  <div className={styles.orderCode}><b>Mã đơn:</b> #{order.order_code}</div>
                  <div className={styles.orderDate}><b>Ngày:</b> {new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <Button type="link" icon={expanded === order._id ? <UpOutlined /> : <DownOutlined />} style={{marginLeft: 8}} />
              </div>
              {expanded === order._id && (
                <div className={styles.orderCardDetail}>
                  <div className={styles.productList}>
                    {order.items.map((item, idx) => (
                      <div className={styles.productItem} key={idx}>
                        <img
                          src={getProductImage(item)}
                          alt={item.product_name || item.product_id?.name || 'Sản phẩm'}
                          className={styles.orderProductImage}
                        />
                        <div className={styles.productDetails}>
                          <div className={styles.productName}>{item.product_name || item.product_id?.name}</div>
                          <div className={styles.productSize}>Size: {item.size}</div>
                          <div className={styles.productQuantity}>Số lượng: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.infoRow}><b>Địa chỉ giao hàng:</b> {order.shipping_info?.address}</div>
                  <div className={styles.infoRow}><b>Phương thức thanh toán:</b> {order.payment_method}</div>
                  <div className={styles.infoRow}><b>Tổng tiền:</b> {order.total_amount?.toLocaleString()} VND</div>
                  {order.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                      <Button danger onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
                          handleUpdateStatus(order.order_code, 'Cancel');
                        }
                      }}>Hủy Đơn</Button>
                      <Button type="primary" onClick={() => handleUpdateStatus(order.order_code, 'Done')}>Đã Nhận Được Hàng</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;
