import React from "react";
import "./style.css"; // Modal styles
import ReactDOM from "react-dom";
const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleQuantityChange,
  selectedProduct,
}) => {
  return ReactDOM.createPortal(
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Order Form</h2>
          <form onSubmit={onSubmit} className="order-form">
            <div className="order-form-header">
              <img
                src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="cart-p-img"
              />
              <p>{selectedProduct.name}</p>
            </div>
            <div>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  style={{ marginLeft: "10px", width: "60px" }}
                />
              </label>
            </div>
            <div>
              <button type="submit">Submit Order</button>
              <button type="button" onClick={onClose}>
                Cancel Order
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null,
    document.getElementById("modal-root")
  );
};

export default Modal;
