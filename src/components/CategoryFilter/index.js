import React from "react";
import styled from "styled-components";
const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Chip = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  font-size: 0.875rem;
  border: 1px solid #e0e0e0;

  &.active {
    background-color: #123;
    color: #fff;
    border: 1px solid #fff;
  }
  &:hover {
    background-color: #123;
    color: #fff;
    border: 1px solid #fff;
    transition: all 0.3s ease;
  }
`;
const CategoryFilter = ({
  categories,
  selectedCategoryId,
  handleCategoryClick,
  subCategories,
  handleSubcategoryClick,
  selectedSubcategoryId,
}) => {
  return (
    <div>
      <ChipContainer>
        <Chip
          className={`chip ${selectedCategoryId === null ? "active" : ""}`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </Chip>
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            className={`chip ${selectedCategoryId === cat.id ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </Chip>
        ))}
      </ChipContainer>

      {selectedCategoryId && subCategories?.length > 0 && (
        <ChipContainer>
          {subCategories.map((subCat) => (
            <Chip
              key={subCat.id}
              className={`chip ${
                selectedSubcategoryId === subCat.id ? "active" : ""
              }`}
              onClick={() => handleSubcategoryClick(subCat.id)}
            >
              {subCat.name}
            </Chip>
          ))}
        </ChipContainer>
      )}
    </div>
  );
};

export default CategoryFilter;
