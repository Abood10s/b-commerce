import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateCartItem,
} from "../../features/slices/cartSlice";
import "./style.css";
import Modal from "../../components/Modal";
import { useCreateOrderMutation } from "../../features/api/orderApi";
import { toast } from "react-toastify";
import CartItem from "../../components/CatrItem";

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

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(
      updateCartItem({ productId, quantity: parseInt(newQuantity, 10) })
    );
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
      <div className="cart-page-header">
        <div className="header-text">
          <h3 style={{ display: "inline" }}>سلّتك:</h3>
          <span className="cart-header-total">{` ${cart?.length} `}</span>
        </div>
        <div className="header-total">
          <span>المجموع:</span>
          <span className="cart-header-total">
            {` ${cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)} شيكل`}
          </span>
        </div>
      </div>
      <div>
        {cart.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            handleRemoveItem={handleRemoveItem}
            handleQuantityChange={handleQuantityChange}
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
