import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes";
import "./style.css";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to={PATHS.DASHBOARD_CATEGORY} className="dashboard-tile">
          <h2 className="tile-title">Categories</h2>
        </Link>
        <Link to={PATHS.DASHBOARD_SUBCATEGORY} className="dashboard-tile">
          <h2 className="tile-title">Subcategories</h2>
        </Link>
        <Link to={PATHS.DASHBOARD_PRODUCT} className="dashboard-tile">
          <h2 className="tile-title">Products</h2>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
