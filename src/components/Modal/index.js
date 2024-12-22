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
          <h2>Order Form</h2>
          <form onSubmit={onSubmit} className="order-form">
            <div className="order-form-header">
              {/* Uncomment below lines if you need to display the product image */}
              {/* <img
                src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="cart-p-img"
              /> */}
            </div>
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
            <div style={{ display: "grid", placeItems: "center" }}>
              <button type="submit" style={{ marginBottom: "1rem" }}>
                Submit Order
              </button>
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
