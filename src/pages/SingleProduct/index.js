import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/api/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);

  if (isLoading) return <p>يتم التحميل...</p>;
  if (isError || !product) return <p>المنتج غير موجود.</p>;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.data.id,
      name: product.data.name,
      price: product.data.priceAfterDiscount || product.data.price,
      image: product.data.image,
      description: product.data.description,
      quantity,
      totalPrice:
        quantity * (product.data.priceAfterDiscount || product.data.price),
    };
    dispatch(addToCart(cartItem));
    toast("تمت إضافة المنتج إلى السلّة!");
  };

  return (
    <div className="single-product-container">
      <div className="single-product-main-container">
        <div className="main-image">
          <img
            src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL}${product?.data?.image}`}
            alt={product.data.name}
          />
          {product?.data?.images && (
            <div className="mapped-images">
              {product.data.images.map((image, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_API_IMAGES_URL}${image}`}
                  alt={product.data.name}
                />
              ))}
            </div>
          )}
        </div>

        <div className="info">
          <p style={{ color: "#6366F1", fontWeight: "bold" }}>
            {product.data.subcategory}
          </p>
          <h1>{product.data.name}</h1>
          <p>{product.data.description}</p>
          <p>
            {product.data.priceAfterDiscount &&
            product.data.priceAfterDiscount !== product.data.price ? (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "red",
                    marginRight: "10px",
                  }}
                >
                  ${product.data.price.toFixed(2)}
                </span>
                <span style={{ fontWeight: "bold", color: "green" }}>
                  ${product.data.priceAfterDiscount.toFixed(2)}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  (
                  {(
                    (1 - product.data.priceAfterDiscount / product.data.price) *
                    100
                  ).toFixed(0)}
                  % off)
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                ${product.data.price.toFixed(2)}
              </span>
            )}
          </p>

          {product.quantity === 0 ? (
            <p>نفدت الكمية</p>
          ) : (
            <div className="quantity-container">
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  style={{ marginLeft: "10px", width: "60px" }}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="actions">
        <button onClick={handleAddToCart} className="add-to-cart-btn ">
          أضف إلى السلّة
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
