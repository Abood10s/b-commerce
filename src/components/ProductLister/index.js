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
  width: 35%;
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

  img,
  .prod-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
    background-color: #f2f2f2;
  }

  h3,
  p {
    margin: 0.5rem 0;
    color: #666;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  h3 {
    font-weight: bold;
    color: #333;
  }

  .price {
    font-size: 1rem;
    color: #000;
    font-weight: bold;
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
  &.loading .prod-img,
  &.loading h3,
  &.loading p {
    background-color: #e0e0e0;
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

  @media (max-width: 1150px) {
    width: 65%;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 0.8rem;
    h3 {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.8rem;
    }
    .details-link {
      font-size: 0.8rem;
    }
  }
`;

const ProductList = ({ products, isLoading }) => {
  const skeletonArray = Array.from({ length: 8 });

  return (
    <ProductGrid>
      {isLoading
        ? skeletonArray.map((_, index) => (
            <ProductCard key={index} className="loading">
              <div className="prod-img" />
              <h3>Loading...</h3>
              <p>Loading description...</p>
            </ProductCard>
          ))
        : products.map((product) => (
            <ProductCard key={product.id}>
              <img
                src={`${process.env.REACT_APP_API_MAIN_IMAGE_URL}/${product.image}`}
                alt={product.name}
                className="prod-img"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">
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
                      {product.price.toFixed(2)}&#x20AA;
                    </span>
                    <span style={{ fontWeight: "bold", color: "#6366f1" }}>
                      {product.priceAfterDiscount.toFixed(2)}&#x20AA;
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                        position: "absolute",
                        top: "1rem",
                        left: "0",
                        backgroundColor: "#DAF7A6",
                        color: "#333",
                        padding: ".3rem",
                        borderRadius: "5px",
                      }}
                    >
                      خصم {product.discount}%
                    </span>
                  </>
                ) : (
                  <span style={{ fontWeight: "bold", color: "#6366f1" }}>
                    {product.price.toFixed(2)}&#x20AA;
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
