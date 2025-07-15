import React from 'react';
import styles from './Blog.module.css';

const blogs = [
  {
    id: 1,
    title: 'Xu hướng áo thun AI năm 2024',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    date: '10/06/2024',
    description: 'Khám phá các mẫu áo thun in AI hot nhất năm nay, cá tính, sáng tạo và cực chất!'
  },
  {
    id: 2,
    title: 'Cách chọn size áo thun chuẩn',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    date: '05/06/2024',
    description: 'Hướng dẫn chọn size áo thun phù hợp với dáng người, giúp bạn tự tin diện mọi lúc mọi nơi.'
  },
  {
    id: 3,
    title: 'Bí quyết bảo quản áo thun in hình',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    date: '01/06/2024',
    description: 'Mẹo giặt và bảo quản áo thun in hình luôn bền đẹp như mới.'
  },
  {
    id: 4,
    title: 'Top 5 mẫu áo thun AI bán chạy nhất',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    date: '28/05/2024',
    description: 'Danh sách những mẫu áo thun AI được yêu thích và đặt hàng nhiều nhất tại shop.'
  },
  {
    id: 5,
    title: 'Tại sao nên chọn áo thun in AI?',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    date: '22/05/2024',
    description: 'Áo thun in AI mang lại sự độc đáo, cá nhân hóa và chất lượng hình in sắc nét.'
  },
  {
    id: 6,
    title: 'Cách phối đồ với áo thun AI',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    date: '18/05/2024',
    description: 'Gợi ý mix & match áo thun AI với quần jeans, chân váy, phụ kiện cực chất.'
  },
  {
    id: 7,
    title: 'Quy trình đặt áo thun in AI tại shop',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    date: '12/05/2024',
    description: 'Các bước đặt hàng, gửi mẫu thiết kế và nhận áo thun in AI nhanh chóng.'
  },
  {
    id: 8,
    title: 'Chất liệu vải áo thun in AI có gì đặc biệt?',
    image: 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80',
    date: '08/05/2024',
    description: 'Tìm hiểu về các loại vải cotton, poly, co giãn tốt, thấm hút mồ hôi phù hợp in AI.'
  },
];

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>Blog của Shop</h1>
      <div className={styles.blogList}>
        {blogs.map(blog => (
          <div className={styles.blogCard} key={blog.id}>
            <img src={blog.image} alt={blog.title} className={styles.blogImg} />
            <div className={styles.blogContent}>
              <h2>{blog.title}</h2>
              <p className={styles.blogDate}>{blog.date}</p>
              <p>{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
