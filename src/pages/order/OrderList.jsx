import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../api/orderApi';
import styles from './OrderList.module.css';
import { Button, Badge, Spin, Collapse, Empty } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

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
        setOrders(res.data.orders || []);
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

  const getFilterBtnStyle = (status) => {
    if (status === 'Pending') return { background: 'transparent', color: '#2563eb', border: `2px solid #2563eb` };
    if (status === 'Done') return { background: 'transparent', color: '#22c55e', border: `2px solid #22c55e` };
    if (status === 'Canceled') return { background: 'transparent', color: '#ef4444', border: `2px solid #ef4444` };
    return {};
  };

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

  return (
    <div className={styles.orderListBg}>
      <h2 className={styles.title}>Các Đơn Hàng Của {user?.name || ''}</h2>
      <div className={styles.filterBar}>
        {statusList.map(s => (
          <Button
            key={s.key}
            type={filter === s.key ? 'default' : 'default'}
            onClick={() => setFilter(s.key)}
            className={styles.filterBtn}
            style={getFilterBtnStyle(s.key)}
          >
            {s.label} <Badge count={getCount(s.key)} style={{ backgroundColor: getFilterBtnStyle(s.key).color, color: '#fff', marginLeft: 8 }} />
          </Button>
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
            >
              <div className={styles.orderCardHeader} onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                <div>
                  <b>Mã đơn:</b> #{order.order_code} &nbsp;|&nbsp; <b>Ngày:</b> {new Date(order.createdAt).toLocaleString()}
                  {order.items && order.items.length > 0 && (
                    <>
                      &nbsp;|&nbsp; <b>Sản phẩm:</b> {order.items.map(i => i.product_name || i.name || i.product_id?.name).join(', ')}
                    </>
                  )}
                </div>
                <div>
                  <b>Trạng thái:</b> {order.status}
                </div>
                <Button type="link" icon={expanded === order._id ? <UpOutlined /> : <DownOutlined />} />
              </div>
              {expanded === order._id && (
                <div className={styles.orderCardDetail}>
                  <div className={styles.productList}>
                    {order.items.map((item, idx) => (
                      <div className={styles.productItem} key={idx}>
                        <img
                          src={item.image || item.product_id?.image || '/placeholder.svg'}
                          alt={item.product_name || item.product_id?.name || 'Sản phẩm'}
                          className={styles.productImage}
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
