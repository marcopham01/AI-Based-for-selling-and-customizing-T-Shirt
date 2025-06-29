"use client"

import { useEffect, useState } from "react"
import styles from "./Products.module.css"
import { getProducts } from "../../api/productApi"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { notification, message } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState("latest")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedGender, setSelectedGender] = useState("")

  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    size: true,
    gender: false,
  })

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const genders = ["Male", "Female", "Unisex"]

  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    getProducts()
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : (res.data.products || res.data.data || []);
        setProducts(arr);
      })
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Lọc sản phẩm theo size và gender
  const filteredProducts = products
    .filter((product) => {
      if (selectedSize && !(product.sizes && product.sizes.includes(selectedSize))) return false;
      if (selectedGender && product.gender && product.gender.toLowerCase() !== selectedGender.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  // Hàm thêm sản phẩm và hiện thông báo
  const handleAddToCart = (product, idx) => {
    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      return;
    }
    
    const id = product.id || product._id || idx;
    addToCart({ ...product, id });
    message.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>MEN'S T-SHIRTS</h1>

      <div className={styles.mainContent}>
        {/* FILTER SIDEBAR */}
        <div className={styles.filterSidebar}>
          <h2 className={styles.filterTitle}>Filter</h2>

          {/* Size Filter */}
          <div className={styles.filterSection}>
            <button onClick={() => toggleSection("size")} className={styles.filterToggle}>
              Size
              <svg
                className={`${styles.toggleIcon} ${expandedSections.size ? styles.rotated : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${styles.filterContent} ${expandedSections.size ? styles.expanded : ""}`}>
              <div className={styles.sizeGrid}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gender Filter */}
          <div className={styles.filterSection}>
            <button onClick={() => toggleSection("gender")} className={styles.filterToggle}>
              Gender
              <svg
                className={`${styles.toggleIcon} ${expandedSections.gender ? styles.rotated : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${styles.filterContent} ${expandedSections.gender ? styles.expanded : ""}`}>
              <div className={styles.sizeGrid}>
                {genders.map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(selectedGender === gender ? "" : gender)}
                    className={`${styles.sizeButton} ${selectedGender === gender ? styles.selected : ""}`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div className={styles.productSection}>
          {/* Results and Sort */}
          <div className={styles.productHeader}>
            <span className={styles.resultCount}>{filteredProducts.length} results</span>
            <div className={styles.sortContainer}>
              <label htmlFor="sort" className={styles.sortLabel}>
                Sort by:
              </label>
              <select id="sort" value={sortBy} onChange={handleSortChange} className={styles.sortSelect}>
                <option value="latest">Latest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className={styles.productGrid}>
            {filteredProducts.map((product, idx) => (
              <div key={product.id || product._id || idx} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className={styles.productImage} />
                  {product.originalPrice > product.price && (
                    <span className={styles.discountBadge}>
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                  {/* Cart Icon Button */}
                  <button
                    className={styles.cartIconBtn}
                    title={isAuthenticated ? "Thêm vào giỏ hàng" : "Đăng nhập để thêm vào giỏ hàng"}
                    onClick={() => handleAddToCart(product, idx)}
                  >
                    <ShoppingCartOutlined style={{ fontSize: 24 }} />
                  </button>
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productRating}>
                    <span className={styles.rating}>★ {product.rating}</span>
                    <span className={styles.reviewCount}>({product.reviewCount})</span>
                    {Math.random() > 0.7 && <span className={styles.bestSellerBadge}>BEST SELLER</span>}
                  </div>

                  <h3 className={styles.productName}>{product.name}</h3>

                  <div className={styles.productPricing}>
                    <span className={styles.currentPrice}>{product.price}đ</span>
                    {product.originalPrice > product.price && (
                      <span className={styles.originalPrice}>{Math.round(product.originalPrice)}đ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
