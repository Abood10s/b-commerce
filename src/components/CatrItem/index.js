import React from "react";
import "./style.css";

const CartItem = ({ item, handleRemoveItem, handleQuantityChange }) => {
  const { name, description, quantity, totalPrice, image } = item;

  return (
    <div className="cart-item">
      <img
        src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${image}`}
        alt={name}
      />
      <div className="item-desc">
        <div className="item-desc-1">
          <div className="title-desc">
            <h3>{name}</h3>
            <small>{description}</small>
          </div>
          <div className="quantity">
            الكميّة:{" "}
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              min="1"
            />
          </div>
          <div className="item-price">
            الإجمالي: {` ${totalPrice.toFixed(2)} شيكل`}
          </div>
          <div className="remove-btn"></div>
        </div>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="cart-remove-btn cart-item-rmv"
        >
          إزالة
        </button>
      </div>
    </div>
  );
};

export default CartItem;
