import React from "react";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../features/slices/cartSlice";
import "./style.css";

const CartItem = ({ item, handleRemoveItem }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity, price: item.price }));
  };

  return (
    <div className="cart-item">
      <img
        src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${item.image}`}
        alt={item.name}
      />
      <div className="item-desc">
        <div className="item-desc-1">
          <div className="title-desc">
            <h3>{item.name}</h3>
            <small>{item.description}</small>
          </div>
          <div className="quantity">
            الكميّة:{" "}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              min="1"
              max={item.maxQuantity}
            />
          </div>
          <div className="item-price">
            الإجمالي:{" "}
            {`${(
              item.quantity * (item.priceAfterDiscount || item.price)
            ).toFixed(2)} شيكل`}
          </div>
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
