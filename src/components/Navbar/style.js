import { Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: white;
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 100;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;
export const HomeLogo = styled(Link)`
  text-decoration: none;
  color: #123;
  font-size: 15px;
`;
export const LOGO = styled.img`
  display: block;
  height: 40px;
  width: 160px;
  object-fit: cover;
  @media (max-width: 900px) {
    height: 40px;
  }
`;
export const Mobilenav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  width: 100%;
  color: green;
  padding: 0.5rem 1rem;
  @media (min-width: 900px) {
    display: none;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const NavFlex1 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding-bottom: 0.2rem;
  @media (max-width: 1270px) {
    justify-content: space-evenly;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
export const NavFlex2 = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding-bottom: 0.2rem;
  overflow-x: auto;
  /* width */
  ::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: green;
    border-radius: 7px;
  }
`;
export const Logout = styled.button`
  color: #fff;
  background-color: #123;
  display: block;
  padding: 0.5em 1.5em;
  border-radius: 50px;
  white-space: nowrap;
  border: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin: 0.2rem auto;
  @media (max-width: 1200px) {
    order: 2;
  }
`;
export const SVGS = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  @media (max-width: 1200px) {
    order: 3;
  }
`;
