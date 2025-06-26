"use client"

import { useEffect, useState } from "react"
import styles from "./Products.module.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState("latest")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedGender, setSelectedGender] = useState("")

  // Expandable sections state
  const [expandedSections, setExpandedSections] = useState({
    size: true,
    color: false,
    material: true,
    pattern: false,
    gender: false,
  })

  const sizes = ["S", "M", "L", "XL", "XXL"]
  const materials = ["Cotton", "Excool", "Modal (wood)", "Nylon", "Polyester", "Recycle"]
  const genders = ["Men", "Women", "Unisex"]

  // Update the state for multiple selections
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedPatterns, setSelectedPatterns] = useState([])

  // Update the color and pattern data
  const colors = [
    { name: "Blue", value: "blue", colorClass: styles.colorBlue },
    { name: "Black", value: "black", colorClass: styles.colorBlack },
    { name: "White", value: "white", colorClass: styles.colorWhite },
    { name: "Red", value: "red", colorClass: styles.colorRed },
    { name: "Gray", value: "gray", colorClass: styles.colorGray },
  ]

  const patterns = ["Embossed", "Printed", "Small Logo", "Plain"]

  // Add these handler functions
  const handleColorChange = (colorValue) => {
    setSelectedColors((prev) =>
      prev.includes(colorValue) ? prev.filter((c) => c !== colorValue) : [...prev, colorValue],
    )
  }

  const handlePatternChange = (pattern) => {
    setSelectedPatterns((prev) => (prev.includes(pattern) ? prev.filter((p) => p !== pattern) : [...prev, pattern]))
  }

  useEffect(() => {
    fetch("https://684f0445f0c9c9848d29dd1a.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => {
        const enhancedData = data.map((product) => ({
          ...product,
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviewCount: Math.floor(Math.random() * 1000) + 50,
          originalPrice: product.price * 1.2,
        }))
        setProducts(enhancedData)
      })
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleMaterialChange = (material) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const filteredProducts = products
    .filter((product) => {
      if (selectedSize && product.size !== selectedSize) return false
      if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) return false
      if (selectedPatterns.length > 0 && !selectedPatterns.includes(product.pattern)) return false
      if (selectedGender && product.gender !== selectedGender) return false
      return true
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

          {/* Color Filter */}
          <div className={styles.filterSection}>
            <button onClick={() => toggleSection("color")} className={styles.filterToggle}>
              Color
              <svg
                className={`${styles.toggleIcon} ${expandedSections.color ? styles.rotated : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${styles.filterContent} ${expandedSections.color ? styles.expanded : ""}`}>
              <div className={styles.colorGrid}>
                {colors.map((color) => (
                  <div key={color.value} className={styles.colorItem}>
                    <button
                      onClick={() => handleColorChange(color.value)}
                      className={`${styles.colorSwatch} ${color.colorClass} ${
                        selectedColors.includes(color.value) ? styles.colorSelected : ""
                      }`}
                      title={color.name}
                    />
                    <span className={styles.colorLabel}>{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Material Filter */}
          <div className={styles.filterSection}>
            <button onClick={() => toggleSection("material")} className={styles.filterToggle}>
              Material
              <svg
                className={`${styles.toggleIcon} ${expandedSections.material ? styles.rotated : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${styles.filterContent} ${expandedSections.material ? styles.expanded : ""}`}>
              <div className={styles.checkboxList}>
                {materials.map((material) => (
                  <label key={material} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => handleMaterialChange(material)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>{material}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Pattern Filter */}
          <div className={styles.filterSection}>
            <button onClick={() => toggleSection("pattern")} className={styles.filterToggle}>
              Pattern
              <svg
                className={`${styles.toggleIcon} ${expandedSections.pattern ? styles.rotated : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${styles.filterContent} ${expandedSections.pattern ? styles.expanded : ""}`}>
              <div className={styles.checkboxList}>
                {patterns.map((pattern) => (
                  <label key={pattern} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedPatterns.includes(pattern)}
                      onChange={() => handlePatternChange(pattern)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>{pattern}</span>
                  </label>
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
              <div className={styles.radioList}>
                {genders.map((gender) => (
                  <label key={gender} className={styles.radioItem}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={selectedGender === gender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className={styles.radio}
                    />
                    <span className={styles.radioLabel}>{gender}</span>
                  </label>
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
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className={styles.productImage} />
                  {product.originalPrice > product.price && (
                    <span className={styles.discountBadge}>
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
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
