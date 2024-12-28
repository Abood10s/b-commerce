import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../features/api/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);

  const { data: product, isLoading, isError } = useGetProductDetailsQuery(id);

  useEffect(() => {
    if (product) {
      const availableStock = product.data.quantity;
      setMaxQuantity(availableStock);

      setQuantity(Math.min(quantity, availableStock));
    }
  }, [product, quantity]);

  if (isLoading) return <Spinner />;
  if (isError || !product) return <p>المنتج غير موجود.</p>;

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value) || 1;

    if (value > maxQuantity) {
      toast.error(`الكمية المتاحة هي ${maxQuantity}`);
      value = maxQuantity;
    }

    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    const validQuantity = Math.min(quantity, maxQuantity);

    const productPrice =
      product.data.priceAfterDiscount !== null &&
      product.data.priceAfterDiscount < product.data.price
        ? product.data.priceAfterDiscount
        : product.data.price;

    const cartItem = {
      id: product.data.id,
      name: product.data.name,
      price: productPrice,
      image: product.data.image,
      description: product.data.description,
      quantity: validQuantity,
      totalPrice: validQuantity * productPrice,
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
                  {product.data.price.toFixed(2)}&#x20AA;
                </span>
                <span style={{ fontWeight: "bold", color: "#6366f1" }}>
                  ${product.data.priceAfterDiscount.toFixed(2)}&#x20AA;
                </span>
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    color: "#619303",
                  }}
                >
                  (
                  {(
                    (1 - product.data.priceAfterDiscount / product.data.price) *
                    100
                  ).toFixed(0)}
                  % خصم)
                </span>
              </>
            ) : (
              <span
                style={{
                  fontWeight: "bold",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                ${product.data.price.toFixed(2)}
              </span>
            )}
          </p>

          {product.data.quantity === 0 ? (
            <p style={{ fontSize: "1.5rem" }}>نفذت الكمية</p>
          ) : (
            <>
              <div className="quantity-container">
                <label>
                  الكميّة:
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={Number(maxQuantity)}
                    style={{ marginLeft: "10px", width: "60px" }}
                  />
                </label>
              </div>
              <div className="actions">
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  أضف إلى السلّة
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
