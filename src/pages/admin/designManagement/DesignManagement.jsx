import { useState, useEffect } from 'react'
import { getAllDesigns, updateDesignStatus } from '../../../api/adminApi'
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

export default function AdminDesigns() {
  const [designs, setDesigns] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectingDesign, setRejectingDesign] = useState(null)

  // Load designs từ API
  const loadDesigns = async () => {
    try {
      setLoading(true)
      const response = await getAllDesigns()
      setDesigns(response.data.data || [])
    } catch (err) {
      setError('Không thể tải danh sách thiết kế')
      console.error('Error loading designs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDesigns()
  }, [])

  const filtered = designs.filter(d =>
    d.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    d.status?.toLowerCase().includes(search.toLowerCase())
  )

  const handleStatusUpdate = async (designId, newStatus, reason = '') => {
    try {
      await updateDesignStatus(designId, newStatus, reason)
      // Reload designs sau khi update
      loadDesigns()
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err)
      setError('Không thể cập nhật trạng thái thiết kế')
    }
  }

  const handleReject = (design) => {
    setRejectingDesign(design)
    setRejectReason('')
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối')
      return
    }
    handleStatusUpdate(rejectingDesign._id, 'rejected', rejectReason)
    setShowRejectModal(false)
    setRejectingDesign(null)
    setRejectReason('')
  }

  const cancelReject = () => {
    setShowRejectModal(false)
    setRejectingDesign(null)
    setRejectReason('')
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#ff9800', bg: '#fff3e0', text: 'Chờ duyệt' },
      approved: { color: '#4caf50', bg: '#e8f5e8', text: 'Đã duyệt' },
      rejected: { color: '#f44336', bg: '#ffebee', text: 'Từ chối' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}`
      }}>
        {config.text}
      </span>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '18px',
        color: '#777'
      }}>
        Đang tải...
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 24,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      padding: 40,
      minHeight: 600,
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      <h2 style={{
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: '#4f2e91',
        letterSpacing: 1,
        textShadow: '0 12px #fff8'
      }}>🎨 Quản lý thiết kế 🎨</h2>
      
      {error && (
        <div style={{
          background: '#f3e5f5',
          color: '#777',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: 16,
          border: '1px solid #ce938'
        }}>
          {error}
        </div>
      )}
      
      <div style={{
        marginBottom: 32,
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: 320 }}>
          <SearchOutlined style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#222', fontSize: 18, zIndex: 1 }} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên user, email hoặc trạng thái"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '14px 14px 14px 40px',
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              outline: 'none',
              width: '100%',
              background: 'rgba(255,255,255,0.8)',
              fontSize: 16,
              color: 'black',
              boxShadow: '0 2px 8px #b39ddb22'
            }}
          />
        </div>
      </div>

      <div style={{
        overflowX: 'auto',
        borderRadius: 14,
        boxShadow: '0 4px 24px rgba(0,0,0,0.075)',
        background: 'rgba(255,255,255,0.9)',
        marginBottom: 32
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 17
        }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #a18d10 0%, #bc2eb 100%)' }}>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Hình ảnh</th>
              <th style={thStyle}>Ngày tạo</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{
                  ...tdStyle,
                  textAlign: 'center',
                  color: '#b39ddb',
                  fontStyle: 'italic'
                }}>Không có thiết kế nào phù hợp.</td>
              </tr>
            )}
            {filtered.map(design => (
              <tr key={design._id} style={{
                background: 'rgba(255,255,255,0.9)',
                transition: 'background 0.2s ease'
              }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600', color: '#333' }}>
                    {design.user?.name || 'N/A'}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ color: '#666', fontSize: '14px' }}>
                    {design.user?.email || 'N/A'}
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {design.images && design.images.length > 0 ? (
                      design.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt="Thiết kế" 
                          style={{ 
                            width: 60, 
                            height: 60, 
                            objectFit: 'cover', 
                            borderRadius: 8, 
                            border: '2px solid #eee',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setSelectedDesign(design)
                            setShowImageModal(true)
                          }}
                          onError={e => { 
                            e.target.onerror = null; 
                            e.target.src = '/no-image.png'
                          }}
                        />
                      ))
                    ) : (
                      <div style={{ color: '#999', fontSize: 14 }}>Không có ảnh</div>
                    )}
                  </div>
                </td>
                <td style={tdStyle}>
                  {formatDate(design.createdAt)}
                </td>
                <td style={tdStyle}>
                  {getStatusBadge(design.status)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {design.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: 20,
                          color: '#4caf50',
                          padding: '4px'
                        }} 
                        title="Duyệt" 
                        onClick={() => handleStatusUpdate(design._id, 'approved')}
                      >
                        <CheckOutlined />
                      </button>
                      <button 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontSize: 20,
                          color: '#f44336',
                          padding: '4px'
                        }} 
                        title="Từ chối" 
                        onClick={() => handleReject(design)}
                      >
                        <CloseOutlined />
                      </button>
                    </div>
                  )}
                  {design.status !== 'pending' && (
                    <div style={{ color: '#999', fontSize: '14px', display: 'flex', justifyContent: 'flex-start' }}>
                      Đã xử lý
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedDesign && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={() => setShowImageModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                Thiết kế của {selectedDesign.user?.name || 'User'}
              </h3>
              <button 
                onClick={() => setShowImageModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16
            }}>
              {selectedDesign.images && selectedDesign.images.map((img, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <img 
                    src={img} 
                    alt={`Thiết kế ${idx + 1}`}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      borderRadius: '8px',
                      border: '2px solid #eee'
                    }}
                    onError={e => { 
                      e.target.onerror = null; 
                      e.target.src = '/no-image.png'
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              {selectedDesign.status === 'pending' && (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button 
                    style={{
                      background: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                    onClick={() => {
                      handleStatusUpdate(selectedDesign._id, 'approved')
                      setShowImageModal(false)
                    }}
                  >
                    Duyệt thiết kế
                  </button>
                  <button 
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                    onClick={() => {
                      handleReject(selectedDesign)
                      setShowImageModal(false)
                    }}
                  >
                    Từ chối thiết kế
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && rejectingDesign && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={() => setShowRejectModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 20, color: '#333' }}>
              Xác nhận từ chối thiết kế
            </h3>
            <p style={{ marginBottom: 20, color: '#666' }}>
              Bạn có chắc chắn muốn từ chối thiết kế của {rejectingDesign.user?.name || 'User'}?
            </p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, textAlign: 'left', color: '#333', fontWeight: 600 }}>
                Lý do từ chối: *
              </label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối thiết kế..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  outline: 'none',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button 
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onClick={confirmReject}
              >
                Xác nhận
              </button>
              <button 
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onClick={cancelReject}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const thStyle = {
  padding: 18,
  borderBottom: '2px solid #ce938',
  textAlign: 'left',
  color: '#4527a0',
  fontWeight: 700,
  fontSize: 18,
  letterSpacing: 0.5
}

const tdStyle = {
  padding: 14,
  borderBottom: '1px solid #e1bee7',
  color: '#333'
}
