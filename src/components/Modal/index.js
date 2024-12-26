import ReactDOM from "react-dom";
import React from "react";
import "./style.css";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  orderFormData,
  handleInputChange,
  selectedProduct,
}) => {
  return ReactDOM.createPortal(
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="order-form-header">
            <h2>Order</h2>
          </div>
          <form onSubmit={onSubmit} className="order-form">
            <div>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={orderFormData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={orderFormData.location}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={orderFormData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit">Submit Order</button>
              <button type="button" className="cancel-btn" onClick={onClose}>
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
