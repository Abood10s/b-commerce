import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes";
import { PiGridFourLight, PiPackage } from "react-icons/pi";
import { PiFolder } from "react-icons/pi";
import { PiClipboardTextLight } from "react-icons/pi";

import "./style.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">لوحة التحكّم</h1>
      <div className="dashboard-links">
        <Link to={`${PATHS.DASHBOARD}/category`} className="dashboard-tile">
          <h2 className="tile-title">الفئات</h2>
          <PiFolder className="dash-icon" size={"30px"} />
        </Link>
        <Link to={`${PATHS.DASHBOARD}/subcategory`} className="dashboard-tile">
          <h2 className="tile-title">الفئات الفرعية</h2>
          <PiGridFourLight size={"30px"} />
        </Link>
        <Link to={`${PATHS.DASHBOARD}/product`} className="dashboard-tile">
          <h2 className="tile-title">المنتجات</h2>
          <PiPackage className="dash-icon" size={"30px"} />
        </Link>
        <Link to={`${PATHS.DASHBOARD}/order`} className="dashboard-tile">
          <h2 className="tile-title">الطلبات</h2>
          <PiClipboardTextLight className="dash-icon" size={"30px"} />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
