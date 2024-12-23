import React, { useEffect } from "react";
import { useGetOrdersQuery } from "../../features/api/orderApi";
import "./order.css";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { data, error, isLoading } = useGetOrdersQuery();
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    if (error) {
      console.error("Error fetching orders:", error);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data || data.length === 0) {
    return <p className="order-empty">No orders found.</p>;
  }
  const handleOrderClick = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="order-container">
      <h2 className="order-title">الطلبات</h2>
      <div className="order-list">
        {data.data?.map((order) => (
          <div
            key={order.id}
            className="order-item"
            onClick={() => handleOrderClick(order.id)}
          >
            <p className="order-id">رقم الطلب: {order.id}</p>
            <p className="order-delivered">
              تم توصيله؟: {order.delivered ? "نعم" : "لا"}
            </p>
            <p className="order-canceled">
              ملغي: {order.canceled ? "نعم" : "لا"}
            </p>
            <p className="order-total-price">
              مجموع الطلب: {order.totlaPrice} شيكل
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
