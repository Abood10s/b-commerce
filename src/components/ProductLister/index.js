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
  border-radius: 12px;
  background-color: #fff;
  max-width: 320px;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 0.4rem;
  position: relative;
  text-align: right;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
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
  }

  p {
    margin: 0.25rem 0;
    color: #666;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .price {
    font-size: 1rem;
    color: #000;
    font-weight: bold;
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
      outline: 2px solid #123;
    }
  }

  &.loading img,
  &.loading h3,
  &.loading p {
    background-color: var(--loading-grey);
    background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    );
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: loading 1s ease-in-out infinite;
    color: transparent;
  }

  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;
const ProductList = ({ products, isLoading }) => {
  if (!isLoading && (!products || products.length === 0)) {
    return (
      <p style={{ textAlign: "center", margin: "3rem auto" }}>
        ليس هناك منتجات.
      </p>
    );
  }

  const skeletonArray = Array.from({ length: 8 });

  return (
    <ProductGrid>
      {isLoading
        ? skeletonArray.map((_, index) => (
            <ProductCard key={index} className="loading">
              <div className="prod-img" />
              <h3>'</h3>
              <p></p>
            </ProductCard>
          ))
        : products.map((product) => (
            <ProductCard key={product.id}>
              <img src={product.img} alt={product.name} className="prod-img" />
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
                      ${product.priceAfterDiscount.toFixed(2)}&#x20AA;
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                        position: "absolute",
                        top: "1rem",
                        left: "0.5rem",
                        backgroundColor: "green",
                        color: "white",
                        padding: ".3rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.discount}% off
                    </span>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold" }}>
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </p>
              <Link to={`/products/${product.id}`} className="details-link">
                عرض التفاصيل
              </Link>
            </ProductCard>
          ))}
    </ProductGrid>
  );
};

export default ProductList;
