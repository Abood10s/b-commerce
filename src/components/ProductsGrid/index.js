import React from "react";

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductGrid;
