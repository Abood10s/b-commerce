import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateCartItem,
} from "../../features/slices/cartSlice";
import { useCreateOrderMutation } from "../../features/api/orderApi";

import CartItem from "../../components/CatrItem";
import EmptyCart from "../../assets/empty-cart.png";
import "./style.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    location: "",
    phoneNumber: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [createOrder] = useCreateOrderMutation();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const orderFormRef = useRef(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };
  useEffect(() => {
    if (isOrderFormVisible && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOrderFormVisible]);
  const handleOrderClick = () => {
    setIsOrderFormVisible(true);
  };

  const validateForm = () => {
    let errors = {};

    if (!orderFormData.phoneNumber.trim()) {
      errors.phoneNumber = "الرجاء إدخال رقم الهاتف.";
    }
    if (!orderFormData.location.trim()) {
      errors.location = "الرجاء إدخال الموقع.";
    }
    if (orderFormData.description && !orderFormData.description.trim()) {
      errors.description = "الرجاء إدخال الوصف.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.priceAfterDiscount || item.price,
    }));

    const orderData = {
      location: orderFormData.location,
      phoneNumber: orderFormData.phoneNumber,
      description: orderFormData.description,
      products,
    };

    try {
      const result = await createOrder(orderData);
      if (result.data.isSuccess) {
        showNotification("تم إرسال الطلب بنجاح", "success");

        setTimeout(() => {
          dispatch(clearCart());
          setIsOrderFormVisible(false);
        }, 500);
      } else {
        showNotification(
          `فشل في إنشاء الطلب: ${result.error.message}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
      showNotification("فشل في إنشاء الطلب، يرجى المحاولة مرة أخرى.", "error");
    }
  };

  const handleInputChange = (e) => {
    setOrderFormData({ ...orderFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(
      updateCartItem({
        productId,
        quantity,
        price: cart.find((item) => item.id === productId)?.price || 0,
      })
    );
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    showNotification("تم حذف المنتج من السلة.", "success");
  };

  const handleCloseForm = () => {
    setIsOrderFormVisible(false);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <img src={EmptyCart} alt="السلّة فارغة" />
        <span className="empty-cart-message">السلّة فارغة</span>
        <p className="cart-empty-description">
          أضف بعض المنتجات إلى السلّة للبدء.
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-page-header">
        <div className="header-text">
          <h3 style={{ display: "inline" }}>سلّتك:</h3>
          <span className="cart-header-total">{` ${cart.length} `}</span>
        </div>
        <div className="header-total">
          <span>المجموع:</span>
          <span className="cart-header-total">
            {` ${cart
              .reduce(
                (acc, item) =>
                  acc + (item.priceAfterDiscount || item.price) * item.quantity,
                0
              )
              .toFixed(2)} شيكل`}
          </span>
        </div>
      </div>

      <div>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            handleRemoveItem={handleRemoveItem}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-buttons">
          <button className="cart-order-btn" onClick={handleOrderClick}>
            اطلب
          </button>
          <button
            className="cart-clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            افراغ السلة
          </button>
        </div>
      </div>

      {isOrderFormVisible && (
        <div ref={orderFormRef} className="order-form-container">
          <div className="order-form-header">
            <h2>طلب جديد</h2>
          </div>
          <form onSubmit={handleFormSubmit} className="order-form">
            <div>
              <label>
                رقم الهاتف:
                <input
                  type="text"
                  name="phoneNumber"
                  value={orderFormData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.phoneNumber && (
                  <span className="form-error">{formErrors.phoneNumber}</span>
                )}
              </label>
            </div>
            <div>
              <label>
                الموقع:
                <input
                  type="text"
                  name="location"
                  value={orderFormData.location}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.location && (
                  <span className="form-error">{formErrors.location}</span>
                )}
              </label>
            </div>
            <div>
              <label>
                الوصف:
                <input
                  type="text"
                  name="description"
                  value={orderFormData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && (
                  <span className="form-error">{formErrors.description}</span>
                )}
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit">إرسال الطلب</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCloseForm}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Cart;
