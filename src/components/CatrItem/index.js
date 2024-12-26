import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../features/slices/cartSlice";
const CartItem = ({ item, handleRemoveItem }) => {
  const { name, description, image } = item;
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ productId, quantity, price: item.price }));
  };

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
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  item.id,
                  parseInt(e.target.value),
                  item.maxQuantity
                )
              }
              min="1"
              max={item.maxQuantity}
            />
          </div>
          <div className="item-price">
            الإجمالي: {`${(item.quantity * item.price).toFixed(2)} شيكل`}
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
