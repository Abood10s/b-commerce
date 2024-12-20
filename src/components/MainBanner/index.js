import React from "react";
import "./style.css";

const MainBanner = () => {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <h1 className="banner-title">Welcome to Edfa3 Banky</h1>
        <p className="banner-subtitle">
          Discover amazing deals and offers on our products.
        </p>
        <button className="banner-button">Shop Now</button>
        <div className="bounce">
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
