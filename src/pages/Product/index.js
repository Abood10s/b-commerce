import React from "react";

import { Link } from "react-router-dom";
import { PATHS } from "../../Routes";

const Product = () => {
  return (
    <div style={{ margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", margin: "1rem auto" }}>المنتجات</h2>
      <div className="dashboard-links">
        <Link
          to={`${PATHS.DASHBOARD}/product/create`}
          className="dashboard-tile"
        >
          <h2 className="tile-title">إضافة منتج</h2>
        </Link>
        <Link
          to={`${PATHS.DASHBOARD}/product/control`}
          className="dashboard-tile"
        >
          <h2 className="tile-title">التحكّم في المنتجات</h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
