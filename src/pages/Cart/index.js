import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../features/slices/cartSlice";
import "./style.css";
import Modal from "../../components/Modal";
import { useCreateOrderMutation } from "../../features/api/orderApi";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    location: "",
    phoneNumber: "",
    description: "",
  });

  const [createOrder] = useCreateOrderMutation();

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };
  const handleModalSubmit = async (e) => {
    e.preventDefault();

    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      location: orderFormData.location,
      phoneNumber: orderFormData.phoneNumber,
      description: orderFormData.description,
      products,
    };

    try {
      const result = await createOrder(orderData).unwrap();
      console.log("Order created successfully:", result);
      dispatch(clearCart());
      setIsModalOpen(false);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setOrderFormData({ ...orderFormData, [e.target.name]: e.target.value });
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart.");
  };

  if (cart.length === 0) {
    return (
      <p className="cart-empty-message" style={{ marginTop: "1rem" }}>
        السلّة فارغة
      </p>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">سلّتك</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>الصورة</th>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>المجموع</th>
            <th>العمل</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${item.image}`}
                  alt={item.name}
                  className="cart-p-img"
                />
              </td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="cart-remove-btn"
                >
                  إزالة
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-footer">
        <h3 className="cart-total">
          المجموع: $
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
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

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          orderFormData={orderFormData}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Cart;
