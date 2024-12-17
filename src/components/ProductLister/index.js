import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;
const ProductCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 320px;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    margin: 0.5rem 0;
    text-align: center;
  }

  p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.875rem;
    line-height: 1.4;
    text-align: center;
  }

  .price {
    font-size: 1rem; /* Adjusted font size for balance */
    color: #000;
    font-weight: bold;
    text-align: center;
    margin: 0.25rem 0;
  }

  .prod-img {
    object-fit: contain;
  }

  .details-link {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    color: #fff;
    background-color: #123;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.875rem;
    text-align: center;
    align-self: center;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #fff;
      color: #123;
      border: 2px solid #123;
    }
  }
`;

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <img
            src={`${process.env.REACT_APP_API_MAIN_IMAGE_URL}${product?.image}`}
            alt={product.name}
            className="prod-img"
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            {product.priceAfterDiscount &&
            product.priceAfterDiscount !== product.price ? (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "red",
                    marginRight: "10px",
                  }}
                >
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ fontWeight: "bold", color: "green" }}>
                  ${product.priceAfterDiscount.toFixed(2)}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  (
                  {(
                    (1 - product.priceAfterDiscount / product.price) *
                    100
                  ).toFixed(0)}
                  % off)
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </p>

          <Link to={`/products/${product.id}`} className="details-link">
            View Details
          </Link>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};

export default ProductList;
