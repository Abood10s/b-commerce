import styled from "styled-components";

export const HeroContainer = styled.section`
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .directive-link {
    display: block;
    text-decoration: none;
    background-color: #004d5a;
    color: #f4f4f4;
    padding: 0.7rem 2rem;
    font-size: 1.2rem;
    border-radius: 6px;
    margin: 1.5rem auto;
  }
  @media (max-width: 768px) {
    height: 90vh;
  }
`;

export const HeroContent = styled.div`
  color: #004d5a;
  max-width: 800px;
  margin-bottom: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;
export const TilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    align-items: center;
  }
`;
export const MoreTitle = styled.h3`
  margin: 2rem auto;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const Tile = styled.div`
  position: relative;
  background: #eee;
  color: #000;
  border-radius: 8px;
  padding: 1rem;
  max-width: 210px;
  min-width: 180px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  &:hover img {
    transform: translateY(-25px);
  }

  h3 {
    position: relative;
    color: #000;
    z-index: 1;
    font-size: 1.2rem;
    margin-top: -2rem;
    background: rgba(255, 255, 255, 0.632);
    padding: 0.5rem;
  }
`;
