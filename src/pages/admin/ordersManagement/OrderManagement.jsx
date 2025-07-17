import { useState, useEffect } from 'react'
import { getOrderStats } from '../../../api/adminApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminOrders() {
  const [orderStats, setOrderStats] = useState(null)

  // Load thống kê đơn hàng
  const loadOrderStats = async () => {
    try {
      const response = await getOrderStats()
      setOrderStats(response.data.data)
    } catch (err) {
      console.error('Error loading order stats:', err)
    }
  }

  useEffect(() => {
    loadOrderStats()
  }, [])

  // Chart data cho thống kê theo status
  const statusChartData = {
    labels: ['Hoàn thành', 'Đang chờ', 'Đã hủy'],
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: [
          orderStats?.doneCount || 0,
          orderStats?.totalOrders - (orderStats?.doneCount || 0) - (orderStats?.cancelCount || 0) || 0,
          orderStats?.cancelCount || 0
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data cho doanh thu
  const revenueChartData = {
    labels: ['Doanh thu'],
    datasets: [
      {
        label: 'Tổng doanh thu (VNĐ)',
        data: [orderStats?.totalRevenue || 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê đơn hàng',
      },
    },
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tổng doanh thu',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN') + ' ₫';
          }
        }
      }
    }
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 24,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      padding: 40,
      minHeight: 600,
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <h2 style={{
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: '#00796b',
        letterSpacing: 1,
        textShadow: '0 2px 12px #fff8'
      }}>📊 Thống kê đơn hàng 📊</h2>

      {/* Thống kê tổng quan */}
      {orderStats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: 32
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Tổng đơn hàng</h3>
            <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>
              {orderStats.totalOrders}
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Tổng doanh thu</h3>
            <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>
              {orderStats.totalRevenue?.toLocaleString('vi-VN')} ₫
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Đơn hoàn thành</h3>
            <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>
              {orderStats.doneCount} ({orderStats.doneRatio})
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            padding: '20px',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Đơn đã hủy</h3>
            <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>
              {orderStats.cancelCount} ({orderStats.cancelRatio})
            </p>
          </div>
        </div>
      )}

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 24,
        marginBottom: 32
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <Pie data={statusChartData} options={chartOptions} />
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <Bar data={revenueChartData} options={revenueChartOptions} />
        </div>
      </div>
    </div>
  )
}
