import React, { useEffect } from "react";
import { useGetOrderDetailsQuery } from "../../../features/api/orderApi";
import { useParams } from "react-router-dom";
import "./singleorder.css";
import Spinner from "../../../components/Spinner";

const SingleOrder = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    if (error) {
      console.error("Error fetching order details:", error);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || !data.data) {
    return <p className="single-order-empty">ليس هناك معلومات عن الطلب</p>;
  }

  const order = data.data;

  return (
    <div className="single-order-container">
      <h2 className="single-order-title">تفاصيل الطلب</h2>
      <div className="single-order-details">
        <p className="order-id">رقم الطلب: {order.id}</p>
        <p className="order-delivered">
          تم توصيله؟: {order.delevered ? "نعم" : "لا"}
        </p>
        <p className="order-canceled">ملغي: {order.canceled ? "نعم" : "لا"}</p>
        <p className="order-total-price">
          مجموع الطلب: {order.totlaPrice} شيكل
        </p>
        <p className="order-location">الموقع: {order.location}</p>
        <p className="order-phone-number">الهاتف: {order.phoneNumber}</p>
        <h3 className="order-products-title">المنتجات:</h3>
        <ul className="order-products-list">
          {order.products.map((product) => (
            <li key={product.productId} className="order-product-item">
              <div className="order-product-info">
                <span className="product-name">{product.productName}</span>
                <span className="product-quantity">
                  الكمية: {product.quantity}
                </span>
                <span className="product-price">
                  السعر: {product.unitPrice} شيكل
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleOrder;
