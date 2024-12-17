import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/slices/cartSlice";
import "./style.css";
import Modal from "../../components/Modal";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    location: "",
    description: "",
    quantity: 1,
  });

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      phoneNumber: "",
      location: "",
      description: "",
      quantity: product.quantity,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setFormData({ ...formData, quantity: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    const updatedCart = cart.map((item) =>
      item.id === selectedProduct.id
        ? { ...item, quantity: item.quantity + formData.quantity }
        : item
    );

    dispatch({ type: "cart/updateCart", payload: updatedCart });
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (cart.length === 0) {
    return (
      <p className="cart-empty-message" style={{ marginTop: "1rem" }}>
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              {console.log(item)}
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
                  onClick={() => handleOrderClick(item)}
                  className="cart-order"
                >
                  Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-footer">
        <h3 className="cart-total">
          Grand Total: $
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
        <div className="cart-buttons">
          <button
            className="cart-clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          selectedProduct={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          handleQuantityChange={handleQuantityChange}
        />
      )}
    </div>
  );
};
export default Cart;
