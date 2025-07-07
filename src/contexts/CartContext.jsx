import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI } from '../api/cartApi';
import { message } from 'antd';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });

  // Fetch cart from BE if token exists
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await getCart();
        if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
          // Map BE cart to FE format
          const items = res.data.cart.items.map(item => ({
            id: item.product_id._id || item.product_id,
            name: item.product_id.name,
            price: item.product_id.price,
            image: item.product_id.image,
            quantity: item.quantity,
            size: item.size
          }));
          dispatch({ type: 'LOAD_CART', payload: items });
        } else {
          dispatch({ type: 'LOAD_CART', payload: [] });
        }
      } catch (err) {
        dispatch({ type: 'LOAD_CART', payload: [] });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Bạn cần đăng nhập để thêm vào giỏ hàng!');
      return;
    }
    try {
      await addToCartAPI({ product_id: product.id || product._id, quantity: 1, size: product.size || 'M' });
      await fetchCart();
      message.success(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (err) {
      message.error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, size = 'M') => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await removeFromCartAPI({ product_id: productId, size });
      await fetchCart();
      message.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (err) {
      message.error('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity, size = 'M') => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (quantity <= 0) {
      await removeFromCart(productId, size);
      return;
    }
    try {
      await updateCartItemAPI({ product_id: productId, quantity, size });
      await fetchCart();
    } catch (err) {
      message.error('Không thể cập nhật số lượng');
    }
  };

  // Clear cart
  const clearCart = async () => {
    // Xóa từng item (nếu BE không có API clear all)
    for (const item of state.items) {
      await removeFromCart(item.id, item.size);
    }
    await fetchCart();
  };

  // Clear selected items from cart
  const clearSelectedCart = async (selectedItems) => {
    for (const item of selectedItems) {
      await removeFromCart(item.id || item._id, item.size || 'M');
    }
    await fetchCart();
  };

  const getCartTotal = () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      loading: state.loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      clearSelectedCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);