import styled from "styled-components";
export const NavSearchContiner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  border: 2px solid #ddd;
  padding: 0 0.3rem;
  border-radius: 50px;
  &:hover {
    background-color: #d5e0d5;
  }
  @media (max-width: 1200px) {
    order: 1;
  }
`;
export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.3rem;
  background-color: transparent;
  &::placeholder {
    color: #000;
  }
`;
export const Holder = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 0.2rem 0.5rem;
  transition: 0.2s all ease;
  &:hover {
    background-color: #e4ebe4;
  }
  @media (max-width: 800px) {
    height: 2.2rem;
  }
`;
export const Jobs = styled.p`
  padding: 0.3rem 0.7rem;
`;
